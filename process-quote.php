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

// New: derive family and render appropriate fields
$code_all = null;
if (preg_match('/\(([A-Z0-9\-]+)\)/', (string)$product, $mAll)) {
  $code_all = $mAll[1];
}
$isCompostable = $code_all && (strpos($code_all, 'CP-') === 0 || $code_all === 'PT-LD');
$isCustom = stripos((string)$product, 'custom') !== false;

$l1 = $isCompostable ? 'Material' : 'Length';
$l2 = $isCompostable ? 'Shape' : 'Width';
$l3 = $isCompostable ? 'Case Quantity' : 'Thickness (&micro;m)';

if (!$isCustom) {
  $message .= "<p>" . $l1 . ": " . htmlspecialchars($length) . "</p>\n"
    .  "                 <p>" . $l2 . ": " . htmlspecialchars($width) . "</p>\n"
    .  "                 <p>" . $l3 . ": " . htmlspecialchars($thickness) . "</p>";
} else {
  $message .= "<p>Custom Specifications:</p>\n"
    .  "                 <p>" . nl2br(htmlspecialchars($customDetails)) . "</p>";
}

/* if ($product !== "Custom product") {
  $message .= "<p>Length: " . htmlspecialchars($length) . "</p>
                 <p>Width: " . htmlspecialchars($width) . "</p>
                 <p>Thickness: " . htmlspecialchars($thickness) . " μm</p>";
} else {
  $message .= "<p>Custom Specifications:</p>
                 <p>" . nl2br(htmlspecialchars($customDetails)) . "</p>";
}
*/
$code = null;
if (preg_match('/\((AL-[A-Z\-]+)\)/', $product, $m)) {
  $code = $m[1];
}
// Build a simple catalog map for SKU matching
function num($v)
{
  if ($v === '' || $v === null) return null;
  return is_numeric($v) ? (float)$v : null;
}
$lenV = num($length);
$widV = num($width);
$thkV = num($thickness);
$catalog = [
  'AL-FR' => [
    ['sku' => 'AL-FR-01', 'length' => 1000, 'width' => 12, 'thickness' => 12],
    ['sku' => 'AL-FR-02', 'length' => 1000, 'width' => 12, 'thickness' => 14],
    ['sku' => 'AL-FR-03', 'length' => 1000, 'width' => 12, 'thickness' => 16],
    ['sku' => 'AL-FR-04', 'length' => 1000, 'width' => 18, 'thickness' => 14],
    ['sku' => 'AL-FR-05', 'length' => 1000, 'width' => 18, 'thickness' => 16],
    ['sku' => 'AL-FR-06', 'length' => 1000, 'width' => 18, 'thickness' => 17],
    ['sku' => 'AL-FR-07', 'length' => 1000, 'width' => 18, 'thickness' => 24],
    ['sku' => 'AL-FR-08', 'length' => 1000, 'width' => 24, 'thickness' => 21],
    ['sku' => 'AL-FR-09', 'length' => 500, 'width' => 12, 'thickness' => 23],
    ['sku' => 'AL-FR-10', 'length' => 500, 'width' => 18, 'thickness' => 14],
    ['sku' => 'AL-FR-11', 'length' => 500, 'width' => 18, 'thickness' => 16],
    ['sku' => 'AL-FR-12', 'length' => 500, 'width' => 18, 'thickness' => 18],
    ['sku' => 'AL-FR-13', 'length' => 500, 'width' => 18, 'thickness' => 20],
    ['sku' => 'AL-FR-14', 'length' => 500, 'width' => 18, 'thickness' => 24],
  ],
  'AL-FS' => [
    ['sku' => 'AL-FS-01', 'length' => 9, 'width' => 10.75, 'thickness' => 12],
    ['sku' => 'AL-FS-02', 'length' => 9, 'width' => 10.75, 'thickness' => 14],
    ['sku' => 'AL-FS-03', 'length' => 12, 'width' => 10.75, 'thickness' => 14],
    ['sku' => 'AL-FS-04', 'length' => 12, 'width' => 10.75, 'thickness' => 16],
  ],
  'AL-CF' => [
    ['sku' => 'AL-CF-01', 'length' => 14, 'width' => 10.75, 'thickness' => 16],
    ['sku' => 'AL-CF-02', 'length' => 14, 'width' => 16, 'thickness' => 16],
  ],
  // Rectangular trays (use Max Length/Width and Thickness)
  'AL-FT-RCT' => [
    ['sku' => 'AL-FT-RCT-01', 'length' => 20.7, 'width' => 12.9, 'thickness' => 154],
    ['sku' => 'AL-FT-RCT-02', 'length' => 20.7, 'width' => 12.9, 'thickness' => 140],
    ['sku' => 'AL-FT-RCT-03', 'length' => 20.7, 'width' => 12.9, 'thickness' => 154],
    ['sku' => 'AL-FT-RCT-04', 'length' => 12.6, 'width' => 10.6, 'thickness' => 94],
    ['sku' => 'AL-FT-RCT-05', 'length' => 12.6, 'width' => 10.6, 'thickness' => 84],
    ['sku' => 'AL-FT-RCT-06', 'length' => 12.6, 'width' => 10.6, 'thickness' => 107],
    ['sku' => 'AL-FT-RCT-07', 'length' => 12.6, 'width' => 10.6, 'thickness' => 110],
    ['sku' => 'AL-FT-RCT-08', 'length' => 6.125, 'width' => 3.75, 'thickness' => 82],
  ],
  // Round trays (Diameter, Depth, Thickness) mapped to length, width, thickness
  'AL-FT-RND' => [
    ['sku' => 'AL-FT-RND-01', 'length' => 7, 'width' => 1.6, 'thickness' => 60],
    ['sku' => 'AL-FT-RND-02', 'length' => 7, 'width' => 1.6, 'thickness' => 85],
    ['sku' => 'AL-FT-RND-03', 'length' => 8, 'width' => 1.6, 'thickness' => 78],
    ['sku' => 'AL-FT-RND-04', 'length' => 9, 'width' => 1.8, 'thickness' => 81],
    ['sku' => 'AL-FT-RND-05', 'length' => 9, 'width' => 1.8, 'thickness' => 65],
  ],
  // Rectangular lids (use Max Length/Width and Thickness)
  'AL-FT-RCT-LD' => [
    ['sku' => 'AL-FT-RCT-LD-01', 'length' => 21.3, 'width' => 13.3, 'thickness' => 103],
    ['sku' => 'AL-FT-RCT-LD-02', 'length' => 13, 'width' => 10.7, 'thickness' => 85],
    ['sku' => 'AL-FT-RCT-LD-03', 'length' => 20.6, 'width' => 12.8, 'thickness' => 60],
    ['sku' => 'AL-FT-RCT-LD-04', 'length' => 12.7, 'width' => 10.4, 'thickness' => 85],
  ],
];

$matchedSku = 'Custom product';
if ($code && isset($catalog[$code]) && $lenV !== null && $widV !== null && $thkV !== null) {
  foreach ($catalog[$code] as $item) {
    if (abs($item['length'] - $lenV) < 0.0001 && abs($item['width'] - $widV) < 0.0001 && abs($item['thickness'] - $thkV) < 0.0001) {
      $matchedSku = $item['sku'];
      break;
    }
  }
}

// Match SKU for compostable families using Material, Shape, Case Quantity
if ($isCompostable && $matchedSku === 'Custom product') {
  $cp_code = $code_all; // e.g., CP-TC, CP-PT, CP-BL, PT-LD
  $matV = is_string($length) ? strtolower(trim($length)) : '';
  $shapeV = is_string($width) ? strtolower(trim($width)) : '';
  $caseV = is_numeric($thickness) ? (float)$thickness : null;

  $cp_catalog = [
    'CP-TC' => [
      ['sku' => 'CP-TC-02', 'material' => 'bagasse fiber (sugarcane)', 'shape' => 'square',      'caseQuantity' => 200],
      ['sku' => 'CP-TC-03', 'material' => 'bagasse fiber (sugarcane)', 'shape' => 'square',      'caseQuantity' => 200],
      ['sku' => 'CP-TC-04', 'material' => 'plant fiber',               'shape' => 'square',      'caseQuantity' => 200],
      ['sku' => 'CP-TC-05', 'material' => 'plant fiber',               'shape' => 'rectangular', 'caseQuantity' => 250],
      ['sku' => 'CP-TC-14', 'material' => 'mineral-filled polypropylene (mfpp)', 'shape' => 'square', 'caseQuantity' => 120],
    ],
    'CP-PT' => [
      ['sku' => 'CP-PT-01', 'material' => 'pulp fiber',    'shape' => 'round', 'caseQuantity' => 1000],
      ['sku' => 'CP-PT-03', 'material' => 'pulp fiber',    'shape' => 'round', 'caseQuantity' => 500],
      ['sku' => 'CP-PT-07', 'material' => 'pulp fiber',    'shape' => 'round', 'caseQuantity' => 500],
      ['sku' => 'CP-PT-10', 'material' => 'pulp fiber',    'shape' => 'oval',  'caseQuantity' => 500],
      ['sku' => 'CP-PT-11', 'material' => 'pulp fiber',    'shape' => 'oval',  'caseQuantity' => 500],
      ['sku' => 'CP-PT-13', 'material' => 'bagasse fiber', 'shape' => 'round', 'caseQuantity' => 500],
    ],
    'CP-BL' => [
      ['sku' => 'CP-BL-01', 'material' => 'pulp fiber',                   'shape' => 'round', 'caseQuantity' => 1000],
      ['sku' => 'CP-BL-03', 'material' => 'bagasse fiber (sugarcane)\nbamboo', 'shape' => 'round', 'caseQuantity' => 1000],
      ['sku' => 'CP-BL-04', 'material' => 'bagasse fiber (sugarcane)\nbamboo', 'shape' => 'round', 'caseQuantity' => 300],
      ['sku' => 'CP-BL-05', 'material' => 'bagasse fiber (sugarcane)\nbamboo', 'shape' => 'round', 'caseQuantity' => 250],
    ],
    'PT-LD' => [
      ['sku' => 'PT-LD-01', 'material' => 'pet', 'shape' => 'dome', 'caseQuantity' => 500],
      ['sku' => 'PT-LD-02', 'material' => 'pet', 'shape' => 'dome', 'caseQuantity' => 300],
      ['sku' => 'PT-LD-03', 'material' => 'pet', 'shape' => 'flat', 'caseQuantity' => 1000],
    ],
  ];

  if ($cp_code && isset($cp_catalog[$cp_code]) && $matV && $shapeV && $caseV !== null) {
    foreach ($cp_catalog[$cp_code] as $it) {
      if ($it['material'] === $matV && $it['shape'] === $shapeV && abs($it['caseQuantity'] - $caseV) < 0.0001) {
        $matchedSku = $it['sku'];
        break;
      }
    }
  }
}

$message .= "<p class='label'>SKU:</p><p>" . htmlspecialchars($matchedSku) . "</p>";

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
$adminHeaders .= "Cc: rthomas@pivotmkg.com\r\n";

// Send admin email
$mailSent = mail($to, $subject, $message, $adminHeaders);

// Send confirmation email to user (if email provided)
$userSent = false;
if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $userSubject = "We received your quote request - SreeVee";
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
  // New: derive family and display appropriate fields
  $code_all_u = null;
  if (preg_match('/\(([A-Z0-9\-]+)\)/', (string)$product, $mAllU)) {
    $code_all_u = $mAllU[1];
  }
  $isCompostableU = $code_all_u && (strpos($code_all_u, 'CP-') === 0 || $code_all_u === 'PT-LD');
  $isCustomU = stripos((string)$product, 'custom') !== false;
  $l1u = $isCompostableU ? 'Material' : 'Length';
  $l2u = $isCompostableU ? 'Shape' : 'Width';
  $l3u = $isCompostableU ? 'Case Quantity' : 'Thickness (&micro;m)';
  if (!$isCustomU) {
    $userMsg .= "<p>${l1u}: " . htmlspecialchars($length) . "</p>"
      .  "<p>${l2u}: " . htmlspecialchars($width) . "</p>"
      .  "<p>${l3u}: " . htmlspecialchars($thickness) . "</p>";
  } else if ($customDetails) {
    $userMsg .= "<p>Custom specifications:</p><p>" . nl2br(htmlspecialchars($customDetails)) . "</p>";
  }
  /* if ($product !== "Custom product") {
    $userMsg .= "<p>Length: " . htmlspecialchars($length) . "</p>
                     <p>Width: " . htmlspecialchars($width) . "</p>
                     <p>Thickness: " . htmlspecialchars($thickness) . " μm</p>";
  } else if ($customDetails) {
    $userMsg .= "<p>Custom specifications:</p><p>" . nl2br(htmlspecialchars($customDetails)) . "</p>";
  } */
  $userMsg .= "<p>SKU: " . htmlspecialchars($matchedSku) . "</p>";
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

// --- Also push to Google Sheets via Apps Script (non-blocking) ---
// NOTE: Replace the URL below with your deployed Web App URL for this quote form.
$gs_url = 'https://script.google.com/macros/s/AKfycbxA_2YWFsou56-FcwQ1StkAUAFuuuFPyd_uflspHCECczlLcwS0To_DrMzOJfulleAlfQ/exec';

try {
  // Determine product family and normalize compostable fields
  $code_all = null;
  if (preg_match('/\(([A-Z0-9\-]+)\)/', (string)$product, $mm)) {
    $code_all = $mm[1];
  }
  $family = 'unknown';
  if ($code_all) {
    if (strpos($code_all, 'AL-') === 0) $family = 'aluminum';
    if (strpos($code_all, 'CP-') === 0 || $code_all === 'PT-LD') $family = 'compostable';
  }
  $material = '';
  $shape = '';
  $caseQty = '';
  if ($family === 'compostable') {
    $material = $length; // front-end uses length/width/thickness positions
    $shape = $width;
    $caseQty = $thickness;
  }

  $payload = [
    'token'         => '123123123', // must match the Apps Script token
    'family'        => $family,
    'code'          => $code_all,
    'product'       => $product,
    'length'        => $length,
    'width'         => $width,
    'thickness'     => $thickness,
    'material'      => $material,
    'shape'         => $shape,
    'caseQuantity'  => $caseQty,
    'company'       => $company,
    'name'          => $name,
    'email'         => $email,
    'phone'         => $phone,
    'datasheet'     => $datasheet,
    'notes'         => $notes,
    'customDetails' => $customDetails,
    'sku'           => isset($matchedSku) ? $matchedSku : '',
    'ua'            => $_SERVER['HTTP_USER_AGENT'] ?? '',
    'ip'            => $_SERVER['REMOTE_ADDR'] ?? '',
  ];

  if (filter_var($gs_url, FILTER_VALIDATE_URL)) {
    $ch = curl_init($gs_url);
    curl_setopt_array($ch, [
      CURLOPT_POST           => true,
      CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POSTFIELDS     => json_encode($payload),
      CURLOPT_TIMEOUT        => 10,
    ]);
    $gs_response = curl_exec($ch);
    $gs_status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($gs_status !== 200) {
      error_log('GSHEET push failed: ' . $gs_status . ' ' . $gs_response);
    }
  }
} catch (Throwable $e) {
  error_log('GSHEET push exception: ' . $e->getMessage());
}
