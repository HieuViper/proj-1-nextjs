-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 25, 2023 at 09:54 AM
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
  `article_position` tinyint(1) DEFAULT 0 COMMENT 'it has the value 1 that means the article is prioritied',
  `comment_status` varchar(20) DEFAULT NULL,
  `comment_count` int(10) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `post_modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `image`, `categories`, `post_author`, `post_date`, `post_status`, `article_code`, `modified_by`, `menu_id`, `article_position`, `comment_status`, `comment_count`, `createdAt`, `post_modified`) VALUES
(1, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(2, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(3, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(4, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(5, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(6, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(7, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(8, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(9, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(10, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(11, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(12, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(13, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(14, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(15, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(16, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(17, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(18, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(19, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(20, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(21, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(22, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(23, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(24, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(25, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(26, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(27, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(28, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(29, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(30, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(31, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(32, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(33, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(34, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(35, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(36, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(37, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(38, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(39, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(40, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(41, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(42, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(43, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(44, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(45, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(46, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(47, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(48, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(49, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(50, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(51, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(52, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(53, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(54, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(55, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(56, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(57, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(58, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(59, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(60, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(61, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(62, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(63, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(64, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(65, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(66, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(67, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(68, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(69, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(70, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(71, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(72, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(73, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(74, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(75, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(76, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(77, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(78, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(79, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(80, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(81, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(82, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(83, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(84, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(85, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(86, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(87, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(88, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(89, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(90, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(91, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(92, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(93, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(94, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(95, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(96, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(97, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(98, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(99, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(100, NULL, 'cat1, cat2', 'huy', NULL, 'draft', 'Article_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42');

-- --------------------------------------------------------

--
-- Stand-in structure for view `articles_all`
-- (See below for the actual view)
--
CREATE TABLE `articles_all` (
`id` bigint(20) unsigned
,`image` varchar(200)
,`categories` varchar(200)
,`post_author` varchar(200)
,`post_date` datetime
,`post_status` varchar(20)
,`article_code` varchar(200)
,`modified_by` varchar(200)
,`menu_id` int(11) unsigned
,`article_position` tinyint(1)
,`comment_status` varchar(20)
,`comment_count` int(10)
,`createdAt` datetime
,`post_modified` datetime
,`title` varchar(300)
,`excerpt` text
,`content` text
,`articleId` bigint(20) unsigned
,`languageCode` varchar(10)
);

-- --------------------------------------------------------

--
-- Table structure for table `article_categories`
--

CREATE TABLE `article_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_code` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Stand-in structure for view `article_cat_all`
-- (See below for the actual view)
--
CREATE TABLE `article_cat_all` (
`id` bigint(20) unsigned
,`category_code` varchar(200)
,`name` varchar(200)
,`description` longtext
,`articleCategoryId` bigint(20) unsigned
,`languageCode` varchar(10)
);

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

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `code` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL COMMENT 'Short Description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`code`, `name`, `description`) VALUES
('en', 'english', 'english'),
('vi', 'tiếng việt', 'tiếng việt');

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
(1, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(2, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(3, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(4, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(5, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(6, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(7, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(8, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(9, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(10, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(11, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(12, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(13, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(14, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(15, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(16, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(17, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(18, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(19, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(20, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(21, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(22, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(23, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(24, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(25, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(26, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(27, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(28, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(29, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(30, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(31, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(32, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(33, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(34, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(35, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(36, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(37, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(38, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(39, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(40, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(41, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(42, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(43, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(44, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(45, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(46, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(47, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(48, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(49, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(50, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(51, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(52, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(53, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(54, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(55, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(56, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(57, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(58, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(59, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(60, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(61, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(62, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(63, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(64, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(65, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(66, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(67, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(68, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(69, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(70, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(71, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(72, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(73, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(74, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(75, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(76, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(77, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(78, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(79, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(80, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(81, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(82, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(83, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(84, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(85, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(86, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(87, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(88, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(89, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(90, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(91, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(92, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(93, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(94, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(95, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(96, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(97, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(98, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(99, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(100, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:21:35', '2023-10-25 07:21:35'),
(101, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(102, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(103, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(104, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(105, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(106, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(107, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(108, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(109, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(110, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(111, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(112, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(113, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(114, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(115, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(116, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(117, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(118, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(119, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(120, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(121, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(122, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(123, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(124, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(125, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(126, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(127, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(128, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(129, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(130, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(131, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(132, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(133, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(134, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(135, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(136, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(137, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(138, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(139, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(140, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(141, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(142, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(143, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(144, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(145, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(146, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(147, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(148, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(149, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(150, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(151, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(152, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(153, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(154, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(155, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(156, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(157, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(158, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(159, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(160, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(161, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(162, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(163, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:42', '2023-10-25 07:40:42'),
(164, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(165, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(166, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(167, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(168, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(169, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(170, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(171, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(172, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(173, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(174, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(175, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(176, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(177, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(178, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(179, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(180, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(181, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(182, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(183, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(184, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(185, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(186, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(187, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(188, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(189, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(190, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(191, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(192, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(193, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(194, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(195, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(196, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(197, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(198, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(199, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(200, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:40:43', '2023-10-25 07:40:43'),
(201, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(202, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(203, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(204, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(205, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(206, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(207, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(208, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(209, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(210, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(211, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(212, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(213, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(214, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(215, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(216, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(217, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(218, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(219, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(220, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(221, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(222, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(223, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(224, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(225, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(226, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(227, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(228, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(229, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(230, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(231, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(232, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(233, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(234, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(235, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(236, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(237, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(238, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(239, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(240, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(241, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(242, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(243, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(244, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(245, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(246, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(247, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(248, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(249, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(250, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(251, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(252, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(253, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(254, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(255, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(256, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(257, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(258, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(259, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(260, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(261, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(262, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(263, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(264, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(265, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(266, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(267, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(268, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(269, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(270, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(271, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(272, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(273, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(274, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(275, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(276, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(277, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(278, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(279, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(280, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(281, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(282, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(283, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(284, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(285, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(286, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:41', '2023-10-25 07:41:41'),
(287, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(288, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(289, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(290, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(291, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(292, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(293, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(294, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(295, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(296, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(297, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(298, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(299, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42'),
(300, NULL, 'cat1, cat2', 'tag1, tag2', 'huy', NULL, 'draft', 'title_news_project', NULL, NULL, 0, NULL, 0, '2023-10-25 07:41:42', '2023-10-25 07:41:42');

-- --------------------------------------------------------

--
-- Stand-in structure for view `news_all`
-- (See below for the actual view)
--
CREATE TABLE `news_all` (
`id` bigint(20) unsigned
,`image` varchar(200)
,`categories` varchar(200)
,`tags` varchar(200)
,`post_author` varchar(200)
,`post_date` datetime
,`post_status` varchar(20)
,`news_code` varchar(200)
,`modified_by` varchar(200)
,`menu_id` int(11) unsigned
,`news_position` tinyint(1)
,`comment_status` varchar(20)
,`comment_count` int(10)
,`createdAt` datetime
,`post_modified` datetime
,`title` varchar(300)
,`excerpt` text
,`content` text
,`newsId` bigint(20) unsigned
,`languageCode` varchar(10)
);

-- --------------------------------------------------------

--
-- Table structure for table `news_categories`
--

CREATE TABLE `news_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent` bigint(20) UNSIGNED DEFAULT NULL,
  `category_code` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Stand-in structure for view `news_cat_all`
-- (See below for the actual view)
--
CREATE TABLE `news_cat_all` (
`id` bigint(20) unsigned
,`parent` bigint(20) unsigned
,`category_code` varchar(200)
,`name` varchar(200)
,`description` longtext
,`newsCategoryId` bigint(20) unsigned
,`languageCode` varchar(10)
);

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
('tiêu đề của tin 100', 'mô tả ngắn của tin 100', 'Nội dung của tin 100', 100, 'vi'),
('Title of news 101', 'Excerpt of news 101', 'Content of news 101', 101, 'en'),
('tiêu đề của tin 101', 'mô tả ngắn của tin 101', 'Nội dung của tin 101', 101, 'vi'),
('Title of news 102', 'Excerpt of news 102', 'Content of news 102', 102, 'en'),
('tiêu đề của tin 102', 'mô tả ngắn của tin 102', 'Nội dung của tin 102', 102, 'vi'),
('Title of news 103', 'Excerpt of news 103', 'Content of news 103', 103, 'en'),
('tiêu đề của tin 103', 'mô tả ngắn của tin 103', 'Nội dung của tin 103', 103, 'vi'),
('Title of news 104', 'Excerpt of news 104', 'Content of news 104', 104, 'en'),
('tiêu đề của tin 104', 'mô tả ngắn của tin 104', 'Nội dung của tin 104', 104, 'vi'),
('Title of news 105', 'Excerpt of news 105', 'Content of news 105', 105, 'en'),
('tiêu đề của tin 105', 'mô tả ngắn của tin 105', 'Nội dung của tin 105', 105, 'vi'),
('Title of news 106', 'Excerpt of news 106', 'Content of news 106', 106, 'en'),
('tiêu đề của tin 106', 'mô tả ngắn của tin 106', 'Nội dung của tin 106', 106, 'vi'),
('Title of news 107', 'Excerpt of news 107', 'Content of news 107', 107, 'en'),
('tiêu đề của tin 107', 'mô tả ngắn của tin 107', 'Nội dung của tin 107', 107, 'vi'),
('Title of news 108', 'Excerpt of news 108', 'Content of news 108', 108, 'en'),
('tiêu đề của tin 108', 'mô tả ngắn của tin 108', 'Nội dung của tin 108', 108, 'vi'),
('Title of news 109', 'Excerpt of news 109', 'Content of news 109', 109, 'en'),
('tiêu đề của tin 109', 'mô tả ngắn của tin 109', 'Nội dung của tin 109', 109, 'vi'),
('Title of news 110', 'Excerpt of news 110', 'Content of news 110', 110, 'en'),
('tiêu đề của tin 110', 'mô tả ngắn của tin 110', 'Nội dung của tin 110', 110, 'vi'),
('Title of news 111', 'Excerpt of news 111', 'Content of news 111', 111, 'en'),
('tiêu đề của tin 111', 'mô tả ngắn của tin 111', 'Nội dung của tin 111', 111, 'vi'),
('Title of news 112', 'Excerpt of news 112', 'Content of news 112', 112, 'en'),
('tiêu đề của tin 112', 'mô tả ngắn của tin 112', 'Nội dung của tin 112', 112, 'vi'),
('Title of news 113', 'Excerpt of news 113', 'Content of news 113', 113, 'en'),
('tiêu đề của tin 113', 'mô tả ngắn của tin 113', 'Nội dung của tin 113', 113, 'vi'),
('Title of news 114', 'Excerpt of news 114', 'Content of news 114', 114, 'en'),
('tiêu đề của tin 114', 'mô tả ngắn của tin 114', 'Nội dung của tin 114', 114, 'vi'),
('Title of news 115', 'Excerpt of news 115', 'Content of news 115', 115, 'en'),
('tiêu đề của tin 115', 'mô tả ngắn của tin 115', 'Nội dung của tin 115', 115, 'vi'),
('Title of news 116', 'Excerpt of news 116', 'Content of news 116', 116, 'en'),
('tiêu đề của tin 116', 'mô tả ngắn của tin 116', 'Nội dung của tin 116', 116, 'vi'),
('Title of news 117', 'Excerpt of news 117', 'Content of news 117', 117, 'en'),
('tiêu đề của tin 117', 'mô tả ngắn của tin 117', 'Nội dung của tin 117', 117, 'vi'),
('Title of news 118', 'Excerpt of news 118', 'Content of news 118', 118, 'en'),
('tiêu đề của tin 118', 'mô tả ngắn của tin 118', 'Nội dung của tin 118', 118, 'vi'),
('Title of news 119', 'Excerpt of news 119', 'Content of news 119', 119, 'en'),
('tiêu đề của tin 119', 'mô tả ngắn của tin 119', 'Nội dung của tin 119', 119, 'vi'),
('Title of news 120', 'Excerpt of news 120', 'Content of news 120', 120, 'en'),
('tiêu đề của tin 120', 'mô tả ngắn của tin 120', 'Nội dung của tin 120', 120, 'vi'),
('Title of news 121', 'Excerpt of news 121', 'Content of news 121', 121, 'en'),
('tiêu đề của tin 121', 'mô tả ngắn của tin 121', 'Nội dung của tin 121', 121, 'vi'),
('Title of news 122', 'Excerpt of news 122', 'Content of news 122', 122, 'en'),
('tiêu đề của tin 122', 'mô tả ngắn của tin 122', 'Nội dung của tin 122', 122, 'vi'),
('Title of news 123', 'Excerpt of news 123', 'Content of news 123', 123, 'en'),
('tiêu đề của tin 123', 'mô tả ngắn của tin 123', 'Nội dung của tin 123', 123, 'vi'),
('Title of news 124', 'Excerpt of news 124', 'Content of news 124', 124, 'en'),
('tiêu đề của tin 124', 'mô tả ngắn của tin 124', 'Nội dung của tin 124', 124, 'vi'),
('Title of news 125', 'Excerpt of news 125', 'Content of news 125', 125, 'en'),
('tiêu đề của tin 125', 'mô tả ngắn của tin 125', 'Nội dung của tin 125', 125, 'vi'),
('Title of news 126', 'Excerpt of news 126', 'Content of news 126', 126, 'en'),
('tiêu đề của tin 126', 'mô tả ngắn của tin 126', 'Nội dung của tin 126', 126, 'vi'),
('Title of news 127', 'Excerpt of news 127', 'Content of news 127', 127, 'en'),
('tiêu đề của tin 127', 'mô tả ngắn của tin 127', 'Nội dung của tin 127', 127, 'vi'),
('Title of news 128', 'Excerpt of news 128', 'Content of news 128', 128, 'en'),
('tiêu đề của tin 128', 'mô tả ngắn của tin 128', 'Nội dung của tin 128', 128, 'vi'),
('Title of news 129', 'Excerpt of news 129', 'Content of news 129', 129, 'en'),
('tiêu đề của tin 129', 'mô tả ngắn của tin 129', 'Nội dung của tin 129', 129, 'vi'),
('Title of news 130', 'Excerpt of news 130', 'Content of news 130', 130, 'en'),
('tiêu đề của tin 130', 'mô tả ngắn của tin 130', 'Nội dung của tin 130', 130, 'vi'),
('Title of news 131', 'Excerpt of news 131', 'Content of news 131', 131, 'en'),
('tiêu đề của tin 131', 'mô tả ngắn của tin 131', 'Nội dung của tin 131', 131, 'vi'),
('Title of news 132', 'Excerpt of news 132', 'Content of news 132', 132, 'en'),
('tiêu đề của tin 132', 'mô tả ngắn của tin 132', 'Nội dung của tin 132', 132, 'vi'),
('Title of news 133', 'Excerpt of news 133', 'Content of news 133', 133, 'en'),
('tiêu đề của tin 133', 'mô tả ngắn của tin 133', 'Nội dung của tin 133', 133, 'vi'),
('Title of news 134', 'Excerpt of news 134', 'Content of news 134', 134, 'en'),
('tiêu đề của tin 134', 'mô tả ngắn của tin 134', 'Nội dung của tin 134', 134, 'vi'),
('Title of news 135', 'Excerpt of news 135', 'Content of news 135', 135, 'en'),
('tiêu đề của tin 135', 'mô tả ngắn của tin 135', 'Nội dung của tin 135', 135, 'vi'),
('Title of news 136', 'Excerpt of news 136', 'Content of news 136', 136, 'en'),
('tiêu đề của tin 136', 'mô tả ngắn của tin 136', 'Nội dung của tin 136', 136, 'vi'),
('Title of news 137', 'Excerpt of news 137', 'Content of news 137', 137, 'en'),
('tiêu đề của tin 137', 'mô tả ngắn của tin 137', 'Nội dung của tin 137', 137, 'vi'),
('Title of news 138', 'Excerpt of news 138', 'Content of news 138', 138, 'en'),
('tiêu đề của tin 138', 'mô tả ngắn của tin 138', 'Nội dung của tin 138', 138, 'vi'),
('Title of news 139', 'Excerpt of news 139', 'Content of news 139', 139, 'en'),
('tiêu đề của tin 139', 'mô tả ngắn của tin 139', 'Nội dung của tin 139', 139, 'vi'),
('Title of news 140', 'Excerpt of news 140', 'Content of news 140', 140, 'en'),
('tiêu đề của tin 140', 'mô tả ngắn của tin 140', 'Nội dung của tin 140', 140, 'vi'),
('Title of news 141', 'Excerpt of news 141', 'Content of news 141', 141, 'en'),
('tiêu đề của tin 141', 'mô tả ngắn của tin 141', 'Nội dung của tin 141', 141, 'vi'),
('Title of news 142', 'Excerpt of news 142', 'Content of news 142', 142, 'en'),
('tiêu đề của tin 142', 'mô tả ngắn của tin 142', 'Nội dung của tin 142', 142, 'vi'),
('Title of news 143', 'Excerpt of news 143', 'Content of news 143', 143, 'en'),
('tiêu đề của tin 143', 'mô tả ngắn của tin 143', 'Nội dung của tin 143', 143, 'vi'),
('Title of news 144', 'Excerpt of news 144', 'Content of news 144', 144, 'en'),
('tiêu đề của tin 144', 'mô tả ngắn của tin 144', 'Nội dung của tin 144', 144, 'vi'),
('Title of news 145', 'Excerpt of news 145', 'Content of news 145', 145, 'en'),
('tiêu đề của tin 145', 'mô tả ngắn của tin 145', 'Nội dung của tin 145', 145, 'vi'),
('Title of news 146', 'Excerpt of news 146', 'Content of news 146', 146, 'en'),
('tiêu đề của tin 146', 'mô tả ngắn của tin 146', 'Nội dung của tin 146', 146, 'vi'),
('Title of news 147', 'Excerpt of news 147', 'Content of news 147', 147, 'en'),
('tiêu đề của tin 147', 'mô tả ngắn của tin 147', 'Nội dung của tin 147', 147, 'vi'),
('Title of news 148', 'Excerpt of news 148', 'Content of news 148', 148, 'en'),
('tiêu đề của tin 148', 'mô tả ngắn của tin 148', 'Nội dung của tin 148', 148, 'vi'),
('Title of news 149', 'Excerpt of news 149', 'Content of news 149', 149, 'en'),
('tiêu đề của tin 149', 'mô tả ngắn của tin 149', 'Nội dung của tin 149', 149, 'vi'),
('Title of news 150', 'Excerpt of news 150', 'Content of news 150', 150, 'en'),
('tiêu đề của tin 150', 'mô tả ngắn của tin 150', 'Nội dung của tin 150', 150, 'vi'),
('Title of news 151', 'Excerpt of news 151', 'Content of news 151', 151, 'en'),
('tiêu đề của tin 151', 'mô tả ngắn của tin 151', 'Nội dung của tin 151', 151, 'vi'),
('Title of news 152', 'Excerpt of news 152', 'Content of news 152', 152, 'en'),
('tiêu đề của tin 152', 'mô tả ngắn của tin 152', 'Nội dung của tin 152', 152, 'vi'),
('Title of news 153', 'Excerpt of news 153', 'Content of news 153', 153, 'en'),
('tiêu đề của tin 153', 'mô tả ngắn của tin 153', 'Nội dung của tin 153', 153, 'vi'),
('Title of news 154', 'Excerpt of news 154', 'Content of news 154', 154, 'en'),
('tiêu đề của tin 154', 'mô tả ngắn của tin 154', 'Nội dung của tin 154', 154, 'vi'),
('Title of news 155', 'Excerpt of news 155', 'Content of news 155', 155, 'en'),
('tiêu đề của tin 155', 'mô tả ngắn của tin 155', 'Nội dung của tin 155', 155, 'vi'),
('Title of news 156', 'Excerpt of news 156', 'Content of news 156', 156, 'en'),
('tiêu đề của tin 156', 'mô tả ngắn của tin 156', 'Nội dung của tin 156', 156, 'vi'),
('Title of news 157', 'Excerpt of news 157', 'Content of news 157', 157, 'en'),
('tiêu đề của tin 157', 'mô tả ngắn của tin 157', 'Nội dung của tin 157', 157, 'vi'),
('Title of news 158', 'Excerpt of news 158', 'Content of news 158', 158, 'en'),
('tiêu đề của tin 158', 'mô tả ngắn của tin 158', 'Nội dung của tin 158', 158, 'vi'),
('Title of news 159', 'Excerpt of news 159', 'Content of news 159', 159, 'en'),
('tiêu đề của tin 159', 'mô tả ngắn của tin 159', 'Nội dung của tin 159', 159, 'vi'),
('Title of news 160', 'Excerpt of news 160', 'Content of news 160', 160, 'en'),
('tiêu đề của tin 160', 'mô tả ngắn của tin 160', 'Nội dung của tin 160', 160, 'vi'),
('Title of news 161', 'Excerpt of news 161', 'Content of news 161', 161, 'en'),
('tiêu đề của tin 161', 'mô tả ngắn của tin 161', 'Nội dung của tin 161', 161, 'vi'),
('Title of news 162', 'Excerpt of news 162', 'Content of news 162', 162, 'en'),
('tiêu đề của tin 162', 'mô tả ngắn của tin 162', 'Nội dung của tin 162', 162, 'vi'),
('Title of news 163', 'Excerpt of news 163', 'Content of news 163', 163, 'en'),
('tiêu đề của tin 163', 'mô tả ngắn của tin 163', 'Nội dung của tin 163', 163, 'vi'),
('Title of news 164', 'Excerpt of news 164', 'Content of news 164', 164, 'en'),
('tiêu đề của tin 164', 'mô tả ngắn của tin 164', 'Nội dung của tin 164', 164, 'vi'),
('Title of news 165', 'Excerpt of news 165', 'Content of news 165', 165, 'en'),
('tiêu đề của tin 165', 'mô tả ngắn của tin 165', 'Nội dung của tin 165', 165, 'vi'),
('Title of news 166', 'Excerpt of news 166', 'Content of news 166', 166, 'en'),
('tiêu đề của tin 166', 'mô tả ngắn của tin 166', 'Nội dung của tin 166', 166, 'vi'),
('Title of news 167', 'Excerpt of news 167', 'Content of news 167', 167, 'en'),
('tiêu đề của tin 167', 'mô tả ngắn của tin 167', 'Nội dung của tin 167', 167, 'vi'),
('Title of news 168', 'Excerpt of news 168', 'Content of news 168', 168, 'en'),
('tiêu đề của tin 168', 'mô tả ngắn của tin 168', 'Nội dung của tin 168', 168, 'vi'),
('Title of news 169', 'Excerpt of news 169', 'Content of news 169', 169, 'en'),
('tiêu đề của tin 169', 'mô tả ngắn của tin 169', 'Nội dung của tin 169', 169, 'vi'),
('Title of news 170', 'Excerpt of news 170', 'Content of news 170', 170, 'en'),
('tiêu đề của tin 170', 'mô tả ngắn của tin 170', 'Nội dung của tin 170', 170, 'vi'),
('Title of news 171', 'Excerpt of news 171', 'Content of news 171', 171, 'en'),
('tiêu đề của tin 171', 'mô tả ngắn của tin 171', 'Nội dung của tin 171', 171, 'vi'),
('Title of news 172', 'Excerpt of news 172', 'Content of news 172', 172, 'en'),
('tiêu đề của tin 172', 'mô tả ngắn của tin 172', 'Nội dung của tin 172', 172, 'vi'),
('Title of news 173', 'Excerpt of news 173', 'Content of news 173', 173, 'en'),
('tiêu đề của tin 173', 'mô tả ngắn của tin 173', 'Nội dung của tin 173', 173, 'vi'),
('Title of news 174', 'Excerpt of news 174', 'Content of news 174', 174, 'en'),
('tiêu đề của tin 174', 'mô tả ngắn của tin 174', 'Nội dung của tin 174', 174, 'vi'),
('Title of news 175', 'Excerpt of news 175', 'Content of news 175', 175, 'en'),
('tiêu đề của tin 175', 'mô tả ngắn của tin 175', 'Nội dung của tin 175', 175, 'vi'),
('Title of news 176', 'Excerpt of news 176', 'Content of news 176', 176, 'en'),
('tiêu đề của tin 176', 'mô tả ngắn của tin 176', 'Nội dung của tin 176', 176, 'vi'),
('Title of news 177', 'Excerpt of news 177', 'Content of news 177', 177, 'en'),
('tiêu đề của tin 177', 'mô tả ngắn của tin 177', 'Nội dung của tin 177', 177, 'vi'),
('Title of news 178', 'Excerpt of news 178', 'Content of news 178', 178, 'en'),
('tiêu đề của tin 178', 'mô tả ngắn của tin 178', 'Nội dung của tin 178', 178, 'vi'),
('Title of news 179', 'Excerpt of news 179', 'Content of news 179', 179, 'en'),
('tiêu đề của tin 179', 'mô tả ngắn của tin 179', 'Nội dung của tin 179', 179, 'vi'),
('Title of news 180', 'Excerpt of news 180', 'Content of news 180', 180, 'en'),
('tiêu đề của tin 180', 'mô tả ngắn của tin 180', 'Nội dung của tin 180', 180, 'vi'),
('Title of news 181', 'Excerpt of news 181', 'Content of news 181', 181, 'en'),
('tiêu đề của tin 181', 'mô tả ngắn của tin 181', 'Nội dung của tin 181', 181, 'vi'),
('Title of news 182', 'Excerpt of news 182', 'Content of news 182', 182, 'en'),
('tiêu đề của tin 182', 'mô tả ngắn của tin 182', 'Nội dung của tin 182', 182, 'vi'),
('Title of news 183', 'Excerpt of news 183', 'Content of news 183', 183, 'en'),
('tiêu đề của tin 183', 'mô tả ngắn của tin 183', 'Nội dung của tin 183', 183, 'vi'),
('Title of news 184', 'Excerpt of news 184', 'Content of news 184', 184, 'en'),
('tiêu đề của tin 184', 'mô tả ngắn của tin 184', 'Nội dung của tin 184', 184, 'vi'),
('Title of news 185', 'Excerpt of news 185', 'Content of news 185', 185, 'en'),
('tiêu đề của tin 185', 'mô tả ngắn của tin 185', 'Nội dung của tin 185', 185, 'vi'),
('Title of news 186', 'Excerpt of news 186', 'Content of news 186', 186, 'en'),
('tiêu đề của tin 186', 'mô tả ngắn của tin 186', 'Nội dung của tin 186', 186, 'vi'),
('Title of news 187', 'Excerpt of news 187', 'Content of news 187', 187, 'en'),
('tiêu đề của tin 187', 'mô tả ngắn của tin 187', 'Nội dung của tin 187', 187, 'vi'),
('Title of news 188', 'Excerpt of news 188', 'Content of news 188', 188, 'en'),
('tiêu đề của tin 188', 'mô tả ngắn của tin 188', 'Nội dung của tin 188', 188, 'vi'),
('Title of news 189', 'Excerpt of news 189', 'Content of news 189', 189, 'en'),
('tiêu đề của tin 189', 'mô tả ngắn của tin 189', 'Nội dung của tin 189', 189, 'vi'),
('Title of news 190', 'Excerpt of news 190', 'Content of news 190', 190, 'en'),
('tiêu đề của tin 190', 'mô tả ngắn của tin 190', 'Nội dung của tin 190', 190, 'vi'),
('Title of news 191', 'Excerpt of news 191', 'Content of news 191', 191, 'en'),
('tiêu đề của tin 191', 'mô tả ngắn của tin 191', 'Nội dung của tin 191', 191, 'vi'),
('Title of news 192', 'Excerpt of news 192', 'Content of news 192', 192, 'en'),
('tiêu đề của tin 192', 'mô tả ngắn của tin 192', 'Nội dung của tin 192', 192, 'vi'),
('Title of news 193', 'Excerpt of news 193', 'Content of news 193', 193, 'en'),
('tiêu đề của tin 193', 'mô tả ngắn của tin 193', 'Nội dung của tin 193', 193, 'vi'),
('Title of news 194', 'Excerpt of news 194', 'Content of news 194', 194, 'en'),
('tiêu đề của tin 194', 'mô tả ngắn của tin 194', 'Nội dung của tin 194', 194, 'vi'),
('Title of news 195', 'Excerpt of news 195', 'Content of news 195', 195, 'en'),
('tiêu đề của tin 195', 'mô tả ngắn của tin 195', 'Nội dung của tin 195', 195, 'vi'),
('Title of news 196', 'Excerpt of news 196', 'Content of news 196', 196, 'en'),
('tiêu đề của tin 196', 'mô tả ngắn của tin 196', 'Nội dung của tin 196', 196, 'vi'),
('Title of news 197', 'Excerpt of news 197', 'Content of news 197', 197, 'en'),
('tiêu đề của tin 197', 'mô tả ngắn của tin 197', 'Nội dung của tin 197', 197, 'vi'),
('Title of news 198', 'Excerpt of news 198', 'Content of news 198', 198, 'en'),
('tiêu đề của tin 198', 'mô tả ngắn của tin 198', 'Nội dung của tin 198', 198, 'vi'),
('Title of news 199', 'Excerpt of news 199', 'Content of news 199', 199, 'en'),
('tiêu đề của tin 199', 'mô tả ngắn của tin 199', 'Nội dung của tin 199', 199, 'vi'),
('Title of news 200', 'Excerpt of news 200', 'Content of news 200', 200, 'en'),
('tiêu đề của tin 200', 'mô tả ngắn của tin 200', 'Nội dung của tin 200', 200, 'vi'),
('Title of news 201', 'Excerpt of news 201', 'Content of news 201', 201, 'en'),
('tiêu đề của tin 201', 'mô tả ngắn của tin 201', 'Nội dung của tin 201', 201, 'vi'),
('Title of news 202', 'Excerpt of news 202', 'Content of news 202', 202, 'en'),
('tiêu đề của tin 202', 'mô tả ngắn của tin 202', 'Nội dung của tin 202', 202, 'vi'),
('Title of news 203', 'Excerpt of news 203', 'Content of news 203', 203, 'en'),
('tiêu đề của tin 203', 'mô tả ngắn của tin 203', 'Nội dung của tin 203', 203, 'vi'),
('Title of news 204', 'Excerpt of news 204', 'Content of news 204', 204, 'en'),
('tiêu đề của tin 204', 'mô tả ngắn của tin 204', 'Nội dung của tin 204', 204, 'vi'),
('Title of news 205', 'Excerpt of news 205', 'Content of news 205', 205, 'en'),
('tiêu đề của tin 205', 'mô tả ngắn của tin 205', 'Nội dung của tin 205', 205, 'vi'),
('Title of news 206', 'Excerpt of news 206', 'Content of news 206', 206, 'en'),
('tiêu đề của tin 206', 'mô tả ngắn của tin 206', 'Nội dung của tin 206', 206, 'vi'),
('Title of news 207', 'Excerpt of news 207', 'Content of news 207', 207, 'en'),
('tiêu đề của tin 207', 'mô tả ngắn của tin 207', 'Nội dung của tin 207', 207, 'vi'),
('Title of news 208', 'Excerpt of news 208', 'Content of news 208', 208, 'en'),
('tiêu đề của tin 208', 'mô tả ngắn của tin 208', 'Nội dung của tin 208', 208, 'vi'),
('Title of news 209', 'Excerpt of news 209', 'Content of news 209', 209, 'en'),
('tiêu đề của tin 209', 'mô tả ngắn của tin 209', 'Nội dung của tin 209', 209, 'vi'),
('Title of news 210', 'Excerpt of news 210', 'Content of news 210', 210, 'en'),
('tiêu đề của tin 210', 'mô tả ngắn của tin 210', 'Nội dung của tin 210', 210, 'vi'),
('Title of news 211', 'Excerpt of news 211', 'Content of news 211', 211, 'en'),
('tiêu đề của tin 211', 'mô tả ngắn của tin 211', 'Nội dung của tin 211', 211, 'vi'),
('Title of news 212', 'Excerpt of news 212', 'Content of news 212', 212, 'en'),
('tiêu đề của tin 212', 'mô tả ngắn của tin 212', 'Nội dung của tin 212', 212, 'vi'),
('Title of news 213', 'Excerpt of news 213', 'Content of news 213', 213, 'en'),
('tiêu đề của tin 213', 'mô tả ngắn của tin 213', 'Nội dung của tin 213', 213, 'vi'),
('Title of news 214', 'Excerpt of news 214', 'Content of news 214', 214, 'en'),
('tiêu đề của tin 214', 'mô tả ngắn của tin 214', 'Nội dung của tin 214', 214, 'vi'),
('Title of news 215', 'Excerpt of news 215', 'Content of news 215', 215, 'en'),
('tiêu đề của tin 215', 'mô tả ngắn của tin 215', 'Nội dung của tin 215', 215, 'vi'),
('Title of news 216', 'Excerpt of news 216', 'Content of news 216', 216, 'en'),
('tiêu đề của tin 216', 'mô tả ngắn của tin 216', 'Nội dung của tin 216', 216, 'vi'),
('Title of news 217', 'Excerpt of news 217', 'Content of news 217', 217, 'en'),
('tiêu đề của tin 217', 'mô tả ngắn của tin 217', 'Nội dung của tin 217', 217, 'vi'),
('Title of news 218', 'Excerpt of news 218', 'Content of news 218', 218, 'en'),
('tiêu đề của tin 218', 'mô tả ngắn của tin 218', 'Nội dung của tin 218', 218, 'vi'),
('Title of news 219', 'Excerpt of news 219', 'Content of news 219', 219, 'en'),
('tiêu đề của tin 219', 'mô tả ngắn của tin 219', 'Nội dung của tin 219', 219, 'vi'),
('Title of news 220', 'Excerpt of news 220', 'Content of news 220', 220, 'en'),
('tiêu đề của tin 220', 'mô tả ngắn của tin 220', 'Nội dung của tin 220', 220, 'vi'),
('Title of news 221', 'Excerpt of news 221', 'Content of news 221', 221, 'en'),
('tiêu đề của tin 221', 'mô tả ngắn của tin 221', 'Nội dung của tin 221', 221, 'vi'),
('Title of news 222', 'Excerpt of news 222', 'Content of news 222', 222, 'en'),
('tiêu đề của tin 222', 'mô tả ngắn của tin 222', 'Nội dung của tin 222', 222, 'vi'),
('Title of news 223', 'Excerpt of news 223', 'Content of news 223', 223, 'en'),
('tiêu đề của tin 223', 'mô tả ngắn của tin 223', 'Nội dung của tin 223', 223, 'vi'),
('Title of news 224', 'Excerpt of news 224', 'Content of news 224', 224, 'en'),
('tiêu đề của tin 224', 'mô tả ngắn của tin 224', 'Nội dung của tin 224', 224, 'vi'),
('Title of news 225', 'Excerpt of news 225', 'Content of news 225', 225, 'en'),
('tiêu đề của tin 225', 'mô tả ngắn của tin 225', 'Nội dung của tin 225', 225, 'vi'),
('Title of news 226', 'Excerpt of news 226', 'Content of news 226', 226, 'en'),
('tiêu đề của tin 226', 'mô tả ngắn của tin 226', 'Nội dung của tin 226', 226, 'vi'),
('Title of news 227', 'Excerpt of news 227', 'Content of news 227', 227, 'en'),
('tiêu đề của tin 227', 'mô tả ngắn của tin 227', 'Nội dung của tin 227', 227, 'vi'),
('Title of news 228', 'Excerpt of news 228', 'Content of news 228', 228, 'en'),
('tiêu đề của tin 228', 'mô tả ngắn của tin 228', 'Nội dung của tin 228', 228, 'vi'),
('Title of news 229', 'Excerpt of news 229', 'Content of news 229', 229, 'en'),
('tiêu đề của tin 229', 'mô tả ngắn của tin 229', 'Nội dung của tin 229', 229, 'vi'),
('Title of news 230', 'Excerpt of news 230', 'Content of news 230', 230, 'en'),
('tiêu đề của tin 230', 'mô tả ngắn của tin 230', 'Nội dung của tin 230', 230, 'vi'),
('Title of news 231', 'Excerpt of news 231', 'Content of news 231', 231, 'en'),
('tiêu đề của tin 231', 'mô tả ngắn của tin 231', 'Nội dung của tin 231', 231, 'vi'),
('Title of news 232', 'Excerpt of news 232', 'Content of news 232', 232, 'en'),
('tiêu đề của tin 232', 'mô tả ngắn của tin 232', 'Nội dung của tin 232', 232, 'vi'),
('Title of news 233', 'Excerpt of news 233', 'Content of news 233', 233, 'en'),
('tiêu đề của tin 233', 'mô tả ngắn của tin 233', 'Nội dung của tin 233', 233, 'vi'),
('Title of news 234', 'Excerpt of news 234', 'Content of news 234', 234, 'en'),
('tiêu đề của tin 234', 'mô tả ngắn của tin 234', 'Nội dung của tin 234', 234, 'vi'),
('Title of news 235', 'Excerpt of news 235', 'Content of news 235', 235, 'en'),
('tiêu đề của tin 235', 'mô tả ngắn của tin 235', 'Nội dung của tin 235', 235, 'vi'),
('Title of news 236', 'Excerpt of news 236', 'Content of news 236', 236, 'en'),
('tiêu đề của tin 236', 'mô tả ngắn của tin 236', 'Nội dung của tin 236', 236, 'vi'),
('Title of news 237', 'Excerpt of news 237', 'Content of news 237', 237, 'en'),
('tiêu đề của tin 237', 'mô tả ngắn của tin 237', 'Nội dung của tin 237', 237, 'vi'),
('Title of news 238', 'Excerpt of news 238', 'Content of news 238', 238, 'en'),
('tiêu đề của tin 238', 'mô tả ngắn của tin 238', 'Nội dung của tin 238', 238, 'vi'),
('Title of news 239', 'Excerpt of news 239', 'Content of news 239', 239, 'en'),
('tiêu đề của tin 239', 'mô tả ngắn của tin 239', 'Nội dung của tin 239', 239, 'vi'),
('Title of news 240', 'Excerpt of news 240', 'Content of news 240', 240, 'en'),
('tiêu đề của tin 240', 'mô tả ngắn của tin 240', 'Nội dung của tin 240', 240, 'vi'),
('Title of news 241', 'Excerpt of news 241', 'Content of news 241', 241, 'en'),
('tiêu đề của tin 241', 'mô tả ngắn của tin 241', 'Nội dung của tin 241', 241, 'vi'),
('Title of news 242', 'Excerpt of news 242', 'Content of news 242', 242, 'en'),
('tiêu đề của tin 242', 'mô tả ngắn của tin 242', 'Nội dung của tin 242', 242, 'vi'),
('Title of news 243', 'Excerpt of news 243', 'Content of news 243', 243, 'en'),
('tiêu đề của tin 243', 'mô tả ngắn của tin 243', 'Nội dung của tin 243', 243, 'vi'),
('Title of news 244', 'Excerpt of news 244', 'Content of news 244', 244, 'en'),
('tiêu đề của tin 244', 'mô tả ngắn của tin 244', 'Nội dung của tin 244', 244, 'vi'),
('Title of news 245', 'Excerpt of news 245', 'Content of news 245', 245, 'en'),
('tiêu đề của tin 245', 'mô tả ngắn của tin 245', 'Nội dung của tin 245', 245, 'vi'),
('Title of news 246', 'Excerpt of news 246', 'Content of news 246', 246, 'en'),
('tiêu đề của tin 246', 'mô tả ngắn của tin 246', 'Nội dung của tin 246', 246, 'vi'),
('Title of news 247', 'Excerpt of news 247', 'Content of news 247', 247, 'en'),
('tiêu đề của tin 247', 'mô tả ngắn của tin 247', 'Nội dung của tin 247', 247, 'vi'),
('Title of news 248', 'Excerpt of news 248', 'Content of news 248', 248, 'en'),
('tiêu đề của tin 248', 'mô tả ngắn của tin 248', 'Nội dung của tin 248', 248, 'vi'),
('Title of news 249', 'Excerpt of news 249', 'Content of news 249', 249, 'en'),
('tiêu đề của tin 249', 'mô tả ngắn của tin 249', 'Nội dung của tin 249', 249, 'vi'),
('Title of news 250', 'Excerpt of news 250', 'Content of news 250', 250, 'en'),
('tiêu đề của tin 250', 'mô tả ngắn của tin 250', 'Nội dung của tin 250', 250, 'vi'),
('Title of news 251', 'Excerpt of news 251', 'Content of news 251', 251, 'en'),
('tiêu đề của tin 251', 'mô tả ngắn của tin 251', 'Nội dung của tin 251', 251, 'vi'),
('Title of news 252', 'Excerpt of news 252', 'Content of news 252', 252, 'en'),
('tiêu đề của tin 252', 'mô tả ngắn của tin 252', 'Nội dung của tin 252', 252, 'vi'),
('Title of news 253', 'Excerpt of news 253', 'Content of news 253', 253, 'en'),
('tiêu đề của tin 253', 'mô tả ngắn của tin 253', 'Nội dung của tin 253', 253, 'vi'),
('Title of news 254', 'Excerpt of news 254', 'Content of news 254', 254, 'en'),
('tiêu đề của tin 254', 'mô tả ngắn của tin 254', 'Nội dung của tin 254', 254, 'vi'),
('Title of news 255', 'Excerpt of news 255', 'Content of news 255', 255, 'en'),
('tiêu đề của tin 255', 'mô tả ngắn của tin 255', 'Nội dung của tin 255', 255, 'vi'),
('Title of news 256', 'Excerpt of news 256', 'Content of news 256', 256, 'en'),
('tiêu đề của tin 256', 'mô tả ngắn của tin 256', 'Nội dung của tin 256', 256, 'vi'),
('Title of news 257', 'Excerpt of news 257', 'Content of news 257', 257, 'en'),
('tiêu đề của tin 257', 'mô tả ngắn của tin 257', 'Nội dung của tin 257', 257, 'vi'),
('Title of news 258', 'Excerpt of news 258', 'Content of news 258', 258, 'en'),
('tiêu đề của tin 258', 'mô tả ngắn của tin 258', 'Nội dung của tin 258', 258, 'vi'),
('Title of news 259', 'Excerpt of news 259', 'Content of news 259', 259, 'en'),
('tiêu đề của tin 259', 'mô tả ngắn của tin 259', 'Nội dung của tin 259', 259, 'vi'),
('Title of news 260', 'Excerpt of news 260', 'Content of news 260', 260, 'en'),
('tiêu đề của tin 260', 'mô tả ngắn của tin 260', 'Nội dung của tin 260', 260, 'vi'),
('Title of news 261', 'Excerpt of news 261', 'Content of news 261', 261, 'en'),
('tiêu đề của tin 261', 'mô tả ngắn của tin 261', 'Nội dung của tin 261', 261, 'vi'),
('Title of news 262', 'Excerpt of news 262', 'Content of news 262', 262, 'en'),
('tiêu đề của tin 262', 'mô tả ngắn của tin 262', 'Nội dung của tin 262', 262, 'vi'),
('Title of news 263', 'Excerpt of news 263', 'Content of news 263', 263, 'en'),
('tiêu đề của tin 263', 'mô tả ngắn của tin 263', 'Nội dung của tin 263', 263, 'vi'),
('Title of news 264', 'Excerpt of news 264', 'Content of news 264', 264, 'en'),
('tiêu đề của tin 264', 'mô tả ngắn của tin 264', 'Nội dung của tin 264', 264, 'vi'),
('Title of news 265', 'Excerpt of news 265', 'Content of news 265', 265, 'en'),
('tiêu đề của tin 265', 'mô tả ngắn của tin 265', 'Nội dung của tin 265', 265, 'vi'),
('Title of news 266', 'Excerpt of news 266', 'Content of news 266', 266, 'en'),
('tiêu đề của tin 266', 'mô tả ngắn của tin 266', 'Nội dung của tin 266', 266, 'vi'),
('Title of news 267', 'Excerpt of news 267', 'Content of news 267', 267, 'en'),
('tiêu đề của tin 267', 'mô tả ngắn của tin 267', 'Nội dung của tin 267', 267, 'vi'),
('Title of news 268', 'Excerpt of news 268', 'Content of news 268', 268, 'en'),
('tiêu đề của tin 268', 'mô tả ngắn của tin 268', 'Nội dung của tin 268', 268, 'vi'),
('Title of news 269', 'Excerpt of news 269', 'Content of news 269', 269, 'en'),
('tiêu đề của tin 269', 'mô tả ngắn của tin 269', 'Nội dung của tin 269', 269, 'vi'),
('Title of news 270', 'Excerpt of news 270', 'Content of news 270', 270, 'en'),
('tiêu đề của tin 270', 'mô tả ngắn của tin 270', 'Nội dung của tin 270', 270, 'vi'),
('Title of news 271', 'Excerpt of news 271', 'Content of news 271', 271, 'en'),
('tiêu đề của tin 271', 'mô tả ngắn của tin 271', 'Nội dung của tin 271', 271, 'vi'),
('Title of news 272', 'Excerpt of news 272', 'Content of news 272', 272, 'en'),
('tiêu đề của tin 272', 'mô tả ngắn của tin 272', 'Nội dung của tin 272', 272, 'vi'),
('Title of news 273', 'Excerpt of news 273', 'Content of news 273', 273, 'en'),
('tiêu đề của tin 273', 'mô tả ngắn của tin 273', 'Nội dung của tin 273', 273, 'vi'),
('Title of news 274', 'Excerpt of news 274', 'Content of news 274', 274, 'en'),
('tiêu đề của tin 274', 'mô tả ngắn của tin 274', 'Nội dung của tin 274', 274, 'vi'),
('Title of news 275', 'Excerpt of news 275', 'Content of news 275', 275, 'en'),
('tiêu đề của tin 275', 'mô tả ngắn của tin 275', 'Nội dung của tin 275', 275, 'vi'),
('Title of news 276', 'Excerpt of news 276', 'Content of news 276', 276, 'en'),
('tiêu đề của tin 276', 'mô tả ngắn của tin 276', 'Nội dung của tin 276', 276, 'vi'),
('Title of news 277', 'Excerpt of news 277', 'Content of news 277', 277, 'en'),
('tiêu đề của tin 277', 'mô tả ngắn của tin 277', 'Nội dung của tin 277', 277, 'vi'),
('Title of news 278', 'Excerpt of news 278', 'Content of news 278', 278, 'en'),
('tiêu đề của tin 278', 'mô tả ngắn của tin 278', 'Nội dung của tin 278', 278, 'vi'),
('Title of news 279', 'Excerpt of news 279', 'Content of news 279', 279, 'en'),
('tiêu đề của tin 279', 'mô tả ngắn của tin 279', 'Nội dung của tin 279', 279, 'vi'),
('Title of news 280', 'Excerpt of news 280', 'Content of news 280', 280, 'en'),
('tiêu đề của tin 280', 'mô tả ngắn của tin 280', 'Nội dung của tin 280', 280, 'vi'),
('Title of news 281', 'Excerpt of news 281', 'Content of news 281', 281, 'en'),
('tiêu đề của tin 281', 'mô tả ngắn của tin 281', 'Nội dung của tin 281', 281, 'vi'),
('Title of news 282', 'Excerpt of news 282', 'Content of news 282', 282, 'en'),
('tiêu đề của tin 282', 'mô tả ngắn của tin 282', 'Nội dung của tin 282', 282, 'vi'),
('Title of news 283', 'Excerpt of news 283', 'Content of news 283', 283, 'en'),
('tiêu đề của tin 283', 'mô tả ngắn của tin 283', 'Nội dung của tin 283', 283, 'vi'),
('Title of news 284', 'Excerpt of news 284', 'Content of news 284', 284, 'en'),
('tiêu đề của tin 284', 'mô tả ngắn của tin 284', 'Nội dung của tin 284', 284, 'vi'),
('Title of news 285', 'Excerpt of news 285', 'Content of news 285', 285, 'en'),
('tiêu đề của tin 285', 'mô tả ngắn của tin 285', 'Nội dung của tin 285', 285, 'vi'),
('Title of news 286', 'Excerpt of news 286', 'Content of news 286', 286, 'en'),
('tiêu đề của tin 286', 'mô tả ngắn của tin 286', 'Nội dung của tin 286', 286, 'vi'),
('Title of news 287', 'Excerpt of news 287', 'Content of news 287', 287, 'en'),
('tiêu đề của tin 287', 'mô tả ngắn của tin 287', 'Nội dung của tin 287', 287, 'vi'),
('Title of news 288', 'Excerpt of news 288', 'Content of news 288', 288, 'en'),
('tiêu đề của tin 288', 'mô tả ngắn của tin 288', 'Nội dung của tin 288', 288, 'vi'),
('Title of news 289', 'Excerpt of news 289', 'Content of news 289', 289, 'en'),
('tiêu đề của tin 289', 'mô tả ngắn của tin 289', 'Nội dung của tin 289', 289, 'vi'),
('Title of news 290', 'Excerpt of news 290', 'Content of news 290', 290, 'en'),
('tiêu đề của tin 290', 'mô tả ngắn của tin 290', 'Nội dung của tin 290', 290, 'vi'),
('Title of news 291', 'Excerpt of news 291', 'Content of news 291', 291, 'en'),
('tiêu đề của tin 291', 'mô tả ngắn của tin 291', 'Nội dung của tin 291', 291, 'vi'),
('Title of news 292', 'Excerpt of news 292', 'Content of news 292', 292, 'en'),
('tiêu đề của tin 292', 'mô tả ngắn của tin 292', 'Nội dung của tin 292', 292, 'vi'),
('Title of news 293', 'Excerpt of news 293', 'Content of news 293', 293, 'en'),
('tiêu đề của tin 293', 'mô tả ngắn của tin 293', 'Nội dung của tin 293', 293, 'vi'),
('Title of news 294', 'Excerpt of news 294', 'Content of news 294', 294, 'en'),
('tiêu đề của tin 294', 'mô tả ngắn của tin 294', 'Nội dung của tin 294', 294, 'vi'),
('Title of news 295', 'Excerpt of news 295', 'Content of news 295', 295, 'en'),
('tiêu đề của tin 295', 'mô tả ngắn của tin 295', 'Nội dung của tin 295', 295, 'vi'),
('Title of news 296', 'Excerpt of news 296', 'Content of news 296', 296, 'en'),
('tiêu đề của tin 296', 'mô tả ngắn của tin 296', 'Nội dung của tin 296', 296, 'vi'),
('Title of news 297', 'Excerpt of news 297', 'Content of news 297', 297, 'en'),
('tiêu đề của tin 297', 'mô tả ngắn của tin 297', 'Nội dung của tin 297', 297, 'vi'),
('Title of news 298', 'Excerpt of news 298', 'Content of news 298', 298, 'en'),
('tiêu đề của tin 298', 'mô tả ngắn của tin 298', 'Nội dung của tin 298', 298, 'vi'),
('Title of news 299', 'Excerpt of news 299', 'Content of news 299', 299, 'en'),
('tiêu đề của tin 299', 'mô tả ngắn của tin 299', 'Nội dung của tin 299', 299, 'vi'),
('Title of news 300', 'Excerpt of news 300', 'Content of news 300', 300, 'en'),
('tiêu đề của tin 300', 'mô tả ngắn của tin 300', 'Nội dung của tin 300', 300, 'vi');

-- --------------------------------------------------------

--
-- Structure for view `articles_all`
--
DROP TABLE IF EXISTS `articles_all`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `articles_all`  AS SELECT `a`.`id` AS `id`, `a`.`image` AS `image`, `a`.`categories` AS `categories`, `a`.`post_author` AS `post_author`, `a`.`post_date` AS `post_date`, `a`.`post_status` AS `post_status`, `a`.`article_code` AS `article_code`, `a`.`modified_by` AS `modified_by`, `a`.`menu_id` AS `menu_id`, `a`.`article_position` AS `article_position`, `a`.`comment_status` AS `comment_status`, `a`.`comment_count` AS `comment_count`, `a`.`createdAt` AS `createdAt`, `a`.`post_modified` AS `post_modified`, `b`.`title` AS `title`, `b`.`excerpt` AS `excerpt`, `b`.`content` AS `content`, `b`.`articleId` AS `articleId`, `b`.`languageCode` AS `languageCode` FROM (`articles` `a` join `article_languages` `b`) WHERE `a`.`id` = `b`.`articleId` ;

-- --------------------------------------------------------

--
-- Structure for view `article_cat_all`
--
DROP TABLE IF EXISTS `article_cat_all`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `article_cat_all`  AS SELECT `a`.`id` AS `id`, `a`.`category_code` AS `category_code`, `b`.`name` AS `name`, `b`.`description` AS `description`, `b`.`articleCategoryId` AS `articleCategoryId`, `b`.`languageCode` AS `languageCode` FROM (`article_categories` `a` join `article_cate_langs` `b`) WHERE `a`.`id` = `b`.`articleCategoryId` ;

-- --------------------------------------------------------

--
-- Structure for view `news_all`
--
DROP TABLE IF EXISTS `news_all`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `news_all`  AS SELECT `a`.`id` AS `id`, `a`.`image` AS `image`, `a`.`categories` AS `categories`, `a`.`tags` AS `tags`, `a`.`post_author` AS `post_author`, `a`.`post_date` AS `post_date`, `a`.`post_status` AS `post_status`, `a`.`news_code` AS `news_code`, `a`.`modified_by` AS `modified_by`, `a`.`menu_id` AS `menu_id`, `a`.`news_position` AS `news_position`, `a`.`comment_status` AS `comment_status`, `a`.`comment_count` AS `comment_count`, `a`.`createdAt` AS `createdAt`, `a`.`post_modified` AS `post_modified`, `b`.`title` AS `title`, `b`.`excerpt` AS `excerpt`, `b`.`content` AS `content`, `b`.`newsId` AS `newsId`, `b`.`languageCode` AS `languageCode` FROM (`news` `a` join `news_languages` `b`) WHERE `a`.`id` = `b`.`newsId` ;

-- --------------------------------------------------------

--
-- Structure for view `news_cat_all`
--
DROP TABLE IF EXISTS `news_cat_all`;

CREATE ALGORITHM=MERGE DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `news_cat_all`  AS SELECT `a`.`id` AS `id`, `a`.`parent` AS `parent`, `a`.`category_code` AS `category_code`, `b`.`name` AS `name`, `b`.`description` AS `description`, `b`.`newsCategoryId` AS `newsCategoryId`, `b`.`languageCode` AS `languageCode` FROM (`news_categories` `a` join `news_cate_langs` `b`) WHERE `a`.`id` = `b`.`newsCategoryId` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article_categories`
--
ALTER TABLE `article_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article_cate_langs`
--
ALTER TABLE `article_cate_langs`
  ADD PRIMARY KEY (`articleCategoryId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `article_languages`
--
ALTER TABLE `article_languages`
  ADD PRIMARY KEY (`articleId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_categories`
--
ALTER TABLE `news_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_cate_langs`
--
ALTER TABLE `news_cate_langs`
  ADD PRIMARY KEY (`newsCategoryId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

--
-- Indexes for table `news_languages`
--
ALTER TABLE `news_languages`
  ADD PRIMARY KEY (`newsId`,`languageCode`),
  ADD KEY `languageCode` (`languageCode`);

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT for table `news_categories`
--
ALTER TABLE `news_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
