<?php
    header('Content-Type: application/json;charset=UTF-8');

    if(empty($_GET['email'])){
        $return = array( 'res' => 0, 'msg' => 'Enter Valid Email Address' );
        echo json_encode($_GET, JSON_PRETTY_PRINT);
        exit();
    }
    $to = 'mail@deep-panchal.com';
    $subject = 'Message from : '+$_GET['name'];
    $message = 'Message :'.$_GET['message'];
    $headers = 'From: noreply@daniellebutters.ca'.'/r/n';
    $headers .= 'Reply-To:'.$_GET['email'];

    if(mail($to, $subject, $message, $headers)){
        $return = array( 'res' => 200, 'msg' => 'Your Message successfully sent.' );
    } else {
        $return = array( 'res' => 0, 'msg' => 'Failed To submit your message' );
    }
    echo json_encode($return, JSON_PRETTY_PRINT);
    exit();
?>
