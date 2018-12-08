-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 08, 2018 at 10:21 PM
-- Server version: 5.7.21
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_media`
--

DROP TABLE IF EXISTS `tbl_media`;
CREATE TABLE IF NOT EXISTS `tbl_media` (
  `media_id` int(255) NOT NULL AUTO_INCREMENT,
  `item_id` int(255) NOT NULL,
  `media_src` varchar(100) NOT NULL DEFAULT 'images/portfolio_images/',
  `media_type` varchar(12) NOT NULL DEFAULT 'image',
  `media_size` varchar(12) NOT NULL DEFAULT 'normal',
  `media_caption` varchar(255) NOT NULL,
  PRIMARY KEY (`media_id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_media`
--

INSERT INTO `tbl_media` (`media_id`, `item_id`, `media_src`, `media_type`, `media_size`, `media_caption`) VALUES
(1, 1, 'images/portfolio_images/3d-live-letters.jpg', 'image', 'normal', '3D letters'),
(2, 2, 'images/portfolio_images/architecture.jpg', 'image', 'normal', 'Screen Capture of Architecture Single page.'),
(3, 3, 'images/portfolio_images/snake-game-js.jpg', 'image', 'normal', 'Snake Game Screen shot'),
(4, 4, 'images/portfolio_images/starship-toopers-game.jpg', 'image', 'normal', 'troopers game'),
(6, 5, 'images/portfolio_images/info_graphic_1.jpg', 'image', 'large', ''),
(12, 10, 'images/portfolio_images/flashback.jpg', 'image', 'land', ''),
(7, 5, 'images/portfolio_images/info_graphic_2.jpg', 'image', 'normal', ''),
(8, 6, 'images/portfolio_images/imageToText.JPG', 'image', 'normal', ''),
(9, 7, 'images/portfolio_images/depthMap.JPG', 'image', 'normal', ''),
(10, 8, 'images/portfolio_images/svg-icon.JPG', 'image', 'normal', ''),
(11, 9, 'images/portfolio_images/agencyX.JPG', 'image', 'land', ''),
(13, 11, 'images/portfolio_images/purevolume_1.jpg', 'image', 'normal', ''),
(14, 11, 'images/portfolio_images/purevolume_2.jpg', 'image', 'normal', ''),
(15, 11, 'images/portfolio_images/purevolume_2_1.jpg', 'image', 'normal', ''),
(16, 11, 'images/portfolio_images/purevolume_3.jpg', 'image', 'normal', ''),
(17, 11, 'images/portfolio_images/purevolume_1_h.jpg', 'image', 'normal', ''),
(18, 11, 'images/portfolio_images/purevolume_2_2.jpg', 'image', 'normal', ''),
(19, 12, 'images/portfolio_images/efeed.jpg', 'image', 'normal', ''),
(20, 12, 'images/portfolio_images/efeed_1.jpg', 'image', 'normal', ''),
(21, 12, 'images/portfolio_images/efeed_2.jpg', 'image', 'normal', ''),
(22, 13, 'images/portfolio_images/fcv_1.jpg', 'image', 'normal', ''),
(23, 13, 'images/portfolio_images/fcv_2.jpg', 'image', 'normal', ''),
(24, 13, 'images/portfolio_images/fcv_3.jpg', 'image', 'normal', ''),
(25, 14, 'https://www.youtube.com/embed/1VSYwarqpeo', 'video', 'normal', ''),
(26, 15, 'https://www.youtube.com/embed/2VJ4UyYXqXI', 'video', 'normal', ''),
(27, 16, 'https://www.youtube.com/embed/y3NOS8ji3yk', 'video', 'normal', ''),
(28, 17, 'https://www.youtube.com/embed/7ql2WcGI1-w', 'video', 'normal', ''),
(29, 18, 'https://www.youtube.com/embed/7yGArnuvDm4', 'video', 'normal', ''),
(30, 19, 'https://player.vimeo.com/video/305167354', 'video', 'normal', ''),
(31, 20, 'https://player.vimeo.com/video/305247815', 'video', 'normal', ''),
(32, 21, 'https://player.vimeo.com/video/304495579', 'video', 'normal', ''),
(33, 22, 'https://player.vimeo.com/video/304495460', 'video', 'normal', ''),
(34, 23, 'https://player.vimeo.com/video/304494367', 'video', 'normal', ''),
(35, 23, 'https://player.vimeo.com/video/304495297', 'video', 'normal', 'making'),
(36, 24, 'images/portfolio_images/cosmetics1.jpg', 'image', 'normal', ''),
(37, 24, 'images/portfolio_images/cosmetics2.jpg', 'image', 'normal', ''),
(38, 24, 'images/portfolio_images/cosmetics3.jpg', 'image', 'normal', ''),
(39, 25, 'images/portfolio_images/EnergyDrink_2.jpg', 'image', 'normal', ''),
(40, 25, 'images/portfolio_images/EnergyDrink_1.jpg', 'image', 'normal', ''),
(41, 26, 'images/portfolio_images/doth_poster.jpg', 'image', 'normal', ''),
(42, 26, 'images/portfolio_images/doth_ui.jpg', 'image', 'normal', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_portfolio_item`
--

DROP TABLE IF EXISTS `tbl_portfolio_item`;
CREATE TABLE IF NOT EXISTS `tbl_portfolio_item` (
  `item_id` int(255) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `item_about` varchar(255) NOT NULL,
  `item_date` varchar(255) NOT NULL,
  `item_resource` varchar(255) NOT NULL,
  `item_main_category` varchar(255) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_portfolio_item`
--

INSERT INTO `tbl_portfolio_item` (`item_id`, `item_name`, `item_about`, `item_date`, `item_resource`, `item_main_category`) VALUES
(1, 'Interactive 3D Letters', 'This project about positioning DIV element using css transfrom 3D and interacts on mouse move.', '24/06/2018', 'https://github.com/panchaldeep009/interactive-3d-letters-from-div', 'code'),
(2, 'Architecture Single Page ( CSS )', 'This is single page CSS practice project', '15/02/2018', 'https://github.com/panchaldeep009/architecture-css', 'code'),
(3, 'Auto Multiplayer Snake Game', 'This is classic snake game made using JavaScript and A lots pf DIV, just difference is there are more then on snake casing one food and all those snakes controlled by a JavaScript function.', '10/07/2018', 'https://github.com/panchaldeep009/snake-game-js', 'code'),
(4, 'Starship Troopers Game', 'This game made using JavaScript Canvas in which players shoot bugs where first player can control by user and other players are auto controlled by a program', '23/08/2018', 'https://github.com/panchaldeep009/STGame', 'code'),
(5, 'Interactive SVG Infographic', 'This web application generates creative interactive infographic using SVG from JSON data', '01/09/2018', 'https://github.com/panchaldeep009/interactive_svg_infographic', 'code'),
(6, 'Pixels to Text Art', 'This project job is to convert images and video to text illustration', '19/10/2018', 'https://github.com/panchaldeep009/interactive_svg_infographic', 'code'),
(7, 'Depth Map Generator', 'This JavaScript Program use to generate depth map from stereo images.', '21/10/2018', 'https://github.com/panchaldeep009/DepthMapGeneratorJS', 'code'),
(8, 'SVG Social Animated Icons', 'This is SVG social icon set, animates on mouse hover', '09/06/2018', 'https://github.com/panchaldeep009/SVG-ICONS-SET', 'code'),
(9, 'Agency X', 'porti & deep is a class team that positions itself as a potential Web agency. For this particular project we are creating single page website which will serve our collaboration as a portfolio website for our work.', '5/10/2018', 'https://github.com/portikM/AstonMartin', 'code'),
(10, 'Flashback - A Movies/TV shows Info App', 'In this project Flashback is website that fetch data from internet including Trailer and poster of movies and TV shows from 1950 to 1990.', '5/12/2018', 'https://github.com/portikM/Roku-Flashback', 'code'),
(11, 'Purevolume', 'PUREVOLUME is a media platform that delivers a diverse range of content. For Which, I Develop front-end web and gives interactivity using JavaScript including custom video player controls ', '13/10/2018', 'https://github.com/daniellebutters37/purevolume.project', 'code'),
(12, 'eFeed.in', 'It was students networking website, I build in school when I newly learn PHP, MySQL, This huge project allow me to be master in logical arrangements, PHP, MySQL table data management.it is made without any frameworks, and it has real time data refresh.', '15/04/2013', 'data/porfoilio_resources/efeed.in.zip', 'code'),
(13, 'FCV ', 'This app I made for my father\'s business, it has huge database of monthly TV channels subscription fees collection. It is made of purely PHP, MySQL and  Bootstrap and embedded in Android Application.', '01/01/2016', 'data/porfoilio_resources/FCV.zip', 'code'),
(14, 'Happy Dhanterash wishing video', '', '17/10/2017', 'https://www.youtube.com/watch?v=1VSYwarqpeo', 'design'),
(15, 'Wish You Happy Diwali', '', '19/10/2017', 'https://www.youtube.com/watch?v=2VJ4UyYXqXI', 'design'),
(16, 'Happy New Year Wishing', '', '18/10/2017', 'https://www.youtube.com/watch?v=y3NOS8ji3yk', 'design'),
(17, 'Wishing Happy Kali Chaudas', '', '15/10/2017', 'https://www.youtube.com/watch?v=7ql2WcGI1-w', 'design'),
(18, 'Name with Turbulence | Blender', '', '10/07/2016', 'https://www.youtube.com/watch?v=7yGArnuvDm4', 'design'),
(19, 'Aston Martin Car Promo', '', '05/12/2018', 'https://vimeo.com/305167354', 'design'),
(20, 'My Demo Reel', '', '07/12/2018', 'https://vimeo.com/305247815', 'design'),
(21, 'Soccer Trophy Promo', '', '10/11/2018', 'https://vimeo.com/304495579', 'design'),
(22, 'Branding of A Infuser Bottle', '', '20/11/2018', 'https://vimeo.com/304495460', 'design'),
(23, 'India\'s Independence Day 3D flag', '', '15/08/2018', 'https://vimeo.com/304494367', 'design'),
(24, 'Cosmetic Mockups', '', '20/08/2018', '', 'design'),
(25, 'Energy Drink', '', '20/10/2018', '', 'design'),
(26, 'Dot to the Horizon', '', '05/02/2018', '', 'design');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_category`
--

DROP TABLE IF EXISTS `tbl_sub_category`;
CREATE TABLE IF NOT EXISTS `tbl_sub_category` (
  `sub_category_id` int(255) NOT NULL AUTO_INCREMENT,
  `sub_category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`sub_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_sub_category`
--

INSERT INTO `tbl_sub_category` (`sub_category_id`, `sub_category_name`) VALUES
(1, 'Front-end Web Development'),
(2, 'Back-end Web Development'),
(3, 'Python'),
(5, 'Android'),
(6, 'Graphics Design'),
(7, 'Motion Design');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_category_connect`
--

DROP TABLE IF EXISTS `tbl_sub_category_connect`;
CREATE TABLE IF NOT EXISTS `tbl_sub_category_connect` (
  `sub_category_connect_id` int(255) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(255) NOT NULL,
  `sub_category_id` varchar(100) NOT NULL,
  PRIMARY KEY (`sub_category_connect_id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_sub_category_connect`
--

INSERT INTO `tbl_sub_category_connect` (`sub_category_connect_id`, `item_id`, `sub_category_id`) VALUES
(1, '1', '1'),
(2, '2', '1'),
(3, '3', '1'),
(4, '4', '1'),
(6, '5', '1'),
(7, '6', '1'),
(8, '7', '1'),
(9, '8', '1'),
(10, '6', '3'),
(11, '9', '1'),
(12, '10', '1'),
(13, '10', '2'),
(14, '11', '1'),
(15, '12', '1'),
(16, '12', '2'),
(17, '13', '2'),
(18, '13', '5'),
(19, '14', '7'),
(20, '15', '7'),
(21, '16', '7'),
(22, '17', '7'),
(23, '18', '7'),
(24, '19', '7'),
(25, '20', '7'),
(26, '21', '7'),
(27, '22', '7'),
(28, '23', '7'),
(29, '24', '7'),
(30, '25', '7'),
(31, '26', '6\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_used_technology`
--

DROP TABLE IF EXISTS `tbl_used_technology`;
CREATE TABLE IF NOT EXISTS `tbl_used_technology` (
  `technology_id` int(255) NOT NULL AUTO_INCREMENT,
  `technology_name` varchar(100) NOT NULL,
  PRIMARY KEY (`technology_id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_used_technology`
--

INSERT INTO `tbl_used_technology` (`technology_id`, `technology_name`) VALUES
(1, 'CSS'),
(2, 'JavaScript'),
(3, 'HTML'),
(4, 'PHP'),
(5, 'MySQL'),
(6, 'SVG'),
(7, 'Canvas JS'),
(8, 'GSAP'),
(9, 'Lottie'),
(10, 'JSON'),
(11, 'SASS'),
(12, 'Gulp'),
(13, 'Vue'),
(14, 'Python'),
(15, 'Python OpenCV'),
(17, 'Ajax'),
(18, 'jQuery'),
(19, 'Bootstrap'),
(20, 'Java ( Android )'),
(21, 'Adobe After Effects'),
(22, 'Adobe Photoshop'),
(23, 'Adobe Illustrator'),
(24, 'Blender'),
(25, 'Cinema 4D'),
(26, 'RealFlow');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_used_technology_connect`
--

DROP TABLE IF EXISTS `tbl_used_technology_connect`;
CREATE TABLE IF NOT EXISTS `tbl_used_technology_connect` (
  `technology_connect_id` int(255) NOT NULL AUTO_INCREMENT,
  `item_id` varchar(255) NOT NULL,
  `technology_id` varchar(100) NOT NULL,
  PRIMARY KEY (`technology_connect_id`)
) ENGINE=MyISAM AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_used_technology_connect`
--

INSERT INTO `tbl_used_technology_connect` (`technology_connect_id`, `item_id`, `technology_id`) VALUES
(1, '1', '1'),
(2, '1', '2'),
(3, '1', '3'),
(4, '2', '1'),
(5, '2', '3'),
(6, '1', '11'),
(13, '5', '2'),
(8, '3', '2'),
(9, '3', '3'),
(11, '4', '2'),
(12, '4', '7'),
(14, '5', '6'),
(15, '6', '2'),
(16, '6', '7'),
(17, '6', '14'),
(18, '6', '15'),
(19, '7', '2'),
(22, '8', '1'),
(20, '7', '7'),
(23, '8', '2'),
(24, '8', '6'),
(25, '9', '3'),
(26, '9', '2'),
(27, '9', '11'),
(28, '9', '12'),
(29, '9', '17'),
(30, '10', '2'),
(31, '10', '3'),
(32, '10', '11'),
(33, '10', '13'),
(34, '10', '4'),
(35, '10', '5'),
(36, '11', '2'),
(37, '11', '3'),
(38, '11', '11'),
(39, '12', '2'),
(40, '12', '3'),
(44, '12', '1'),
(42, '12', '4'),
(43, '12', '5'),
(45, '12', '17'),
(46, '12', '18'),
(47, '12', '19'),
(48, '13', '2'),
(49, '13', '3'),
(50, '13', '4'),
(51, '13', '5'),
(52, '13', '1'),
(53, '13', '18'),
(54, '13', '19'),
(55, '13', '20'),
(56, '14', '21'),
(57, '15', '21'),
(58, '16', '21'),
(59, '17', '21'),
(60, '18', '24'),
(61, '19', '25'),
(62, '20', '21'),
(63, '21', '25'),
(64, '22', '25'),
(65, '23', '25'),
(66, '24', '25'),
(67, '25', '25'),
(68, '25', '26'),
(69, '26', '22\r\n');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
