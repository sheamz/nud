<?php

include './database/database_conn.php';

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if($method == "POST");

$json = file_get_contents('php://input');

$data = json_decode($json, true);

$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

$query = "SELECT * FROM tbl_users";
$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        if($row['email'] == $email && $row['password'] == $password){
            echo "Success";
        } else {
            echo "Failed";
        }
    }
} else {
    echo "No user found";
}
?>