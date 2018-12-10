<?php
    header('Content-Type: image/jpeg');
    list($width, $height) = getimagesize($_GET['img']);
    $ratio = $width / $height;
    if( $ratio > 1) {
        $resized_width = $_GET['size']; //suppose 500 is max width or height
        $resized_height = $_GET['size']/$ratio;
    }
    else {
        $resized_width = $_GET['size']*$ratio;
        $resized_height = $_GET['size'];
    }
    function resize_image($file, $w, $h) {
        list($width, $height) = getimagesize($file);
        $src = imagecreatefromjpeg($file);
        $dst = imagecreatetruecolor($w, $h);
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $w, $h, $width, $height);
        return $dst;
    }
    imagejpeg(resize_image($_GET['img'], $resized_width, $resized_height));
?>