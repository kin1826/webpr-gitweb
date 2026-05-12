<?php
// save_cmd.php - Lưu nội dung POST vào cmd.txt
$cmdFile = __DIR__ . '/cmd.txt';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    file_put_contents($cmdFile, $data);
    echo 'OK';
    exit;
}
echo 'Chỉ hỗ trợ POST';
