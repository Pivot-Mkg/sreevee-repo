<?php
header('Content-Type: application/json');
session_start();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$productName = trim($_POST['productName'] ?? '');
$company = trim($_POST['company'] ?? '');
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$datasheet = $_POST['datasheet'] ?? 'no';
$notes = trim($_POST['notes'] ?? '');
$captchaAnswer = intval($_POST['captcha'] ?? 0);

// Validation
if (empty($name) || strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter your full name (minimum 2 characters)']);
    exit;
}

if (empty($company)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter your company name']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

// Block personal email domains
$personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com'];
$emailDomain = strtolower(substr(strrchr($email, '@'), 1));
if (in_array($emailDomain, $personalDomains)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please use your business email address. Personal email domains are not accepted']);
    exit;
}

if (empty($notes) || strlen($notes) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter your requirements (minimum 10 characters)']);
    exit;
}

// Captcha validation
if (!isset($_SESSION['captcha_answer']) || $captchaAnswer !== $_SESSION['captcha_answer']) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Security check failed. Please solve the math problem correctly']);
    exit;
}

$to = 'info@sreevegroup.com, rthomas@pivotmkg.com, aakash@pivotmkg.com';
$subject = 'New Quote Request from ' . $name . ' (' . $company . ')';
$body = "Quote Request Submission\n\n";
$body .= "Product: $productName\n";
$body .= "Name: $name\n";
$body .= "Company: $company\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
$body .= "Datasheet Requested: $datasheet\n\n";
$body .= "Requirements:\n$notes\n\n";
$body .= "Submitted: " . date('Y-m-d H:i:s');

$headers = "From: $email\r\nReply-To: $email\r\n";

if (mail($to, $subject, $body, $headers)) {
    unset($_SESSION['captcha_answer']);
    echo json_encode(['success' => true, 'message' => 'Thank you! Your quote request has been submitted successfully. We will get back to you soon with pricing information.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to submit request. Please try again or contact us directly.']);
}