<?php

function json_response($data, int $code = 200): void {
    header('Content-Type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function logger($filename, $content): void {
    $dir = __DIR__ . '/logs';
    if (!is_dir($dir)) mkdir($dir, 0777, true);
    $path = $dir . '/' . $filename;
    file_put_contents($path, "[" . date('Y-m-d H:i:s') . "] " . $content . PHP_EOL, FILE_APPEND);
}