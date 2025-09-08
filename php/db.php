<?php
require_once __DIR__ . '/config.php';

function db(): mysqli {
    static $conn = null;
    if ($conn === null) {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($conn->connect_error) {
            http_response_code(500);
            die(json_encode(['success' => false, 'message' => 'DB connection failed']));
        }
        $conn->set_charset('utf8mb4');
    }
    return $conn;
}