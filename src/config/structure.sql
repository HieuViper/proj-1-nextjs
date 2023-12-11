-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2023 at 03:39 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nextdb`
--

--
-- Table structure for table `icons`
--

CREATE TABLE `icons` (
  `keyIcon` varchar(20) NOT NULL,
  `url` varchar(200) NOT NULL COMMENT 'relative path form : /upload/icons/icon1.jpg',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `imgs`
--

CREATE TABLE `imgs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(200) DEFAULT NULL COMMENT 'url has format: /upload/jan2023',
  `alt` varchar(200) DEFAULT '',
  `caption` varchar(200) DEFAULT '',
  `srcset` varchar(400) DEFAULT '',
  `author` varchar(200) DEFAULT NULL COMMENT 'It contains username that is used to login',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `code` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL COMMENT 'Short Description',
  `active` tinyint(1) DEFAULT 1 COMMENT 'Active language'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`code`, `name`, `description`, `active`) VALUES
('en', 'english', 'english', 1),
('vi', 'tiếng việt', 'tiếng việt', 1);
-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(200) DEFAULT NULL COMMENT 'feature image of the post',
  `categories` varchar(200) DEFAULT 'default' COMMENT 'Categories has the format: category1, category2, category3',
  `post_author` varchar(200) NOT NULL COMMENT 'It contains username that is used to login',
  `post_date` datetime DEFAULT NULL COMMENT 'Publish date of the article',
  `post_status` varchar(20) NOT NULL DEFAULT 'draft' COMMENT 'post status has 3 states: draft, publish, trash',
  `article_code` varchar(200) NOT NULL COMMENT 'article code is used to build URL',
  `modified_by` varchar(200) DEFAULT NULL COMMENT 'This one is not the author, he is the one modified the article',
  `menu_id` int(11) UNSIGNED DEFAULT NULL,
  `article_position` int(11) DEFAULT 0 COMMENT 'The order position of element',
  `comment_status` varchar(20) DEFAULT NULL,
  `comment_count` int(10) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `post_modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `image`, `categories`, `post_author`, `post_date`, `post_status`, `article_code`, `modified_by`, `menu_id`, `article_position`, `comment_status`, `comment_count`, `createdAt`, `post_modified`) VALUES
(1, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project1', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(2, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project2', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(3, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project3', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(4, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project4', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(5, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project5', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(6, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project6', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(7, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project7', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(8, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project8', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(9, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project9', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(10, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project10', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(11, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project11', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(12, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project12', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(13, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project13', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(14, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project14', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(15, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project15', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(16, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project16', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(17, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project17', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(18, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project18', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(19, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project19', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(20, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project20', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(21, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project21', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(22, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project22', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(23, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project23', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(24, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project24', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(25, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project25', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(26, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project26', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(27, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project27', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(28, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project28', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(29, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project29', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(30, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project30', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(31, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project31', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(32, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project32', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(33, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project33', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(34, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project34', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(35, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project35', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(36, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project36', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(37, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project37', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(38, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project38', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(39, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project39', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(40, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project40', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(41, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project41', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(42, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project42', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(43, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project43', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(44, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project44', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(45, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project45', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(46, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project46', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(47, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project47', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(48, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project48', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(49, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project49', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(50, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project50', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(51, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project51', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(52, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project52', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(53, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project53', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(54, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project54', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(55, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project55', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(56, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project56', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(57, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project57', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(58, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project58', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(59, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project59', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(60, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project60', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(61, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project61', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(62, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project62', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(63, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project63', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(64, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project64', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(65, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project65', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(66, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project66', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(67, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project67', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(68, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project68', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(69, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project69', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(70, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project70', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(71, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project71', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(72, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project72', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(73, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project73', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(74, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project74', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(75, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project75', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(76, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project76', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(77, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project77', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(78, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project78', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(79, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project79', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(80, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project80', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(81, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project81', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(82, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project82', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(83, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project83', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(84, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project84', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(85, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project85', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(86, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project86', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(87, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project87', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(88, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project88', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(89, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project89', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(90, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project90', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(91, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project91', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(92, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project92', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(93, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project93', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(94, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project94', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(95, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project95', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(96, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project96', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(97, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project97', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(98, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project98', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(99, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project99', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(100, NULL, 'cat-1, cat-2', 'huy', NULL, 'draft', 'Article_news_project100', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35');

-- --------------------------------------------------------

--
-- Table structure for table `article_categories`
--

CREATE TABLE `article_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_code` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article_categories`
--

INSERT INTO `article_categories` (`id`, `category_code`) VALUES
(1, 'cate-1'),
(2, 'cate-2'),
(3, 'cate-3'),
(4, 'cate-4'),
(5, 'cate-5');

-- --------------------------------------------------------

--
-- Table structure for table `article_cate_langs`
--

CREATE TABLE `article_cate_langs` (
  `name` varchar(200) DEFAULT 'undefined',
  `description` longtext DEFAULT NULL COMMENT 'Description',
  `articleCategoryId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article_cate_langs`
--

INSERT INTO `article_cate_langs` (`name`, `description`, `articleCategoryId`, `languageCode`) VALUES
('Name cate 1', 'description about cate 1', 1, 'en'),
('Tên cate 1', 'mô tả của cate 1', 1, 'vi'),
('Name cate 2', 'description about cate 2', 2, 'en'),
('Tên cate 2', 'mô tả của cate 2', 2, 'vi'),
('Name cate 3', 'description about cate 3', 3, 'en'),
('Tên cate 3', 'mô tả của cate 3', 3, 'vi'),
('Name cate 4', 'description about cate 4', 4, 'en'),
('Tên cate 4', 'mô tả của cate 4', 4, 'vi'),
('Name cate 5', 'description about cate 5', 5, 'en'),
('Tên cate 5', 'mô tả của cate 5', 5, 'vi');

-- --------------------------------------------------------

--
-- Table structure for table `article_languages`
--

CREATE TABLE `article_languages` (
  `title` varchar(300) DEFAULT 'undefined' COMMENT 'Title can be null',
  `excerpt` text DEFAULT NULL COMMENT 'Short Description',
  `content` text DEFAULT NULL COMMENT 'Content of article',
  `articleId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article_languages`
--

INSERT INTO `article_languages` (`title`, `excerpt`, `content`, `articleId`, `languageCode`) VALUES
('Title of news 1', 'Excerpt of news 1', 'Content of news 1', 1, 'en'),
('tiêu đề của tin 1', 'mô tả ngắn của tin 1', 'Nội dung của tin 1', 1, 'vi'),
('Title of news 2', 'Excerpt of news 2', 'Content of news 2', 2, 'en'),
('tiêu đề của tin 2', 'mô tả ngắn của tin 2', 'Nội dung của tin 2', 2, 'vi'),
('Title of news 3', 'Excerpt of news 3', 'Content of news 3', 3, 'en'),
('tiêu đề của tin 3', 'mô tả ngắn của tin 3', 'Nội dung của tin 3', 3, 'vi'),
('Title of news 4', 'Excerpt of news 4', 'Content of news 4', 4, 'en'),
('tiêu đề của tin 4', 'mô tả ngắn của tin 4', 'Nội dung của tin 4', 4, 'vi'),
('Title of news 5', 'Excerpt of news 5', 'Content of news 5', 5, 'en'),
('tiêu đề của tin 5', 'mô tả ngắn của tin 5', 'Nội dung của tin 5', 5, 'vi'),
('Title of news 6', 'Excerpt of news 6', 'Content of news 6', 6, 'en'),
('tiêu đề của tin 6', 'mô tả ngắn của tin 6', 'Nội dung của tin 6', 6, 'vi'),
('Title of news 7', 'Excerpt of news 7', 'Content of news 7', 7, 'en'),
('tiêu đề của tin 7', 'mô tả ngắn của tin 7', 'Nội dung của tin 7', 7, 'vi'),
('Title of news 8', 'Excerpt of news 8', 'Content of news 8', 8, 'en'),
('tiêu đề của tin 8', 'mô tả ngắn của tin 8', 'Nội dung của tin 8', 8, 'vi'),
('Title of news 9', 'Excerpt of news 9', 'Content of news 9', 9, 'en'),
('tiêu đề của tin 9', 'mô tả ngắn của tin 9', 'Nội dung của tin 9', 9, 'vi'),
('Title of news 10', 'Excerpt of news 10', 'Content of news 10', 10, 'en'),
('tiêu đề của tin 10', 'mô tả ngắn của tin 10', 'Nội dung của tin 10', 10, 'vi'),
('Title of news 11', 'Excerpt of news 11', 'Content of news 11', 11, 'en'),
('tiêu đề của tin 11', 'mô tả ngắn của tin 11', 'Nội dung của tin 11', 11, 'vi'),
('Title of news 12', 'Excerpt of news 12', 'Content of news 12', 12, 'en'),
('tiêu đề của tin 12', 'mô tả ngắn của tin 12', 'Nội dung của tin 12', 12, 'vi'),
('Title of news 13', 'Excerpt of news 13', 'Content of news 13', 13, 'en'),
('tiêu đề của tin 13', 'mô tả ngắn của tin 13', 'Nội dung của tin 13', 13, 'vi'),
('Title of news 14', 'Excerpt of news 14', 'Content of news 14', 14, 'en'),
('tiêu đề của tin 14', 'mô tả ngắn của tin 14', 'Nội dung của tin 14', 14, 'vi'),
('Title of news 15', 'Excerpt of news 15', 'Content of news 15', 15, 'en'),
('tiêu đề của tin 15', 'mô tả ngắn của tin 15', 'Nội dung của tin 15', 15, 'vi'),
('Title of news 16', 'Excerpt of news 16', 'Content of news 16', 16, 'en'),
('tiêu đề của tin 16', 'mô tả ngắn của tin 16', 'Nội dung của tin 16', 16, 'vi'),
('Title of news 17', 'Excerpt of news 17', 'Content of news 17', 17, 'en'),
('tiêu đề của tin 17', 'mô tả ngắn của tin 17', 'Nội dung của tin 17', 17, 'vi'),
('Title of news 18', 'Excerpt of news 18', 'Content of news 18', 18, 'en'),
('tiêu đề của tin 18', 'mô tả ngắn của tin 18', 'Nội dung của tin 18', 18, 'vi'),
('Title of news 19', 'Excerpt of news 19', 'Content of news 19', 19, 'en'),
('tiêu đề của tin 19', 'mô tả ngắn của tin 19', 'Nội dung của tin 19', 19, 'vi'),
('Title of news 20', 'Excerpt of news 20', 'Content of news 20', 20, 'en'),
('tiêu đề của tin 20', 'mô tả ngắn của tin 20', 'Nội dung của tin 20', 20, 'vi'),
('Title of news 21', 'Excerpt of news 21', 'Content of news 21', 21, 'en'),
('tiêu đề của tin 21', 'mô tả ngắn của tin 21', 'Nội dung của tin 21', 21, 'vi'),
('Title of news 22', 'Excerpt of news 22', 'Content of news 22', 22, 'en'),
('tiêu đề của tin 22', 'mô tả ngắn của tin 22', 'Nội dung của tin 22', 22, 'vi'),
('Title of news 23', 'Excerpt of news 23', 'Content of news 23', 23, 'en'),
('tiêu đề của tin 23', 'mô tả ngắn của tin 23', 'Nội dung của tin 23', 23, 'vi'),
('Title of news 24', 'Excerpt of news 24', 'Content of news 24', 24, 'en'),
('tiêu đề của tin 24', 'mô tả ngắn của tin 24', 'Nội dung của tin 24', 24, 'vi'),
('Title of news 25', 'Excerpt of news 25', 'Content of news 25', 25, 'en'),
('tiêu đề của tin 25', 'mô tả ngắn của tin 25', 'Nội dung của tin 25', 25, 'vi'),
('Title of news 26', 'Excerpt of news 26', 'Content of news 26', 26, 'en'),
('tiêu đề của tin 26', 'mô tả ngắn của tin 26', 'Nội dung của tin 26', 26, 'vi'),
('Title of news 27', 'Excerpt of news 27', 'Content of news 27', 27, 'en'),
('tiêu đề của tin 27', 'mô tả ngắn của tin 27', 'Nội dung của tin 27', 27, 'vi'),
('Title of news 28', 'Excerpt of news 28', 'Content of news 28', 28, 'en'),
('tiêu đề của tin 28', 'mô tả ngắn của tin 28', 'Nội dung của tin 28', 28, 'vi'),
('Title of news 29', 'Excerpt of news 29', 'Content of news 29', 29, 'en'),
('tiêu đề của tin 29', 'mô tả ngắn của tin 29', 'Nội dung của tin 29', 29, 'vi'),
('Title of news 30', 'Excerpt of news 30', 'Content of news 30', 30, 'en'),
('tiêu đề của tin 30', 'mô tả ngắn của tin 30', 'Nội dung của tin 30', 30, 'vi'),
('Title of news 31', 'Excerpt of news 31', 'Content of news 31', 31, 'en'),
('tiêu đề của tin 31', 'mô tả ngắn của tin 31', 'Nội dung của tin 31', 31, 'vi'),
('Title of news 32', 'Excerpt of news 32', 'Content of news 32', 32, 'en'),
('tiêu đề của tin 32', 'mô tả ngắn của tin 32', 'Nội dung của tin 32', 32, 'vi'),
('Title of news 33', 'Excerpt of news 33', 'Content of news 33', 33, 'en'),
('tiêu đề của tin 33', 'mô tả ngắn của tin 33', 'Nội dung của tin 33', 33, 'vi'),
('Title of news 34', 'Excerpt of news 34', 'Content of news 34', 34, 'en'),
('tiêu đề của tin 34', 'mô tả ngắn của tin 34', 'Nội dung của tin 34', 34, 'vi'),
('Title of news 35', 'Excerpt of news 35', 'Content of news 35', 35, 'en'),
('tiêu đề của tin 35', 'mô tả ngắn của tin 35', 'Nội dung của tin 35', 35, 'vi'),
('Title of news 36', 'Excerpt of news 36', 'Content of news 36', 36, 'en'),
('tiêu đề của tin 36', 'mô tả ngắn của tin 36', 'Nội dung của tin 36', 36, 'vi'),
('Title of news 37', 'Excerpt of news 37', 'Content of news 37', 37, 'en'),
('tiêu đề của tin 37', 'mô tả ngắn của tin 37', 'Nội dung của tin 37', 37, 'vi'),
('Title of news 38', 'Excerpt of news 38', 'Content of news 38', 38, 'en'),
('tiêu đề của tin 38', 'mô tả ngắn của tin 38', 'Nội dung của tin 38', 38, 'vi'),
('Title of news 39', 'Excerpt of news 39', 'Content of news 39', 39, 'en'),
('tiêu đề của tin 39', 'mô tả ngắn của tin 39', 'Nội dung của tin 39', 39, 'vi'),
('Title of news 40', 'Excerpt of news 40', 'Content of news 40', 40, 'en'),
('tiêu đề của tin 40', 'mô tả ngắn của tin 40', 'Nội dung của tin 40', 40, 'vi'),
('Title of news 41', 'Excerpt of news 41', 'Content of news 41', 41, 'en'),
('tiêu đề của tin 41', 'mô tả ngắn của tin 41', 'Nội dung của tin 41', 41, 'vi'),
('Title of news 42', 'Excerpt of news 42', 'Content of news 42', 42, 'en'),
('tiêu đề của tin 42', 'mô tả ngắn của tin 42', 'Nội dung của tin 42', 42, 'vi'),
('Title of news 43', 'Excerpt of news 43', 'Content of news 43', 43, 'en'),
('tiêu đề của tin 43', 'mô tả ngắn của tin 43', 'Nội dung của tin 43', 43, 'vi'),
('Title of news 44', 'Excerpt of news 44', 'Content of news 44', 44, 'en'),
('tiêu đề của tin 44', 'mô tả ngắn của tin 44', 'Nội dung của tin 44', 44, 'vi'),
('Title of news 45', 'Excerpt of news 45', 'Content of news 45', 45, 'en'),
('tiêu đề của tin 45', 'mô tả ngắn của tin 45', 'Nội dung của tin 45', 45, 'vi'),
('Title of news 46', 'Excerpt of news 46', 'Content of news 46', 46, 'en'),
('tiêu đề của tin 46', 'mô tả ngắn của tin 46', 'Nội dung của tin 46', 46, 'vi'),
('Title of news 47', 'Excerpt of news 47', 'Content of news 47', 47, 'en'),
('tiêu đề của tin 47', 'mô tả ngắn của tin 47', 'Nội dung của tin 47', 47, 'vi'),
('Title of news 48', 'Excerpt of news 48', 'Content of news 48', 48, 'en'),
('tiêu đề của tin 48', 'mô tả ngắn của tin 48', 'Nội dung của tin 48', 48, 'vi'),
('Title of news 49', 'Excerpt of news 49', 'Content of news 49', 49, 'en'),
('tiêu đề của tin 49', 'mô tả ngắn của tin 49', 'Nội dung của tin 49', 49, 'vi'),
('Title of news 50', 'Excerpt of news 50', 'Content of news 50', 50, 'en'),
('tiêu đề của tin 50', 'mô tả ngắn của tin 50', 'Nội dung của tin 50', 50, 'vi'),
('Title of news 51', 'Excerpt of news 51', 'Content of news 51', 51, 'en'),
('tiêu đề của tin 51', 'mô tả ngắn của tin 51', 'Nội dung của tin 51', 51, 'vi'),
('Title of news 52', 'Excerpt of news 52', 'Content of news 52', 52, 'en'),
('tiêu đề của tin 52', 'mô tả ngắn của tin 52', 'Nội dung của tin 52', 52, 'vi'),
('Title of news 53', 'Excerpt of news 53', 'Content of news 53', 53, 'en'),
('tiêu đề của tin 53', 'mô tả ngắn của tin 53', 'Nội dung của tin 53', 53, 'vi'),
('Title of news 54', 'Excerpt of news 54', 'Content of news 54', 54, 'en'),
('tiêu đề của tin 54', 'mô tả ngắn của tin 54', 'Nội dung của tin 54', 54, 'vi'),
('Title of news 55', 'Excerpt of news 55', 'Content of news 55', 55, 'en'),
('tiêu đề của tin 55', 'mô tả ngắn của tin 55', 'Nội dung của tin 55', 55, 'vi'),
('Title of news 56', 'Excerpt of news 56', 'Content of news 56', 56, 'en'),
('tiêu đề của tin 56', 'mô tả ngắn của tin 56', 'Nội dung của tin 56', 56, 'vi'),
('Title of news 57', 'Excerpt of news 57', 'Content of news 57', 57, 'en'),
('tiêu đề của tin 57', 'mô tả ngắn của tin 57', 'Nội dung của tin 57', 57, 'vi'),
('Title of news 58', 'Excerpt of news 58', 'Content of news 58', 58, 'en'),
('tiêu đề của tin 58', 'mô tả ngắn của tin 58', 'Nội dung của tin 58', 58, 'vi'),
('Title of news 59', 'Excerpt of news 59', 'Content of news 59', 59, 'en'),
('tiêu đề của tin 59', 'mô tả ngắn của tin 59', 'Nội dung của tin 59', 59, 'vi'),
('Title of news 60', 'Excerpt of news 60', 'Content of news 60', 60, 'en'),
('tiêu đề của tin 60', 'mô tả ngắn của tin 60', 'Nội dung của tin 60', 60, 'vi'),
('Title of news 61', 'Excerpt of news 61', 'Content of news 61', 61, 'en'),
('tiêu đề của tin 61', 'mô tả ngắn của tin 61', 'Nội dung của tin 61', 61, 'vi'),
('Title of news 62', 'Excerpt of news 62', 'Content of news 62', 62, 'en'),
('tiêu đề của tin 62', 'mô tả ngắn của tin 62', 'Nội dung của tin 62', 62, 'vi'),
('Title of news 63', 'Excerpt of news 63', 'Content of news 63', 63, 'en'),
('tiêu đề của tin 63', 'mô tả ngắn của tin 63', 'Nội dung của tin 63', 63, 'vi'),
('Title of news 64', 'Excerpt of news 64', 'Content of news 64', 64, 'en'),
('tiêu đề của tin 64', 'mô tả ngắn của tin 64', 'Nội dung của tin 64', 64, 'vi'),
('Title of news 65', 'Excerpt of news 65', 'Content of news 65', 65, 'en'),
('tiêu đề của tin 65', 'mô tả ngắn của tin 65', 'Nội dung của tin 65', 65, 'vi'),
('Title of news 66', 'Excerpt of news 66', 'Content of news 66', 66, 'en'),
('tiêu đề của tin 66', 'mô tả ngắn của tin 66', 'Nội dung của tin 66', 66, 'vi'),
('Title of news 67', 'Excerpt of news 67', 'Content of news 67', 67, 'en'),
('tiêu đề của tin 67', 'mô tả ngắn của tin 67', 'Nội dung của tin 67', 67, 'vi'),
('Title of news 68', 'Excerpt of news 68', 'Content of news 68', 68, 'en'),
('tiêu đề của tin 68', 'mô tả ngắn của tin 68', 'Nội dung của tin 68', 68, 'vi'),
('Title of news 69', 'Excerpt of news 69', 'Content of news 69', 69, 'en'),
('tiêu đề của tin 69', 'mô tả ngắn của tin 69', 'Nội dung của tin 69', 69, 'vi'),
('Title of news 70', 'Excerpt of news 70', 'Content of news 70', 70, 'en'),
('tiêu đề của tin 70', 'mô tả ngắn của tin 70', 'Nội dung của tin 70', 70, 'vi'),
('Title of news 71', 'Excerpt of news 71', 'Content of news 71', 71, 'en'),
('tiêu đề của tin 71', 'mô tả ngắn của tin 71', 'Nội dung của tin 71', 71, 'vi'),
('Title of news 72', 'Excerpt of news 72', 'Content of news 72', 72, 'en'),
('tiêu đề của tin 72', 'mô tả ngắn của tin 72', 'Nội dung của tin 72', 72, 'vi'),
('Title of news 73', 'Excerpt of news 73', 'Content of news 73', 73, 'en'),
('tiêu đề của tin 73', 'mô tả ngắn của tin 73', 'Nội dung của tin 73', 73, 'vi'),
('Title of news 74', 'Excerpt of news 74', 'Content of news 74', 74, 'en'),
('tiêu đề của tin 74', 'mô tả ngắn của tin 74', 'Nội dung của tin 74', 74, 'vi'),
('Title of news 75', 'Excerpt of news 75', 'Content of news 75', 75, 'en'),
('tiêu đề của tin 75', 'mô tả ngắn của tin 75', 'Nội dung của tin 75', 75, 'vi'),
('Title of news 76', 'Excerpt of news 76', 'Content of news 76', 76, 'en'),
('tiêu đề của tin 76', 'mô tả ngắn của tin 76', 'Nội dung của tin 76', 76, 'vi'),
('Title of news 77', 'Excerpt of news 77', 'Content of news 77', 77, 'en'),
('tiêu đề của tin 77', 'mô tả ngắn của tin 77', 'Nội dung của tin 77', 77, 'vi'),
('Title of news 78', 'Excerpt of news 78', 'Content of news 78', 78, 'en'),
('tiêu đề của tin 78', 'mô tả ngắn của tin 78', 'Nội dung của tin 78', 78, 'vi'),
('Title of news 79', 'Excerpt of news 79', 'Content of news 79', 79, 'en'),
('tiêu đề của tin 79', 'mô tả ngắn của tin 79', 'Nội dung của tin 79', 79, 'vi'),
('Title of news 80', 'Excerpt of news 80', 'Content of news 80', 80, 'en'),
('tiêu đề của tin 80', 'mô tả ngắn của tin 80', 'Nội dung của tin 80', 80, 'vi'),
('Title of news 81', 'Excerpt of news 81', 'Content of news 81', 81, 'en'),
('tiêu đề của tin 81', 'mô tả ngắn của tin 81', 'Nội dung của tin 81', 81, 'vi'),
('Title of news 82', 'Excerpt of news 82', 'Content of news 82', 82, 'en'),
('tiêu đề của tin 82', 'mô tả ngắn của tin 82', 'Nội dung của tin 82', 82, 'vi'),
('Title of news 83', 'Excerpt of news 83', 'Content of news 83', 83, 'en'),
('tiêu đề của tin 83', 'mô tả ngắn của tin 83', 'Nội dung của tin 83', 83, 'vi'),
('Title of news 84', 'Excerpt of news 84', 'Content of news 84', 84, 'en'),
('tiêu đề của tin 84', 'mô tả ngắn của tin 84', 'Nội dung của tin 84', 84, 'vi'),
('Title of news 85', 'Excerpt of news 85', 'Content of news 85', 85, 'en'),
('tiêu đề của tin 85', 'mô tả ngắn của tin 85', 'Nội dung của tin 85', 85, 'vi'),
('Title of news 86', 'Excerpt of news 86', 'Content of news 86', 86, 'en'),
('tiêu đề của tin 86', 'mô tả ngắn của tin 86', 'Nội dung của tin 86', 86, 'vi'),
('Title of news 87', 'Excerpt of news 87', 'Content of news 87', 87, 'en'),
('tiêu đề của tin 87', 'mô tả ngắn của tin 87', 'Nội dung của tin 87', 87, 'vi'),
('Title of news 88', 'Excerpt of news 88', 'Content of news 88', 88, 'en'),
('tiêu đề của tin 88', 'mô tả ngắn của tin 88', 'Nội dung của tin 88', 88, 'vi'),
('Title of news 89', 'Excerpt of news 89', 'Content of news 89', 89, 'en'),
('tiêu đề của tin 89', 'mô tả ngắn của tin 89', 'Nội dung của tin 89', 89, 'vi'),
('Title of news 90', 'Excerpt of news 90', 'Content of news 90', 90, 'en'),
('tiêu đề của tin 90', 'mô tả ngắn của tin 90', 'Nội dung của tin 90', 90, 'vi'),
('Title of news 91', 'Excerpt of news 91', 'Content of news 91', 91, 'en'),
('tiêu đề của tin 91', 'mô tả ngắn của tin 91', 'Nội dung của tin 91', 91, 'vi'),
('Title of news 92', 'Excerpt of news 92', 'Content of news 92', 92, 'en'),
('tiêu đề của tin 92', 'mô tả ngắn của tin 92', 'Nội dung của tin 92', 92, 'vi'),
('Title of news 93', 'Excerpt of news 93', 'Content of news 93', 93, 'en'),
('tiêu đề của tin 93', 'mô tả ngắn của tin 93', 'Nội dung của tin 93', 93, 'vi'),
('Title of news 94', 'Excerpt of news 94', 'Content of news 94', 94, 'en'),
('tiêu đề của tin 94', 'mô tả ngắn của tin 94', 'Nội dung của tin 94', 94, 'vi'),
('Title of news 95', 'Excerpt of news 95', 'Content of news 95', 95, 'en'),
('tiêu đề của tin 95', 'mô tả ngắn của tin 95', 'Nội dung của tin 95', 95, 'vi'),
('Title of news 96', 'Excerpt of news 96', 'Content of news 96', 96, 'en'),
('tiêu đề của tin 96', 'mô tả ngắn của tin 96', 'Nội dung của tin 96', 96, 'vi'),
('Title of news 97', 'Excerpt of news 97', 'Content of news 97', 97, 'en'),
('tiêu đề của tin 97', 'mô tả ngắn của tin 97', 'Nội dung của tin 97', 97, 'vi'),
('Title of news 98', 'Excerpt of news 98', 'Content of news 98', 98, 'en'),
('tiêu đề của tin 98', 'mô tả ngắn của tin 98', 'Nội dung của tin 98', 98, 'vi'),
('Title of news 99', 'Excerpt of news 99', 'Content of news 99', 99, 'en'),
('tiêu đề của tin 99', 'mô tả ngắn của tin 99', 'Nội dung của tin 99', 99, 'vi'),
('Title of news 100', 'Excerpt of news 100', 'Content of news 100', 100, 'en'),
('tiêu đề của tin 100', 'mô tả ngắn của tin 100', 'Nội dung của tin 100', 100, 'vi');

-- --------------------------------------------------------


-- --------------------------------------------------------

--
-- Table structure for table `manufacturers`
--

CREATE TABLE `manufacturers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(200) NOT NULL COMMENT 'website of manufacturer',
  `website` varchar(200) DEFAULT NULL COMMENT 'website of manufacturer',
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL COMMENT 'address of manufacturer',
  `email` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer_languages`
--

CREATE TABLE `manufacturer_languages` (
  `name` varchar(300) DEFAULT 'undefined' COMMENT 'Name can be null',
  `description` text DEFAULT NULL COMMENT 'Description',
  `manufacturerId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(200) DEFAULT NULL COMMENT 'feature image of the post',
  `categories` varchar(200) DEFAULT 'default' COMMENT 'Categories has the format: category1, category2, category3',
  `tags` varchar(200) DEFAULT NULL COMMENT 'Tags has the format: tag1, tag2, tag3',
  `post_author` varchar(200) NOT NULL COMMENT 'It contains username that is used to login',
  `post_date` datetime DEFAULT NULL COMMENT 'Publish date of the news',
  `post_status` varchar(20) NOT NULL DEFAULT 'draft' COMMENT 'post status has 3 states: draft, publish, trash',
  `news_code` varchar(200) NOT NULL COMMENT 'news code is used to build URL',
  `modified_by` varchar(200) DEFAULT NULL COMMENT 'This one is not the author, he is the one modified the news',
  `menu_id` int(11) UNSIGNED DEFAULT NULL,
  `news_position` tinyint(1) DEFAULT 0 COMMENT 'it has the value 1 that means the news is prioritied',
  `comment_status` varchar(20) DEFAULT NULL,
  `comment_count` int(10) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `post_modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `image`, `categories`, `tags`, `post_author`, `post_date`, `post_status`, `news_code`, `modified_by`, `menu_id`, `news_position`, `comment_status`, `comment_count`, `createdAt`, `post_modified`) VALUES
(1, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code1', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(2, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code2', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(3, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code3', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(4, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code4', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(5, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code5', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(6, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code6', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(7, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code7', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(8, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code8', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(9, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code9', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(10, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code10', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(11, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code11', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(12, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code12', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(13, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code13', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(14, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code14', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(15, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code15', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(16, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code16', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(17, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code17', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(18, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code18', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(19, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code19', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(20, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code20', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(21, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code21', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(22, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code22', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(23, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code23', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(24, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code24', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(25, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code25', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(26, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code26', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(27, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code27', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(28, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code28', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(29, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code29', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(30, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code30', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(31, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code31', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(32, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code32', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(33, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code33', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(34, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code34', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(35, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code35', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(36, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code36', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(37, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code37', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(38, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code38', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(39, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code39', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(40, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code40', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(41, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code41', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(42, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code42', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(43, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code43', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(44, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code44', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(45, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code45', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(46, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code46', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(47, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code47', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(48, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code48', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(49, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code49', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(50, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code50', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(51, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code51', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(52, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code52', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(53, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code53', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(54, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code54', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(55, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code55', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(56, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code56', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(57, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code57', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(58, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code58', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(59, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code59', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(60, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code60', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(61, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code61', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(62, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code62', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(63, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code63', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(64, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code64', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(65, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code65', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(66, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code66', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(67, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code67', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(68, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code68', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34'),
(69, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code69', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(70, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code70', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(71, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code71', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(72, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code72', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(73, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code73', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(74, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code74', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(75, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code75', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(76, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code76', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(77, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code77', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(78, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code78', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(79, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code79', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(80, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code80', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(81, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code81', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(82, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code82', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(83, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code83', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(84, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code84', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(85, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code85', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(86, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code86', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(87, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code87', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(88, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code88', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(89, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code89', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(90, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code90', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(91, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code91', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(92, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code92', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(93, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code93', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(94, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code94', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(95, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code95', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(96, NULL, 'chung_khoan', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code96', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(97, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code97', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(98, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code98', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(99, NULL, 'xa_hoi', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code99', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35'),
(100, NULL, 'bat_dong_san', 'tag1, tag2', 'admin', NULL, 'draft', 'url_news_code100', NULL, NULL, 0, NULL, 0, '2023-12-06 09:27:35', '2023-12-06 09:27:35');

-- --------------------------------------------------------

--
-- Table structure for table `news_categories`
--

CREATE TABLE `news_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent` bigint(20) UNSIGNED DEFAULT NULL,
  `category_code` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_categories`
--

INSERT INTO `news_categories` (`id`, `parent`, `category_code`) VALUES
(1, NULL, 'kinh_te'),
(2, NULL, 'xa_hoi'),
(3, 1, 'bat_dong_san'),
(4, 1, 'chung_khoan');

-- --------------------------------------------------------

--
-- Table structure for table `news_cate_langs`
--

CREATE TABLE `news_cate_langs` (
  `name` varchar(200) DEFAULT 'undefined',
  `description` longtext DEFAULT NULL COMMENT 'Description',
  `newsCategoryId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_cate_langs`
--

INSERT INTO `news_cate_langs` (`name`, `description`, `newsCategoryId`, `languageCode`) VALUES
('Economy', 'Featured economic activities', 1, 'en'),
('Kinh tế', 'Hoạt động kinh tế nổi bật trong vòng 24h qua ', 1, 'vi'),
('Society', 'The social events in the dosmetic country', 2, 'en'),
('Xã hội', 'Các sự kiện xã hội trong nước', 2, 'vi'),
('Real Estate', 'New starting projects information ', 3, 'en'),
('Bất động sản', 'Thông tin các dự án mới đang được triển khai', 3, 'vi');

-- --------------------------------------------------------

--
-- Table structure for table `news_languages`
--

CREATE TABLE `news_languages` (
  `title` varchar(300) DEFAULT 'undefined' COMMENT 'Title can be null',
  `excerpt` text DEFAULT NULL COMMENT 'Short Description',
  `content` text DEFAULT NULL COMMENT 'Content of News',
  `newsId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news_languages`
--

INSERT INTO `news_languages` (`title`, `excerpt`, `content`, `newsId`, `languageCode`) VALUES
('Title of news 1', 'Excerpt of news 1', 'Content of news 1', 1, 'en'),
('tiêu đề của tin 1', 'mô tả ngắn của tin 1', 'Nội dung của tin 1', 1, 'vi'),
('Title of news 2', 'Excerpt of news 2', 'Content of news 2', 2, 'en'),
('tiêu đề của tin 2', 'mô tả ngắn của tin 2', 'Nội dung của tin 2', 2, 'vi'),
('Title of news 3', 'Excerpt of news 3', 'Content of news 3', 3, 'en'),
('tiêu đề của tin 3', 'mô tả ngắn của tin 3', 'Nội dung của tin 3', 3, 'vi'),
('Title of news 4', 'Excerpt of news 4', 'Content of news 4', 4, 'en'),
('tiêu đề của tin 4', 'mô tả ngắn của tin 4', 'Nội dung của tin 4', 4, 'vi'),
('Title of news 5', 'Excerpt of news 5', 'Content of news 5', 5, 'en'),
('tiêu đề của tin 5', 'mô tả ngắn của tin 5', 'Nội dung của tin 5', 5, 'vi'),
('Title of news 6', 'Excerpt of news 6', 'Content of news 6', 6, 'en'),
('tiêu đề của tin 6', 'mô tả ngắn của tin 6', 'Nội dung của tin 6', 6, 'vi'),
('Title of news 7', 'Excerpt of news 7', 'Content of news 7', 7, 'en'),
('tiêu đề của tin 7', 'mô tả ngắn của tin 7', 'Nội dung của tin 7', 7, 'vi'),
('Title of news 8', 'Excerpt of news 8', 'Content of news 8', 8, 'en'),
('tiêu đề của tin 8', 'mô tả ngắn của tin 8', 'Nội dung của tin 8', 8, 'vi'),
('Title of news 9', 'Excerpt of news 9', 'Content of news 9', 9, 'en'),
('tiêu đề của tin 9', 'mô tả ngắn của tin 9', 'Nội dung của tin 9', 9, 'vi'),
('Title of news 10', 'Excerpt of news 10', 'Content of news 10', 10, 'en'),
('tiêu đề của tin 10', 'mô tả ngắn của tin 10', 'Nội dung của tin 10', 10, 'vi'),
('Title of news 11', 'Excerpt of news 11', 'Content of news 11', 11, 'en'),
('tiêu đề của tin 11', 'mô tả ngắn của tin 11', 'Nội dung của tin 11', 11, 'vi'),
('Title of news 12', 'Excerpt of news 12', 'Content of news 12', 12, 'en'),
('tiêu đề của tin 12', 'mô tả ngắn của tin 12', 'Nội dung của tin 12', 12, 'vi'),
('Title of news 13', 'Excerpt of news 13', 'Content of news 13', 13, 'en'),
('tiêu đề của tin 13', 'mô tả ngắn của tin 13', 'Nội dung của tin 13', 13, 'vi'),
('Title of news 14', 'Excerpt of news 14', 'Content of news 14', 14, 'en'),
('tiêu đề của tin 14', 'mô tả ngắn của tin 14', 'Nội dung của tin 14', 14, 'vi'),
('Title of news 15', 'Excerpt of news 15', 'Content of news 15', 15, 'en'),
('tiêu đề của tin 15', 'mô tả ngắn của tin 15', 'Nội dung của tin 15', 15, 'vi'),
('Title of news 16', 'Excerpt of news 16', 'Content of news 16', 16, 'en'),
('tiêu đề của tin 16', 'mô tả ngắn của tin 16', 'Nội dung của tin 16', 16, 'vi'),
('Title of news 17', 'Excerpt of news 17', 'Content of news 17', 17, 'en'),
('tiêu đề của tin 17', 'mô tả ngắn của tin 17', 'Nội dung của tin 17', 17, 'vi'),
('Title of news 18', 'Excerpt of news 18', 'Content of news 18', 18, 'en'),
('tiêu đề của tin 18', 'mô tả ngắn của tin 18', 'Nội dung của tin 18', 18, 'vi'),
('Title of news 19', 'Excerpt of news 19', 'Content of news 19', 19, 'en'),
('tiêu đề của tin 19', 'mô tả ngắn của tin 19', 'Nội dung của tin 19', 19, 'vi'),
('Title of news 20', 'Excerpt of news 20', 'Content of news 20', 20, 'en'),
('tiêu đề của tin 20', 'mô tả ngắn của tin 20', 'Nội dung của tin 20', 20, 'vi'),
('Title of news 21', 'Excerpt of news 21', 'Content of news 21', 21, 'en'),
('tiêu đề của tin 21', 'mô tả ngắn của tin 21', 'Nội dung của tin 21', 21, 'vi'),
('Title of news 22', 'Excerpt of news 22', 'Content of news 22', 22, 'en'),
('tiêu đề của tin 22', 'mô tả ngắn của tin 22', 'Nội dung của tin 22', 22, 'vi'),
('Title of news 23', 'Excerpt of news 23', 'Content of news 23', 23, 'en'),
('tiêu đề của tin 23', 'mô tả ngắn của tin 23', 'Nội dung của tin 23', 23, 'vi'),
('Title of news 24', 'Excerpt of news 24', 'Content of news 24', 24, 'en'),
('tiêu đề của tin 24', 'mô tả ngắn của tin 24', 'Nội dung của tin 24', 24, 'vi'),
('Title of news 25', 'Excerpt of news 25', 'Content of news 25', 25, 'en'),
('tiêu đề của tin 25', 'mô tả ngắn của tin 25', 'Nội dung của tin 25', 25, 'vi'),
('Title of news 26', 'Excerpt of news 26', 'Content of news 26', 26, 'en'),
('tiêu đề của tin 26', 'mô tả ngắn của tin 26', 'Nội dung của tin 26', 26, 'vi'),
('Title of news 27', 'Excerpt of news 27', 'Content of news 27', 27, 'en'),
('tiêu đề của tin 27', 'mô tả ngắn của tin 27', 'Nội dung của tin 27', 27, 'vi'),
('Title of news 28', 'Excerpt of news 28', 'Content of news 28', 28, 'en'),
('tiêu đề của tin 28', 'mô tả ngắn của tin 28', 'Nội dung của tin 28', 28, 'vi'),
('Title of news 29', 'Excerpt of news 29', 'Content of news 29', 29, 'en'),
('tiêu đề của tin 29', 'mô tả ngắn của tin 29', 'Nội dung của tin 29', 29, 'vi'),
('Title of news 30', 'Excerpt of news 30', 'Content of news 30', 30, 'en'),
('tiêu đề của tin 30', 'mô tả ngắn của tin 30', 'Nội dung của tin 30', 30, 'vi'),
('Title of news 31', 'Excerpt of news 31', 'Content of news 31', 31, 'en'),
('tiêu đề của tin 31', 'mô tả ngắn của tin 31', 'Nội dung của tin 31', 31, 'vi'),
('Title of news 32', 'Excerpt of news 32', 'Content of news 32', 32, 'en'),
('tiêu đề của tin 32', 'mô tả ngắn của tin 32', 'Nội dung của tin 32', 32, 'vi'),
('Title of news 33', 'Excerpt of news 33', 'Content of news 33', 33, 'en'),
('tiêu đề của tin 33', 'mô tả ngắn của tin 33', 'Nội dung của tin 33', 33, 'vi'),
('Title of news 34', 'Excerpt of news 34', 'Content of news 34', 34, 'en'),
('tiêu đề của tin 34', 'mô tả ngắn của tin 34', 'Nội dung của tin 34', 34, 'vi'),
('Title of news 35', 'Excerpt of news 35', 'Content of news 35', 35, 'en'),
('tiêu đề của tin 35', 'mô tả ngắn của tin 35', 'Nội dung của tin 35', 35, 'vi'),
('Title of news 36', 'Excerpt of news 36', 'Content of news 36', 36, 'en'),
('tiêu đề của tin 36', 'mô tả ngắn của tin 36', 'Nội dung của tin 36', 36, 'vi'),
('Title of news 37', 'Excerpt of news 37', 'Content of news 37', 37, 'en'),
('tiêu đề của tin 37', 'mô tả ngắn của tin 37', 'Nội dung của tin 37', 37, 'vi'),
('Title of news 38', 'Excerpt of news 38', 'Content of news 38', 38, 'en'),
('tiêu đề của tin 38', 'mô tả ngắn của tin 38', 'Nội dung của tin 38', 38, 'vi'),
('Title of news 39', 'Excerpt of news 39', 'Content of news 39', 39, 'en'),
('tiêu đề của tin 39', 'mô tả ngắn của tin 39', 'Nội dung của tin 39', 39, 'vi'),
('Title of news 40', 'Excerpt of news 40', 'Content of news 40', 40, 'en'),
('tiêu đề của tin 40', 'mô tả ngắn của tin 40', 'Nội dung của tin 40', 40, 'vi'),
('Title of news 41', 'Excerpt of news 41', 'Content of news 41', 41, 'en'),
('tiêu đề của tin 41', 'mô tả ngắn của tin 41', 'Nội dung của tin 41', 41, 'vi'),
('Title of news 42', 'Excerpt of news 42', 'Content of news 42', 42, 'en'),
('tiêu đề của tin 42', 'mô tả ngắn của tin 42', 'Nội dung của tin 42', 42, 'vi'),
('Title of news 43', 'Excerpt of news 43', 'Content of news 43', 43, 'en'),
('tiêu đề của tin 43', 'mô tả ngắn của tin 43', 'Nội dung của tin 43', 43, 'vi'),
('Title of news 44', 'Excerpt of news 44', 'Content of news 44', 44, 'en'),
('tiêu đề của tin 44', 'mô tả ngắn của tin 44', 'Nội dung của tin 44', 44, 'vi'),
('Title of news 45', 'Excerpt of news 45', 'Content of news 45', 45, 'en'),
('tiêu đề của tin 45', 'mô tả ngắn của tin 45', 'Nội dung của tin 45', 45, 'vi'),
('Title of news 46', 'Excerpt of news 46', 'Content of news 46', 46, 'en'),
('tiêu đề của tin 46', 'mô tả ngắn của tin 46', 'Nội dung của tin 46', 46, 'vi'),
('Title of news 47', 'Excerpt of news 47', 'Content of news 47', 47, 'en'),
('tiêu đề của tin 47', 'mô tả ngắn của tin 47', 'Nội dung của tin 47', 47, 'vi'),
('Title of news 48', 'Excerpt of news 48', 'Content of news 48', 48, 'en'),
('tiêu đề của tin 48', 'mô tả ngắn của tin 48', 'Nội dung của tin 48', 48, 'vi'),
('Title of news 49', 'Excerpt of news 49', 'Content of news 49', 49, 'en'),
('tiêu đề của tin 49', 'mô tả ngắn của tin 49', 'Nội dung của tin 49', 49, 'vi'),
('Title of news 50', 'Excerpt of news 50', 'Content of news 50', 50, 'en'),
('tiêu đề của tin 50', 'mô tả ngắn của tin 50', 'Nội dung của tin 50', 50, 'vi'),
('Title of news 51', 'Excerpt of news 51', 'Content of news 51', 51, 'en'),
('tiêu đề của tin 51', 'mô tả ngắn của tin 51', 'Nội dung của tin 51', 51, 'vi'),
('Title of news 52', 'Excerpt of news 52', 'Content of news 52', 52, 'en'),
('tiêu đề của tin 52', 'mô tả ngắn của tin 52', 'Nội dung của tin 52', 52, 'vi'),
('Title of news 53', 'Excerpt of news 53', 'Content of news 53', 53, 'en'),
('tiêu đề của tin 53', 'mô tả ngắn của tin 53', 'Nội dung của tin 53', 53, 'vi'),
('Title of news 54', 'Excerpt of news 54', 'Content of news 54', 54, 'en'),
('tiêu đề của tin 54', 'mô tả ngắn của tin 54', 'Nội dung của tin 54', 54, 'vi'),
('Title of news 55', 'Excerpt of news 55', 'Content of news 55', 55, 'en'),
('tiêu đề của tin 55', 'mô tả ngắn của tin 55', 'Nội dung của tin 55', 55, 'vi'),
('Title of news 56', 'Excerpt of news 56', 'Content of news 56', 56, 'en'),
('tiêu đề của tin 56', 'mô tả ngắn của tin 56', 'Nội dung của tin 56', 56, 'vi'),
('Title of news 57', 'Excerpt of news 57', 'Content of news 57', 57, 'en'),
('tiêu đề của tin 57', 'mô tả ngắn của tin 57', 'Nội dung của tin 57', 57, 'vi'),
('Title of news 58', 'Excerpt of news 58', 'Content of news 58', 58, 'en'),
('tiêu đề của tin 58', 'mô tả ngắn của tin 58', 'Nội dung của tin 58', 58, 'vi'),
('Title of news 59', 'Excerpt of news 59', 'Content of news 59', 59, 'en'),
('tiêu đề của tin 59', 'mô tả ngắn của tin 59', 'Nội dung của tin 59', 59, 'vi'),
('Title of news 60', 'Excerpt of news 60', 'Content of news 60', 60, 'en'),
('tiêu đề của tin 60', 'mô tả ngắn của tin 60', 'Nội dung của tin 60', 60, 'vi'),
('Title of news 61', 'Excerpt of news 61', 'Content of news 61', 61, 'en'),
('tiêu đề của tin 61', 'mô tả ngắn của tin 61', 'Nội dung của tin 61', 61, 'vi'),
('Title of news 62', 'Excerpt of news 62', 'Content of news 62', 62, 'en'),
('tiêu đề của tin 62', 'mô tả ngắn của tin 62', 'Nội dung của tin 62', 62, 'vi'),
('Title of news 63', 'Excerpt of news 63', 'Content of news 63', 63, 'en'),
('tiêu đề của tin 63', 'mô tả ngắn của tin 63', 'Nội dung của tin 63', 63, 'vi'),
('Title of news 64', 'Excerpt of news 64', 'Content of news 64', 64, 'en'),
('tiêu đề của tin 64', 'mô tả ngắn của tin 64', 'Nội dung của tin 64', 64, 'vi'),
('Title of news 65', 'Excerpt of news 65', 'Content of news 65', 65, 'en'),
('tiêu đề của tin 65', 'mô tả ngắn của tin 65', 'Nội dung của tin 65', 65, 'vi'),
('Title of news 66', 'Excerpt of news 66', 'Content of news 66', 66, 'en'),
('tiêu đề của tin 66', 'mô tả ngắn của tin 66', 'Nội dung của tin 66', 66, 'vi'),
('Title of news 67', 'Excerpt of news 67', 'Content of news 67', 67, 'en'),
('tiêu đề của tin 67', 'mô tả ngắn của tin 67', 'Nội dung của tin 67', 67, 'vi'),
('Title of news 68', 'Excerpt of news 68', 'Content of news 68', 68, 'en'),
('tiêu đề của tin 68', 'mô tả ngắn của tin 68', 'Nội dung của tin 68', 68, 'vi'),
('Title of news 69', 'Excerpt of news 69', 'Content of news 69', 69, 'en'),
('tiêu đề của tin 69', 'mô tả ngắn của tin 69', 'Nội dung của tin 69', 69, 'vi'),
('Title of news 70', 'Excerpt of news 70', 'Content of news 70', 70, 'en'),
('tiêu đề của tin 70', 'mô tả ngắn của tin 70', 'Nội dung của tin 70', 70, 'vi'),
('Title of news 71', 'Excerpt of news 71', 'Content of news 71', 71, 'en'),
('tiêu đề của tin 71', 'mô tả ngắn của tin 71', 'Nội dung của tin 71', 71, 'vi'),
('Title of news 72', 'Excerpt of news 72', 'Content of news 72', 72, 'en'),
('tiêu đề của tin 72', 'mô tả ngắn của tin 72', 'Nội dung của tin 72', 72, 'vi'),
('Title of news 73', 'Excerpt of news 73', 'Content of news 73', 73, 'en'),
('tiêu đề của tin 73', 'mô tả ngắn của tin 73', 'Nội dung của tin 73', 73, 'vi'),
('Title of news 74', 'Excerpt of news 74', 'Content of news 74', 74, 'en'),
('tiêu đề của tin 74', 'mô tả ngắn của tin 74', 'Nội dung của tin 74', 74, 'vi'),
('Title of news 75', 'Excerpt of news 75', 'Content of news 75', 75, 'en'),
('tiêu đề của tin 75', 'mô tả ngắn của tin 75', 'Nội dung của tin 75', 75, 'vi'),
('Title of news 76', 'Excerpt of news 76', 'Content of news 76', 76, 'en'),
('tiêu đề của tin 76', 'mô tả ngắn của tin 76', 'Nội dung của tin 76', 76, 'vi'),
('Title of news 77', 'Excerpt of news 77', 'Content of news 77', 77, 'en'),
('tiêu đề của tin 77', 'mô tả ngắn của tin 77', 'Nội dung của tin 77', 77, 'vi'),
('Title of news 78', 'Excerpt of news 78', 'Content of news 78', 78, 'en'),
('tiêu đề của tin 78', 'mô tả ngắn của tin 78', 'Nội dung của tin 78', 78, 'vi'),
('Title of news 79', 'Excerpt of news 79', 'Content of news 79', 79, 'en'),
('tiêu đề của tin 79', 'mô tả ngắn của tin 79', 'Nội dung của tin 79', 79, 'vi'),
('Title of news 80', 'Excerpt of news 80', 'Content of news 80', 80, 'en'),
('tiêu đề của tin 80', 'mô tả ngắn của tin 80', 'Nội dung của tin 80', 80, 'vi'),
('Title of news 81', 'Excerpt of news 81', 'Content of news 81', 81, 'en'),
('tiêu đề của tin 81', 'mô tả ngắn của tin 81', 'Nội dung của tin 81', 81, 'vi'),
('Title of news 82', 'Excerpt of news 82', 'Content of news 82', 82, 'en'),
('tiêu đề của tin 82', 'mô tả ngắn của tin 82', 'Nội dung của tin 82', 82, 'vi'),
('Title of news 83', 'Excerpt of news 83', 'Content of news 83', 83, 'en'),
('tiêu đề của tin 83', 'mô tả ngắn của tin 83', 'Nội dung của tin 83', 83, 'vi'),
('Title of news 84', 'Excerpt of news 84', 'Content of news 84', 84, 'en'),
('tiêu đề của tin 84', 'mô tả ngắn của tin 84', 'Nội dung của tin 84', 84, 'vi'),
('Title of news 85', 'Excerpt of news 85', 'Content of news 85', 85, 'en'),
('tiêu đề của tin 85', 'mô tả ngắn của tin 85', 'Nội dung của tin 85', 85, 'vi'),
('Title of news 86', 'Excerpt of news 86', 'Content of news 86', 86, 'en'),
('tiêu đề của tin 86', 'mô tả ngắn của tin 86', 'Nội dung của tin 86', 86, 'vi'),
('Title of news 87', 'Excerpt of news 87', 'Content of news 87', 87, 'en'),
('tiêu đề của tin 87', 'mô tả ngắn của tin 87', 'Nội dung của tin 87', 87, 'vi'),
('Title of news 88', 'Excerpt of news 88', 'Content of news 88', 88, 'en'),
('tiêu đề của tin 88', 'mô tả ngắn của tin 88', 'Nội dung của tin 88', 88, 'vi'),
('Title of news 89', 'Excerpt of news 89', 'Content of news 89', 89, 'en'),
('tiêu đề của tin 89', 'mô tả ngắn của tin 89', 'Nội dung của tin 89', 89, 'vi'),
('Title of news 90', 'Excerpt of news 90', 'Content of news 90', 90, 'en'),
('tiêu đề của tin 90', 'mô tả ngắn của tin 90', 'Nội dung của tin 90', 90, 'vi'),
('Title of news 91', 'Excerpt of news 91', 'Content of news 91', 91, 'en'),
('tiêu đề của tin 91', 'mô tả ngắn của tin 91', 'Nội dung của tin 91', 91, 'vi'),
('Title of news 92', 'Excerpt of news 92', 'Content of news 92', 92, 'en'),
('tiêu đề của tin 92', 'mô tả ngắn của tin 92', 'Nội dung của tin 92', 92, 'vi'),
('Title of news 93', 'Excerpt of news 93', 'Content of news 93', 93, 'en'),
('tiêu đề của tin 93', 'mô tả ngắn của tin 93', 'Nội dung của tin 93', 93, 'vi'),
('Title of news 94', 'Excerpt of news 94', 'Content of news 94', 94, 'en'),
('tiêu đề của tin 94', 'mô tả ngắn của tin 94', 'Nội dung của tin 94', 94, 'vi'),
('Title of news 95', 'Excerpt of news 95', 'Content of news 95', 95, 'en'),
('tiêu đề của tin 95', 'mô tả ngắn của tin 95', 'Nội dung của tin 95', 95, 'vi'),
('Title of news 96', 'Excerpt of news 96', 'Content of news 96', 96, 'en'),
('tiêu đề của tin 96', 'mô tả ngắn của tin 96', 'Nội dung của tin 96', 96, 'vi'),
('Title of news 97', 'Excerpt of news 97', 'Content of news 97', 97, 'en'),
('tiêu đề của tin 97', 'mô tả ngắn của tin 97', 'Nội dung của tin 97', 97, 'vi'),
('Title of news 98', 'Excerpt of news 98', 'Content of news 98', 98, 'en'),
('tiêu đề của tin 98', 'mô tả ngắn của tin 98', 'Nội dung của tin 98', 98, 'vi'),
('Title of news 99', 'Excerpt of news 99', 'Content of news 99', 99, 'en'),
('tiêu đề của tin 99', 'mô tả ngắn của tin 99', 'Nội dung của tin 99', 99, 'vi'),
('Title of news 100', 'Excerpt of news 100', 'Content of news 100', 100, 'en'),
('tiêu đề của tin 100', 'mô tả ngắn của tin 100', 'Nội dung của tin 100', 100, 'vi');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_code` varchar(200) NOT NULL COMMENT 'product code is used to build URL',
  `main_image` varchar(200) DEFAULT NULL COMMENT 'feature image of the products',
  `sub_image1` varchar(200) DEFAULT NULL COMMENT 'feature image of the products',
  `sub_image2` varchar(200) DEFAULT NULL COMMENT 'feature image of the products',
  `sub_image3` varchar(200) DEFAULT NULL COMMENT 'feature image of the products',
  `sub_image4` varchar(200) DEFAULT NULL COMMENT 'feature image of the products',
  `categories` varchar(200) DEFAULT 'default' COMMENT 'Categories has the format: category1, category2, category3',
  `manufacturerId` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Id of the manufaturer',
  `price` double DEFAULT NULL COMMENT 'Original price',
  `discount_price` double DEFAULT NULL COMMENT 'Original price',
  `product_author` varchar(200) NOT NULL COMMENT 'It contains username that is used to login',
  `modified_by` varchar(200) DEFAULT NULL COMMENT 'This one is not the author, he is the one modified the products',
  `product_position` tinyint(1) DEFAULT 0 COMMENT 'it has the value 1 that means the news is prioritied',
  `comment_status` varchar(20) DEFAULT NULL,
  `comment_count` int(10) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products_languages`
--

CREATE TABLE `products_languages` (
  `name` varchar(300) DEFAULT 'undefined' COMMENT 'Title can be null',
  `guarantee` text DEFAULT NULL COMMENT 'Guarantee Description',
  `transport` text DEFAULT NULL COMMENT 'Transport Description',
  `description` text DEFAULT NULL COMMENT 'Description',
  `productId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent` bigint(20) UNSIGNED DEFAULT NULL,
  `category_code` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_cate_langs`
--

CREATE TABLE `product_cate_langs` (
  `name` varchar(200) DEFAULT 'undefined',
  `description` longtext DEFAULT NULL COMMENT 'Description',
  `productCategoryId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_guarantee`
--

CREATE TABLE `product_guarantee` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `guarantee` text NOT NULL COMMENT 'Guarantee description',
  `languageCode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_transport`
--

CREATE TABLE `product_transport` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transport` text NOT NULL COMMENT 'Transport description',
  `languageCode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tag_code` varchar(200) NOT NULL COMMENT 'code of tag'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tag_code`) VALUES
(1, 'tag-1'),
(2, 'tag-2'),
(3, 'tag-3'),
(4, 'tag-4'),
(5, 'tag-5');

-- --------------------------------------------------------

--
-- Table structure for table `tag_langs`
--

CREATE TABLE `tag_langs` (
  `name` varchar(200) DEFAULT 'undefined',
  `description` longtext DEFAULT NULL COMMENT 'Description',
  `tagId` bigint(20) UNSIGNED NOT NULL,
  `languageCode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tag_langs`
--

INSERT INTO `tag_langs` (`name`, `description`, `tagId`, `languageCode`) VALUES
('Name tag 1', 'description about tag 1', 1, 'en'),
('Tên tag 1', 'mô tả của tag 1', 1, 'vi'),
('Name tag 2', 'description about tag 2', 2, 'en'),
('Tên tag 2', 'mô tả của tag 2', 2, 'vi'),
('Name tag 3', 'description about tag 3', 3, 'en'),
('Tên tag 3', 'mô tả của tag 3', 3, 'vi'),
('Name tag 4', 'description about tag 4', 4, 'en'),
('Tên tag 4', 'mô tả của tag 4', 4, 'vi'),
('Name tag 5', 'description about tag 5', 5, 'en'),
('Tên tag 5', 'mô tả của tag 5', 5, 'vi');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL COMMENT 'profile image of user',
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `nick_name` varchar(200) NOT NULL,
  `display_name` varchar(200) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `num_posts` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT 'number of news post this user have',
  `email` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `facebook_profile` varchar(100) DEFAULT NULL,
  `instagram_profile` varchar(100) DEFAULT NULL,
  `linkedin_profile` varchar(100) DEFAULT NULL,
  `biographical` text DEFAULT NULL,
  `comment_status` varchar(20) DEFAULT NULL,
  `comment_count` int(10) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `image`, `first_name`, `last_name`, `nick_name`, `display_name`, `role`, `num_posts`, `email`, `website`, `phone`, `facebook_profile`, `instagram_profile`, `linkedin_profile`, `biographical`, `comment_status`, `comment_count`, `createdAt`, `updatedAt`) VALUES
('admin', '$2b$10$rPaOOP0Qz/5tEfm5BqFfwOzrDAVBfpjiB2radK82ybwnylPUqXKZa', NULL, NULL, NULL, 'admin', NULL, 'Administrator', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2023-12-06 09:27:34', '2023-12-06 09:27:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `article_code` (`article_code`),
  ADD KEY `image` (`image`);

--
-- Indexes for table `article_categories`
--
ALTER TABLE `article_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_code` (`category_code`);

--
-- Indexes for table `article_cate_langs`
--
ALTER TABLE `article_cate_langs`
  ADD PRIMARY KEY (`articleCategoryId`,`languageCode`),
  ADD UNIQUE KEY `article_cate_langs_languageCode_articleCategoryId_unique` (`articleCategoryId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `article_languages`
--
ALTER TABLE `article_languages`
  ADD PRIMARY KEY (`articleId`,`languageCode`),
  ADD UNIQUE KEY `article_languages_languageCode_articleId_unique` (`articleId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `icons`
--
ALTER TABLE `icons`
  ADD PRIMARY KEY (`keyIcon`);

--
-- Indexes for table `imgs`
--
ALTER TABLE `imgs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `manufacturers`
--
ALTER TABLE `manufacturers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `manufacturer_languages`
--
ALTER TABLE `manufacturer_languages`
  ADD PRIMARY KEY (`manufacturerId`,`languageCode`),
  ADD UNIQUE KEY `manufacturer_languages_languageCode_manufacturerId_unique` (`manufacturerId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `news_code` (`news_code`),
  ADD KEY `image` (`image`);

--
-- Indexes for table `news_categories`
--
ALTER TABLE `news_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_code` (`category_code`);

--
-- Indexes for table `news_cate_langs`
--
ALTER TABLE `news_cate_langs`
  ADD PRIMARY KEY (`newsCategoryId`,`languageCode`),
  ADD UNIQUE KEY `news_cate_langs_languageCode_newsCategoryId_unique` (`newsCategoryId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `news_languages`
--
ALTER TABLE `news_languages`
  ADD PRIMARY KEY (`newsId`,`languageCode`),
  ADD UNIQUE KEY `news_languages_languageCode_newsId_unique` (`newsId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`product_code`),
  ADD KEY `main_image` (`main_image`),
  ADD KEY `sub_image1` (`sub_image1`),
  ADD KEY `sub_image2` (`sub_image2`),
  ADD KEY `sub_image3` (`sub_image3`),
  ADD KEY `sub_image4` (`sub_image4`),
  ADD KEY `manufacturerId` (`manufacturerId`);

--
-- Indexes for table `products_languages`
--
ALTER TABLE `products_languages`
  ADD PRIMARY KEY (`productId`,`languageCode`),
  ADD UNIQUE KEY `products_languages_languageCode_productId_unique` (`productId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_code` (`category_code`);

--
-- Indexes for table `product_cate_langs`
--
ALTER TABLE `product_cate_langs`
  ADD PRIMARY KEY (`productCategoryId`,`languageCode`),
  ADD UNIQUE KEY `product_cate_langs_languageCode_productCategoryId_unique` (`productCategoryId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `product_guarantee`
--
ALTER TABLE `product_guarantee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `product_transport`
--
ALTER TABLE `product_transport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tag_langs`
--
ALTER TABLE `tag_langs`
  ADD PRIMARY KEY (`tagId`,`languageCode`),
  ADD UNIQUE KEY `tag_langs_languageCode_tagId_unique` (`tagId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD KEY `image` (`image`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `article_categories`
--
ALTER TABLE `article_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `imgs`
--
ALTER TABLE `imgs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manufacturers`
--
ALTER TABLE `manufacturers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_guarantee`
--
ALTER TABLE `product_guarantee`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_transport`
--
ALTER TABLE `product_transport`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`image`) REFERENCES `imgs` (`url`);

--
-- Constraints for table `article_cate_langs`
--
ALTER TABLE `article_cate_langs`
  ADD CONSTRAINT `article_cate_langs_ibfk_1` FOREIGN KEY (`articleCategoryId`) REFERENCES `article_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_cate_langs_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `article_languages`
--
ALTER TABLE `article_languages`
  ADD CONSTRAINT `article_languages_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_languages_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `manufacturer_languages`
--
ALTER TABLE `manufacturer_languages`
  ADD CONSTRAINT `manufacturer_languages_ibfk_1` FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `manufacturer_languages_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`image`) REFERENCES `imgs` (`url`);

--
-- Constraints for table `news_cate_langs`
--
ALTER TABLE `news_cate_langs`
  ADD CONSTRAINT `news_cate_langs_ibfk_1` FOREIGN KEY (`newsCategoryId`) REFERENCES `news_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `news_cate_langs_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news_languages`
--
ALTER TABLE `news_languages`
  ADD CONSTRAINT `news_languages_ibfk_1` FOREIGN KEY (`newsId`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `news_languages_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`main_image`) REFERENCES `imgs` (`url`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`sub_image1`) REFERENCES `imgs` (`url`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`sub_image2`) REFERENCES `imgs` (`url`),
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`sub_image3`) REFERENCES `imgs` (`url`),
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`sub_image4`) REFERENCES `imgs` (`url`),
  ADD CONSTRAINT `products_ibfk_6` FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products_languages`
--
ALTER TABLE `products_languages`
  ADD CONSTRAINT `products_languages_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_languages_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_cate_langs`
--
ALTER TABLE `product_cate_langs`
  ADD CONSTRAINT `product_cate_langs_ibfk_1` FOREIGN KEY (`productCategoryId`) REFERENCES `product_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_cate_langs_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_guarantee`
--
ALTER TABLE `product_guarantee`
  ADD CONSTRAINT `product_guarantee_ibfk_1` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_transport`
--
ALTER TABLE `product_transport`
  ADD CONSTRAINT `product_transport_ibfk_1` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tag_langs`
--
ALTER TABLE `tag_langs`
  ADD CONSTRAINT `tag_langs_ibfk_1` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tag_langs_ibfk_2` FOREIGN KEY (`languageCode`) REFERENCES `languages` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`image`) REFERENCES `imgs` (`url`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
