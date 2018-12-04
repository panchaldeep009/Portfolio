<?php
    try{
        $db_username = 'root';
        $db_password = '';
    
        $pdo = new PDO("mysql:host=localhost", $db_username, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        $dbname = "`db_portfolio`";
        $pdo->query("CREATE DATABASE IF NOT EXISTS $dbname");
        $pdo->query("use $dbname");

    } catch(PDOException $exception){
        echo 'connection error'.$exception->getMessage();
        exit();
    }
?>