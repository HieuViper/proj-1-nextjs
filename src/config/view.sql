-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 30, 2023 at 03:11 AM
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
-- Stand-in structure for view `articles_all`
-- (See below for the actual view)
--
-- DROP VIEW IF EXISTS `articles_all`;
-- CREATE TABLE `articles_all` (
-- `id` bigint(20) unsigned
-- ,`image` varchar(200)
-- ,`categories` varchar(200)
-- ,`post_author` varchar(200)
-- ,`post_date` datetime
-- ,`post_status` varchar(20)
-- ,`article_code` varchar(200)
-- ,`modified_by` varchar(200)
-- ,`menu_id` int(11) unsigned
-- ,`article_position` int(11)
-- ,`comment_status` varchar(20)
-- ,`comment_count` int(10)
-- ,`createdAt` datetime
-- ,`post_modified` datetime
-- ,`title` varchar(300)
-- ,`excerpt` text
-- ,`content` text
-- ,`articleId` bigint(20) unsigned
-- ,`languageCode` varchar(10)
-- );

-- --------------------------------------------------------

--
-- Stand-in structure for view `article_cat_all`
-- (See below for the actual view)
--
-- DROP VIEW IF EXISTS `article_cat_all`;
-- CREATE TABLE `article_cat_all` (
-- `id` bigint(20) unsigned
-- ,`category_code` varchar(200)
-- ,`name` varchar(200)
-- ,`description` longtext
-- ,`article_categoryId` bigint(20) unsigned
-- ,`languageCode` varchar(10)
-- );

-- --------------------------------------------------------

--
-- Stand-in structure for view `news_all`
-- (See below for the actual view)
--
-- DROP VIEW IF EXISTS `news_all`;
-- CREATE TABLE `news_all` (
-- `id` bigint(20) unsigned
-- ,`image` varchar(200)
-- ,`categories` varchar(200)
-- ,`tags` varchar(200)
-- ,`post_author` varchar(200)
-- ,`post_date` datetime
-- ,`post_status` varchar(20)
-- ,`news_code` varchar(200)
-- ,`modified_by` varchar(200)
-- ,`menu_id` int(11) unsigned
-- ,`news_position` tinyint(1)
-- ,`comment_status` varchar(20)
-- ,`comment_count` int(10)
-- ,`createdAt` datetime
-- ,`post_modified` datetime
-- ,`title` varchar(300)
-- ,`excerpt` text
-- ,`content` text
-- ,`newsId` bigint(20) unsigned
-- ,`languageCode` varchar(10)
-- );

-- --------------------------------------------------------

--
-- Stand-in structure for view `news_cat_all`
-- (See below for the actual view)
--
-- DROP VIEW IF EXISTS `news_cat_all`;
-- CREATE TABLE `news_cat_all` (
-- `id` bigint(20) unsigned
-- ,`parent` bigint(20) unsigned
-- ,`category_code` varchar(200)
-- ,`name` varchar(200)
-- ,`description` longtext
-- ,`news_categoryId` bigint(20) unsigned
-- ,`languageCode` varchar(10)
-- );

-- --------------------------------------------------------

--
-- Stand-in structure for view `tags_all`
-- (See below for the actual view)
--
-- DROP VIEW IF EXISTS `tags_all`;
-- CREATE TABLE `tags_all` (
-- `id` bigint(20) unsigned
-- ,`tag_code` varchar(200)
-- ,`name` varchar(200)
-- ,`description` longtext
-- ,`tagId` bigint(20) unsigned
-- ,`languageCode` varchar(10)
-- );

-- --------------------------------------------------------

--
-- Structure for view `articles_all`
--
-- DROP TABLE IF EXISTS `articles_all`;

DROP VIEW IF EXISTS `articles_all`;
CREATE ALGORITHM=MERGE  SQL SECURITY DEFINER VIEW `articles_all`  AS SELECT `a`.`id` AS `id`, `a`.`image` AS `image`, `a`.`categories` AS `categories`, `a`.`post_author` AS `post_author`, `a`.`post_date` AS `post_date`, `a`.`post_status` AS `post_status`, `a`.`article_code` AS `article_code`, `a`.`modified_by` AS `modified_by`, `a`.`menu_id` AS `menu_id`, `a`.`article_position` AS `article_position`, `a`.`comment_status` AS `comment_status`, `a`.`comment_count` AS `comment_count`, `a`.`createdAt` AS `createdAt`, `a`.`post_modified` AS `post_modified`, `b`.`title` AS `title`, `b`.`excerpt` AS `excerpt`, `b`.`content` AS `content`, `b`.`articleId` AS `articleId`, `b`.`languageCode` AS `languageCode` FROM (`articles` `a` join `article_languages` `b`) WHERE `a`.`id` = `b`.`articleId` ;

-- --------------------------------------------------------

--
-- Structure for view `article_cat_all`
--
-- DROP TABLE IF EXISTS `article_cat_all`;

DROP VIEW IF EXISTS `article_cat_all`;
CREATE ALGORITHM=MERGE  SQL SECURITY DEFINER VIEW `article_cat_all`  AS SELECT `a`.`id` AS `id`, `a`.`category_code` AS `category_code`, `b`.`name` AS `name`, `b`.`description` AS `description`, `b`.`article_categoryId` AS `article_categoryId`, `b`.`languageCode` AS `languageCode` FROM (`article_categories` `a` join `article_cate_langs` `b`) WHERE `a`.`id` = `b`.`article_categoryId` ;

-- --------------------------------------------------------

--
-- Structure for view `news_all`
--
-- DROP TABLE IF EXISTS `news_all`;

DROP VIEW IF EXISTS `news_all`;
CREATE ALGORITHM=MERGE  SQL SECURITY DEFINER VIEW `news_all`  AS SELECT `a`.`id` AS `id`, `a`.`image` AS `image`, `a`.`categories` AS `categories`, `a`.`tags` AS `tags`, `a`.`post_author` AS `post_author`, `a`.`post_date` AS `post_date`, `a`.`post_status` AS `post_status`, `a`.`news_code` AS `news_code`, `a`.`modified_by` AS `modified_by`, `a`.`menu_id` AS `menu_id`, `a`.`news_position` AS `news_position`, `a`.`comment_status` AS `comment_status`, `a`.`comment_count` AS `comment_count`, `a`.`createdAt` AS `createdAt`, `a`.`post_modified` AS `post_modified`, `b`.`title` AS `title`, `b`.`excerpt` AS `excerpt`, `b`.`content` AS `content`, `b`.`newsId` AS `newsId`, `b`.`languageCode` AS `languageCode` FROM (`news` `a` join `news_languages` `b`) WHERE `a`.`id` = `b`.`newsId` ;

-- --------------------------------------------------------

--
-- Structure for view `news_cat_all`
--
-- DROP TABLE IF EXISTS `news_cat_all`;

DROP VIEW IF EXISTS `news_cat_all`;
CREATE ALGORITHM=MERGE  SQL SECURITY DEFINER VIEW `news_cat_all`  AS SELECT `a`.`id` AS `id`, `a`.`parent` AS `parent`, `a`.`category_code` AS `category_code`, `b`.`name` AS `name`, `b`.`description` AS `description`, `b`.`news_categoryId` AS `news_categoryId`, `b`.`languageCode` AS `languageCode` FROM (`news_categories` `a` join `news_cate_langs` `b`) WHERE `a`.`id` = `b`.`news_categoryId` ;

-- --------------------------------------------------------

--
-- Structure for view `tags_all`
--
-- DROP TABLE IF EXISTS `tags_all`;

DROP VIEW IF EXISTS `tags_all`;
CREATE ALGORITHM=MERGE  SQL SECURITY DEFINER VIEW `tags_all`  AS SELECT `a`.`id` AS `id`, `a`.`tag_code` AS `tag_code`, `b`.`name` AS `name`, `b`.`description` AS `description`, `b`.`tagId` AS `tagId`, `b`.`languageCode` AS `languageCode` FROM (`tags` `a` join `tag_langs` `b`) WHERE `a`.`id` = `b`.`tagId` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
