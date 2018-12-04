<?php
    
    include 'connect.php';
    include 'config.php';
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json;charset=UTF-8');
    echo json_encode([], JSON_PRETTY_PRINT);
?>