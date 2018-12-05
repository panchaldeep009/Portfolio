<?php
    
    include 'connect.php';
    include 'config.php';

    $get_portFolio_item = $pdo->query("SELECT * FROM `tbl_portfolio_item` order by STR_TO_DATE(`item_date`,'%d/%m/%Y') DESC");

    $portfolioArray = array();
    while($row = $get_portFolio_item->fetch(PDO::FETCH_ASSOC)){
        $portfolioArray[] = $row;
    }

    foreach($portfolioArray as $key => $portfolioItem){

        $portfolioArray[$key]['media'] = [];
        $get_media = $pdo->query("SELECT `media_src`,`media_type`,`media_size`,`media_caption` FROM `tbl_media` WHERE `item_id` = ".$portfolioItem['item_id']);
        while($row_media = $get_media->fetch(PDO::FETCH_ASSOC)){
            array_push($portfolioArray[$key]['media'], $row_media);
        }
        
        $portfolioArray[$key]['sub_category'] = [];
        $get_sub_category = $pdo->query("
            SELECT 
                `tbl_sub_category`.`sub_category_id`,
                `tbl_sub_category`.`sub_category_name` 
            FROM `tbl_sub_category_connect` 
            JOIN `tbl_sub_category` 
            ON `tbl_sub_category_connect`.`sub_category_id` = `tbl_sub_category`.`sub_category_id` 
            WHERE `tbl_sub_category_connect`.`item_id` = ".$portfolioItem['item_id']);
        while($row = $get_sub_category->fetch(PDO::FETCH_ASSOC)){
            array_push($portfolioArray[$key]['sub_category'], $row);
        }
        
        $portfolioArray[$key]['technology'] = [];
        $get_sub_category = $pdo->query("
            SELECT 
                `tbl_used_technology`.`technology_id`,
                `tbl_used_technology`.`technology_name` 
            FROM `tbl_used_technology_connect` 
            JOIN `tbl_used_technology` 
            ON `tbl_used_technology_connect`.`technology_id` = `tbl_used_technology`.`technology_id` 
            WHERE `tbl_used_technology_connect`.`item_id` = ".$portfolioItem['item_id']);
        while($row = $get_sub_category->fetch(PDO::FETCH_ASSOC)){
            array_push($portfolioArray[$key]['technology'], $row);
        }
    }

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json;charset=UTF-8');
    echo json_encode($portfolioArray, JSON_PRETTY_PRINT);
?>