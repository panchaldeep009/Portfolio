<?php
    
    include 'connect.php';

    try{
        /// Create Tables for portfolio
        $pdo->query("CREATE TABLE IF NOT EXISTS `tbl_portfolio_item` ( 
            `item_id` INT(255) NOT NULL AUTO_INCREMENT , 
            `item_name` VARCHAR(255) NOT NULL ,
            `item_about` VARCHAR(255) NOT NULL ,
            `item_date` VARCHAR(255) NOT NULL ,
            `item_resource` VARCHAR(255) NOT NULL ,
            `item_main_category` VARCHAR(255) NOT NULL ,
            PRIMARY KEY (`item_id`)) CHARACTER SET utf8 COLLATE utf8_general_ci");

        $pdo->query("CREATE TABLE IF NOT EXISTS `tbl_media` ( 
            `media_id` INT(255) NOT NULL AUTO_INCREMENT , 
            `item_id` INT(255) NOT NULL,
            `media_src` VARCHAR(100) NOT NULL , 
            `media_type` VARCHAR(12) NOT NULL ,
            `media_size` VARCHAR(12) NOT NULL , 
            `media_caption` VARCHAR(255) NOT NULL , 
            PRIMARY KEY (`media_id`)) CHARACTER SET utf8 COLLATE utf8_general_ci");

        $pdo->query("CREATE TABLE IF NOT EXISTS `tbl_sub_category` ( 
            `sub_category_id` INT(255) NOT NULL AUTO_INCREMENT , 
            `sub_category_name` VARCHAR(100) NOT NULL , 
            PRIMARY KEY (`sub_category_id`)) CHARACTER SET utf8 COLLATE utf8_general_ci");

        $pdo->query("CREATE TABLE IF NOT EXISTS `tbl_sub_category_connect` ( 
            `sub_category_connect_id` INT(255) NOT NULL AUTO_INCREMENT , 
            `item_id` VARCHAR(255) NOT NULL , 
            `sub_category_id` VARCHAR(100) NOT NULL , 
            PRIMARY KEY (`sub_category_connect_id`)) CHARACTER SET utf8 COLLATE utf8_general_ci");
        
        $pdo->query("CREATE TABLE IF NOT EXISTS `tbl_used_technology` ( 
            `technology_id` INT(255) NOT NULL AUTO_INCREMENT , 
            `technology_name` VARCHAR(100) NOT NULL , 
            PRIMARY KEY (`technology_id`)) CHARACTER SET utf8 COLLATE utf8_general_ci");
        
        $pdo->query("CREATE TABLE IF NOT EXISTS `tbl_used_technology_connect` ( 
            `technology_connect_id` INT(255) NOT NULL AUTO_INCREMENT , 
            `item_id` VARCHAR(255) NOT NULL , 
            `technology_id` VARCHAR(100) NOT NULL , 
            PRIMARY KEY (`technology_connect_id`)) CHARACTER SET utf8 COLLATE utf8_general_ci");

    } catch(PDOException $exception){
        echo 'Error'.$exception->getMessage();
        exit();
    }

?>