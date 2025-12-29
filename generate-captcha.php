<?php
session_start();

$num1 = rand(1, 10);
$num2 = rand(1, 10);
$answer = $num1 + $num2;

$_SESSION['captcha_answer'] = $answer;

echo json_encode([
    'question' => "$num1 + $num2 = ?",
    'success' => true
]);