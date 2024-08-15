<?php
header("Access-Control-Allow-Origin: http://felix-kroth.de");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $to = "contact@felix-kroth.de";
    $subject = isset($_POST['subject']) ? $_POST['subject'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';
    $from = isset($_POST['email']) ? $_POST['email'] : '';

    if (!empty($subject) && !empty($message) && !empty($from) && filter_var($from, FILTER_VALIDATE_EMAIL)) {
        $headers = "From: " . $from;
        
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Email sent successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to send email."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>