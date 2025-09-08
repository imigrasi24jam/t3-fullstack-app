<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/utils.php';

// CORS for local dev
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) $data = $_POST;

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$package_code = trim($data['package_code'] ?? '');
$package_name = trim($data['package_name'] ?? '');
$price = (int)($data['price'] ?? 0);

if ($name === '' || $email === '' || $phone === '' || $package_code === '' || $package_name === '' || $price <= 0) {
    json_response(['success' => false, 'message' => 'Invalid payload'], 400);
}

// insert order pending
$conn = db();
$stmt = $conn->prepare("INSERT INTO orders (name, email, phone, package_code, package_name, price, status) VALUES (?, ?, ?, ?, ?, ?, 'PENDING')");
$stmt->bind_param('sssssi', $name, $email, $phone, $package_code, $package_name, $price);
$stmt->execute();
$order_id = $stmt->insert_id;
$stmt->close();

$merchant_ref = 'INV' . date('YmdHis') . $order_id;

// Call Tripay to create transaction
$payload = [
    'method'         => 'BRIVA', // default method; Tripay will still show channel on their page
    'merchant_ref'   => $merchant_ref,
    'amount'         => $price,
    'customer_name'  => $name,
    'customer_email' => $email,
    'customer_phone' => $phone,
    'order_items'    => [
        [
            'sku'      => $package_code,
            'name'     => $package_name,
            'price'    => $price,
            'quantity' => 1,
        ],
    ],
    'return_url'     => APP_BASE_URL . '/packages',
    'expired_time'   => time() + (24 * 60 * 60), // 24 hours
    'signature'      => hash_hmac('sha256', TRIPAY_MERCHANT_CODE . $merchant_ref . $price, TRIPAY_PRIVATE_KEY),
    'callback_url'   => CALLBACK_URL,
];

$ch = curl_init('https://tripay.co.id/api-sandbox/transaction/create');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . TRIPAY_API_KEY, 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload),
]);
$result = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

logger('create.log', 'REQ ' . json_encode($payload));
logger('create.log', "RES($httpcode) " . $result);

if ($err) {
    json_response(['success' => false, 'message' => 'CURL Error: ' . $err], 500);
}

$res = json_decode($result, true);
if (!is_array($res) || ($res['success'] ?? false) !== true) {
    json_response(['success' => false, 'message' => $res['message'] ?? 'Tripay error'], 400);
}

// store reference
$reference = $res['data']['reference'] ?? null;
$checkout_url = $res['data']['checkout_url'] ?? null;

if ($reference) {
    $stmt = $conn->prepare("UPDATE orders SET tripay_reference = ? WHERE id = ?");
    $stmt->bind_param('si', $reference, $order_id);
    $stmt->execute();
    $stmt->close();
}

json_response(['success' => true, 'checkout_url' => $checkout_url, 'reference' => $reference]);