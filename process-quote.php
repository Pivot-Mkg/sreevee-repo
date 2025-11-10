<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: get-quote.html");
    exit();
}

// Get form data and sanitize
$product = filter_input(INPUT_POST, 'productName', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$length = filter_input(INPUT_POST, 'length', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$width = filter_input(INPUT_POST, 'width', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$thickness = filter_input(INPUT_POST, 'thickness', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$datasheet = filter_input(INPUT_POST, 'datasheet', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$notes = filter_input(INPUT_POST, 'notes', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$customDetails = filter_input(INPUT_POST, 'customDetails', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

// Email template (admin)
$to = "aakash@pivotmkg.com";
$subject = "New Quote Request from " . ($company ?: $name ?: 'Website');

$message = "<!DOCTYPE html><html><head><meta charset='UTF-8'><style>
    body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
    .container{max-width:600px;margin:0 auto;padding:20px}
    .header{background:#252e57;color:#fff;padding:20px;text-align:center}
    .content{background:#f8f9fa;padding:20px}
    .section{margin-bottom:20px}
    .label{font-weight:bold;color:#252e57}
    .footer{text-align:center;padding-top:20px;font-size:.9em;color:#666}
</style></head><body>
  <div class='container'>
    <div class='header'>
      <h2>New Quote Request</h2>
    </div>
    <div class='content'>
      <div class='section'>
        <p class='label'>Product Details:</p>
        <p>Product: " . htmlspecialchars($product) . "</p>";

if ($product !== "Custom product") {
    $message .= "<p>Length: " . htmlspecialchars($length) . "</p>
                 <p>Width: " . htmlspecialchars($width) . "</p>
                 <p>Thickness: " . htmlspecialchars($thickness) . " μm</p>";
} else {
    $message .= "<p>Custom Specifications:</p>
                 <p>" . nl2br(htmlspecialchars($customDetails)) . "</p>";
}

$message .= "
      </div>
      <div class='section'>
        <p class='label'>Customer Information:</p>
        <p>Company: " . htmlspecialchars($company) . "</p>
        <p>Name: " . htmlspecialchars($name) . "</p>
        <p>Email: " . htmlspecialchars($email) . "</p>
        <p>Phone: " . htmlspecialchars($phone ?: 'Not provided') . "</p>
      </div>
      <div class='section'>
        <p class='label'>Request Details:</p>
        <p>Datasheet Requested: " . ($datasheet == 'yes' ? 'Yes' : 'No') . "</p>
        <p>Additional Notes:</p>
        <p>" . ($notes ? nl2br(htmlspecialchars($notes)) : 'None provided') . "</p>
      </div>
    </div>
    <div class='footer'>
      <p>This request was submitted from the SreeVee website on " . date('Y-m-d H:i:s') . "</p>
    </div>
  </div>
</body></html>";

// Headers for HTML email (admin)
$adminHeaders = "MIME-Version: 1.0\r\n";
$adminHeaders .= "Content-type:text/html;charset=UTF-8\r\n";
$adminHeaders .= "From: SreeVee Quotes <aakash@pivotmkg.com>\r\n";
$adminHeaders .= "Reply-To: " . ($email ?: 'aakash@pivotmkg.com') . "\r\n";

// Send admin email
$mailSent = mail($to, $subject, $message, $adminHeaders);

// Send confirmation email to user (if email provided)
$userSent = false;
if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $userSubject = "We received your quote request – SreeVee";
    $userMsg = "<!DOCTYPE html><html><head><meta charset='UTF-8'><style>
        body{font-family:Arial,sans-serif;line-height:1.6;color:#333}
        .container{max-width:600px;margin:0 auto;padding:20px}
        .header{background:#252e57;color:#fff;padding:16px;text-align:center}
        .content{background:#f8f9fa;padding:20px}
        .section{margin-bottom:16px}
        .label{font-weight:bold;color:#252e57}
        .footer{text-align:center;padding-top:16px;font-size:.9em;color:#666}
    </style></head><body>
    <div class='container'>
      <div class='header'><h2>Thanks, we’ve got your request</h2></div>
      <div class='content'>
        <div class='section'>
          <p>Hello " . htmlspecialchars($name ?: 'there') . ",</p>
          <p>Thank you for contacting SreeVee. We’ve received your request and will get back to you shortly.</p>
        </div>
        <div class='section'>
          <p class='label'>Summary</p>
          <p>Product: " . htmlspecialchars($product) . "</p>";
    if ($product !== "Custom product") {
        $userMsg .= "<p>Length: " . htmlspecialchars($length) . "</p>
                     <p>Width: " . htmlspecialchars($width) . "</p>
                     <p>Thickness: " . htmlspecialchars($thickness) . " μm</p>";
    } else if ($customDetails) {
        $userMsg .= "<p>Custom specifications:</p><p>" . nl2br(htmlspecialchars($customDetails)) . "</p>";
    }
    $userMsg .= "<p>Datasheet Requested: " . ($datasheet == 'yes' ? 'Yes' : 'No') . "</p>
        </div>
      </div>
      <div class='footer'>
        <p>Sent from SreeVee • " . date('Y-m-d H:i:s') . "</p>
      </div>
    </div>
    </body></html>";

    $userHeaders = "MIME-Version: 1.0\r\n" .
                   "Content-type:text/html;charset=UTF-8\r\n" .
                   "From: SreeVee <aakash@pivotmkg.com>\r\n" .
                   "Reply-To: aakash@pivotmkg.com\r\n";
    $userSent = mail($email, $userSubject, $userMsg, $userHeaders);
}

// Send response back to the client
header('Content-Type: application/json');
if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'Your quote request has been sent successfully!', 'userNotified' => $userSent]);
} else {
    echo json_encode(['success' => false, 'message' => 'Sorry, there was an error sending your request. Please try again later.']);
}

