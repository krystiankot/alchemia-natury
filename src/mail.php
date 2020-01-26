<?php
if(isset($_POST['data'])) {
    $data = json_decode($_POST['data'], true);
    $to      = 'kontakt@alchemianatury.pl';
    $subject = $data['subject'];
    $message = $data['message'];
    $headers = array(
    'From' => $data['name'].' <'.$data['email'].'>',
    'X-Mailer' => 'PHP/' . phpversion(),
    'Reply-To' => $data['email'],
    'Content-Type' => 'text/html;charset=utf-8'
    );

    mail($to, $subject, $message, $headers);
    echo 'success';
}
else echo 'failed';
?>