<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/utils.php';

// Tripay will POST JSON with X-Callback-Event and X-Callback-Signature headers
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

$raw = file_get_contents('php://input');
$headers = getallheaders();
$signature = $headers['X-Callback-Signature'] ?? ($headers['x-callback-signature'] ?? '');
$event = $headers['X-Callback-Event'] ?? ($headers['x-callback-event'] ?? '');

logger('callback-' . date('Ymd') . '.log', 'RAW ' . $raw);
logger('callback-' . date('Ymd') . '.log', 'HDR ' . json_encode($headers));

if (!$signature) {
    logger('callback-' . date('Ymd') . '.log', 'Missing signature');
    http_response_code(400);
    echo 'Missing signature';
    exit;
}

// Verify signature
$calc = hash_hmac('sha256', $raw, TRIPAY_PRIVATE_KEY);
if (!hash_equals($calc, $signature)) {
    logger('callback-' . date('Ymd') . '.log', 'Invalid signature');
    http_response_code(403);
    echo 'Invalid signature';
    exit;
}

$data = json_decode($raw, true);
if (!$data) {
    http_response_code(400);
    echo 'Invalid payload';
    exit;
}

if ($event !== 'payment_status') {
    logger('callback-' . date('Ymd') . '.log', 'Unhandled event ' . $event);
    echo 'Ignored';
    exit;
}

$status = strtoupper($data['status'] ?? '');
$reference = $data['reference'] ?? '';
$merchant_ref = $data['merchant_ref'] ?? '';

$conn = db();

// Update by reference if present
if ($reference) {
    $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE tripay_reference = ?");
    $stmt->bind_param('ss', $status, $reference);
    $stmt->execute();
    $stmt->close();
}

logger('callback-' . date('Ymd') . '.log', "UPDATED status=$status reference=$reference merchant_ref=$merchant_ref");

echo 'OK';