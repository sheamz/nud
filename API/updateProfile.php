<?php

header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');

require './database/database_conn.php';
require '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;

$env = parse_ini_file('../.env');

$requestMethod = $_SERVER["REQUEST_METHOD"];


if ($requestMethod == "OPTIONS") {
    // Send a 200 OK response for preflight requests
    http_response_code(200);
    exit();
}


if($requestMethod == "POST"){

    $json = file_get_contents('php://input');
    $decoded_json = json_decode($json, true);

    $stmt = $conn->prepare("UPDATE tbl_users SET nu_given_identifier = ?, f_name = ?, m_name = ? , l_name = ?, address = ?, gender = ?, date_of_birth = ? WHERE user_id = ?");
    $stmt->bind_param("ssssssss",
                    $decoded_json['studentnum'], 
                    $decoded_json['fname'],
                    $decoded_json['mname'],
                    $decoded_json['lname'], 
                    $decoded_json['address'], 
                    $decoded_json['gender'],
                    $decoded_json['dob'],
                    $decoded_json['user_id'],
);
    $stmt->execute();
    $stmt->close();
    $jwt = JWT::encode($decoded_json, $env['VITE_REACT_JWT_SECRET'],'HS256');
    header("HTTP/1.0 201 Created");
    $data = [
        "status" => 201,
        "message" => "Profile Updated",
        "data" => $jwt,
    ];
    echo json_encode($data);
    exit();
}else{
    header("HTTP/1.0 405 Method Not Allowed");
    $data =[
        "status" => 405,
        "message" => "Method Not Allowed"
    ];
    echo json_encode($data);
    exit();
}