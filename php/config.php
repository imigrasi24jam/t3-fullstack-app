<?php
// Tripay Sandbox Credentials
define('TRIPAY_API_KEY', 'DEV-GabxfPjV6w0pXKoKr8VvmOcm7FBkcE9fvGKn5vmK');
define('TRIPAY_PRIVATE_KEY', 'H0Dzr-mzx1m-9ySvR-02oia-FT6hg');
define('TRIPAY_MERCHANT_CODE', 'T43205');

// Callback URL configured in Tripay dashboard should point here:
define('CALLBACK_URL', 'https://indonesiajs.com/callback.php'); // adjust if using /php/callback.php

// Database (MySQL)
define('DB_HOST', getenv('DB_HOST') ?: '127.0.0.1');
define('DB_USER', getenv('DB_USER') ?: 'u143402120_jsindonesia');
define('DB_PASS', getenv('DB_PASS') ?: 'Nenda332211@');
define('DB_NAME', getenv('DB_NAME') ?: 'u143402120_indonesiajs');

// App base URL for building success/return URLs (optional)
define('APP_BASE_URL', getenv('APP_BASE_URL') ?: 'http://localhost:3000');

// Timezone
date_default_timezone_set('Asia/Jakarta');