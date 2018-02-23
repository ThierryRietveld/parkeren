-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2018 at 09:05 AM
-- Server version: 5.7.11
-- PHP Version: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parkerenn`
--
CREATE DATABASE IF NOT EXISTS `parkerenn` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `parkerenn`;

-- --------------------------------------------------------

--
-- Table structure for table `bestellingen`
--

CREATE TABLE `bestellingen` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `aankomsttijd` datetime NOT NULL,
  `binnenrijtijd` datetime DEFAULT NULL,
  `vertrektijd` datetime DEFAULT NULL,
  `betaald` float DEFAULT NULL,
  `betalingsTijd` datetime DEFAULT NULL,
  `type` int(11) NOT NULL,
  `kenteken` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bestellingen`
--

INSERT INTO `bestellingen` (`id`, `userId`, `aankomsttijd`, `binnenrijtijd`, `vertrektijd`, `betaald`, `betalingsTijd`, `type`, `kenteken`) VALUES
(1, 664697, '2018-02-21 11:11:00', '2018-02-12 15:07:10', NULL, NULL, NULL, 1, ''),
(2, 664697, '2018-02-19 02:02:00', '2018-02-12 15:14:58', '2018-02-16 11:31:18', NULL, NULL, 1, ''),
(3, 664697, '2018-03-15 17:05:00', NULL, '2018-02-16 11:31:18', NULL, NULL, 2, ''),
(4, 664697, '2018-04-24 11:11:00', NULL, '2018-02-16 11:31:18', NULL, NULL, 2, ''),
(5, 664697, '2018-02-23 20:08:00', NULL, '2018-02-16 11:31:18', NULL, NULL, 1, ''),
(6, 485498, '2018-02-20 11:23:00', NULL, '2018-02-16 11:31:18', 100, '2018-02-14 21:52:46', 1, ''),
(7, 485498, '2018-02-22 22:00:00', '2018-02-14 13:40:51', '2018-02-16 11:31:18', 100, '2018-02-14 21:52:08', 2, ''),
(8, 485498, '2018-02-21 02:00:00', '2018-02-16 10:13:30', '2018-02-16 11:31:18', 100, '2018-02-16 10:14:13', 1, ''),
(9, 485498, '2018-02-20 14:03:00', NULL, '2018-02-16 11:31:18', NULL, NULL, 2, ''),
(10, 485498, '2018-02-28 01:00:00', '2018-02-16 11:16:57', '2018-02-16 11:31:18', 100, '2018-02-16 11:17:10', 1, ''),
(11, 485498, '2018-02-27 05:55:00', '2018-02-16 11:21:58', '2018-02-16 11:31:18', 100, '2018-02-16 11:31:12', 1, ''),
(12, 485498, '2018-02-23 15:33:00', '2018-02-16 11:35:09', '2018-02-16 11:35:24', 100, '2018-02-16 11:35:17', 3, 'abcdefg'),
(13, 485498, '2018-02-25 15:33:00', '2018-02-18 13:56:56', '2018-02-18 14:00:20', 100, '2018-02-18 14:00:10', 1, ''),
(14, 485498, '2018-02-26 00:12:00', '2018-02-18 14:03:34', '2018-02-18 14:03:52', 100, '2018-02-18 14:03:43', 1, 'OP-17-XZ'),
(15, 332612, '2018-02-23 13:03:00', NULL, NULL, NULL, NULL, 3, 'XN-73-RT');

-- --------------------------------------------------------

--
-- Table structure for table `typeparking`
--

CREATE TABLE `typeparking` (
  `id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `typeparking`
--

INSERT INTO `typeparking` (`id`, `type`) VALUES
(1, 'economic'),
(2, 'long'),
(3, 'valet');

-- --------------------------------------------------------

--
-- Table structure for table `userroles`
--

CREATE TABLE `userroles` (
  `id` int(11) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userroles`
--

INSERT INTO `userroles` (`id`, `role`) VALUES
(4, 'baliemedewerker'),
(2, 'beheerder'),
(3, 'garagemedewerker'),
(1, 'gebruiker');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `token` varchar(10) NOT NULL,
  `email` varchar(45) NOT NULL,
  `achternaam` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `rekeningNummer` varchar(50) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `activatie` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `email`, `achternaam`, `password`, `rekeningNummer`, `phone`, `role`, `activatie`) VALUES
(332612, 'EaTKIz0phN', 'admin@admin.nl', 'Henk', 'dbb96cac4a275fe5c5001f195f18f8f9e2b8c123', 'ABN 03383722', NULL, 1, '1'),
(485498, 'P7AQ8SDwYt', 'thierry.rietveld0505@gmail.com', 'Rietveld', 'dbb96cac4a275fe5c5001f195f18f8f9e2b8c123', 'ABN12345', NULL, 1, '1'),
(664697, 'o1lNzfziN4', 'mand@mand.nl', 'mand', 'dbb96cac4a275fe5c5001f195f18f8f9e2b8c123', '5623675432', NULL, 2, '1');

-- --------------------------------------------------------

--
-- Table structure for table `users_userroles`
--

CREATE TABLE `users_userroles` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_userroles`
--

INSERT INTO `users_userroles` (`id`, `user`, `role`) VALUES
(1, 485498, 1),
(6, 664697, 1),
(7, 332612, 1),
(16, 664697, 3),
(17, 485498, 2),
(20, 332612, 2),
(24, 332612, 3),
(27, 485498, 4),
(33, 485498, 3),
(34, 332612, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bestellingen`
--
ALTER TABLE `bestellingen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bestelling_type_idx` (`type`),
  ADD KEY `fk_bestelling_users_idx` (`userId`);

--
-- Indexes for table `typeparking`
--
ALTER TABLE `typeparking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userroles`
--
ALTER TABLE `userroles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_role_idx` (`role`);

--
-- Indexes for table `users_userroles`
--
ALTER TABLE `users_userroles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bestellingen`
--
ALTER TABLE `bestellingen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `users_userroles`
--
ALTER TABLE `users_userroles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bestellingen`
--
ALTER TABLE `bestellingen`
  ADD CONSTRAINT `fk_bestelling_type` FOREIGN KEY (`type`) REFERENCES `typeparking` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_bestelling_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users_userroles`
--
ALTER TABLE `users_userroles`
  ADD CONSTRAINT `users_userroles_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `users_userroles_ibfk_2` FOREIGN KEY (`role`) REFERENCES `userroles` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
