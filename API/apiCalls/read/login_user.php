<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With');

include('../../function.php');


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {

    http_response_code(200);
    exit();
}



if ($method == "POST") {
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (empty($inputData)) {
        $userLogin = userLogin($_POST);
    } else {
        $userLogin = userLogin($inputData);
    }
    echo $userLogin;
    exit();
} else {
    $data = [
        'status' => 405,
        'message' => $method . ' Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
?>


<!--

include './database/database_conn.php';

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
} -->