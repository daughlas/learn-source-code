-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-12-26 07:26:01
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `nblog`
--
CREATE DATABASE IF NOT EXISTS `nblog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nblog`;

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` tinytext NOT NULL,
  `content` text NOT NULL,
  `author` bigint(20) UNSIGNED NOT NULL,
  `creation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `author`, `creation_time`) VALUES
(1, 'Hello World', 'Hello JavaScript', 10, '2016-12-23 15:40:02'),
(2, 'Java和JavaScript有关系吗？', '<ul><li>Java</li><li>JavaScript</li><li>我敢说没有关系吗？</li></ul>', 10, '2016-12-23 16:17:12'),
(3, 'Java好用吗', 'Java是一个强类型的编程语言，实际开发工作中用得挺多的', 10, '2016-12-24 10:49:22'),
(4, '我找到了一个好图片', '就是这个<div><br></div><img width="400" src="/uploads/media/2ea8bdd8bb09a213b0babf91926276dd">', 11, '2016-12-25 14:57:38');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE `comment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `article_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `creation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `article_id`, `content`, `creation_time`) VALUES
(1, 9, 3, '这个真的好吗？', '2016-12-24 00:00:00'),
(2, 11, 3, '不知道', '2016-12-24 17:08:16'),
(3, 11, 2, '当然没关系，傻子才这么问', '2016-12-24 17:10:05'),
(4, 11, 2, '又一条评论', '2016-12-24 17:10:31'),
(5, 11, 1, 'Hehe', '2016-12-25 15:13:17');

-- --------------------------------------------------------

--
-- 表的结构 `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` tinytext NOT NULL,
  `path` tinytext NOT NULL,
  `type` varchar(16) NOT NULL,
  `creation_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `media`
--

INSERT INTO `media` (`id`, `user_id`, `name`, `path`, `type`, `creation_time`) VALUES
(1, 10, 'image.jpeg', '/uploads/media/e0bd9b3b135be7ef0798db75466701bc', 'image', '2016-12-25 11:55:04'),
(2, 11, 'VVJ04M7P71W2.jpg', '/uploads/media/b93ce04da0b4d1464a8640cf34cd6222', 'image', '2016-12-25 14:12:08'),
(3, 11, 'image.jpg', '/uploads/media/a8c7b6e7bad9fc6f5a8447555072cc94', 'image', '2016-12-25 14:16:31'),
(4, 11, 'c3ad5d8847985ff05375e0f801e84caf.jpg', '/uploads/media/df22523c72591a2e306b6af3b63aa458', 'image', '2016-12-25 14:43:12'),
(5, 11, 'image.jpg', '/uploads/media/2ea8bdd8bb09a213b0babf91926276dd', 'image', '2016-12-25 14:49:30');

-- --------------------------------------------------------

--
-- 表的结构 `membership`
--

CREATE TABLE `membership` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `membership`
--

INSERT INTO `membership` (`id`, `group_id`, `user_id`) VALUES
(1, 1, 10),
(2, 1, 11);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` varchar(64) NOT NULL,
  `pass` varchar(32) NOT NULL,
  `email` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `user`, `pass`, `email`) VALUES
(9, 'plter', '17009aaea768e55c2fb1a1f6be5f1ff9', 'ucai@ucai.cn'),
(10, 'ucai', '17009aaea768e55c2fb1a1f6be5f1ff9', 'aa@a.com'),
(11, 'xiaoming', '6be8037d6bbb7d27edcb24a023055e95', NULL),
(12, 'admin', '2da49deacf40ff95ba3d2d8dec3b37b4', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user_group`
--

CREATE TABLE `user_group` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_group`
--

INSERT INTO `user_group` (`id`, `name`) VALUES
(1, 'editor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `membership`
--
ALTER TABLE `membership`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `user_group`
--
ALTER TABLE `user_group`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;