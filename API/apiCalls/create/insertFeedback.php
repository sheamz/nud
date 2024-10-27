<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');

include('../../function.php');
require '../../../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;

$env = parse_ini_file('../../../.env');


$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "OPTIONS") {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}

if ($requestMethod == 'POST') {

    $inputData = json_decode(file_get_contents("php://input"), true);

    $session_token = $_COOKIE['user_token'] ?? '';

    if (empty($session_token)) { //for guest insert
        $user_id = 'GUEST-USER' . '-' . time();
        if (empty($inputData)) {
            $data = [
                'status' => 400,
                'message' => 'Bad Request',
            ];
            header("HTTP/1.0 400 Bad Request");
            echo json_encode($data);
            exit();
        } else {
            $insertFeedback = insertGuestFeedback($inputData, $user_id);
        }
        echo $insertFeedback;
        exit();
    } else { //for logged in user insert
        try {
            $secret_key = $env['VITE_REACT_JWT_SECRET'];

            $decoded = JWT::decode($session_token, new Key($secret_key, 'HS256'));
            $user_id = $decoded->user_id;

            if (empty($inputData)) {
                $data = [
                    'status' => 400,
                    'message' => 'Bad Request',
                ];
                header("HTTP/1.0 400 Bad Request");
                echo json_encode($data);
                exit();
            } else {
                $insertFeedback = insertUserFeedback($inputData, $user_id);
            }
            echo $insertFeedback;
            exit();
        } catch (ExpiredException $e) {
            $data = [
                'status' => 401,
                'message' => 'Unauthorized',
            ];
            header("HTTP/1.0 401 Unauthorized");
            echo json_encode($data);
            exit();
        }
    }
} else {
    $data = [
        'status' => 405,
        'message' => $requestMethod . 'Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
