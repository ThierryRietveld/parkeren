-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2018 at 03:21 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `bestellingen`
--

CREATE TABLE `bestellingen` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `aankomsttijd` datetime NOT NULL,
  `vertrektijd` datetime DEFAULT NULL,
  `type` int(11) NOT NULL,
  `kenteken` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bestellingen`
--

INSERT INTO `bestellingen` (`id`, `userId`, `aankomsttijd`, `vertrektijd`, `type`, `kenteken`) VALUES
(1, 664697, '2018-02-21 11:11:00', NULL, 1, ''),
(2, 664697, '2018-02-19 02:02:00', NULL, 1, ''),
(3, 664697, '2018-03-15 17:05:00', NULL, 2, ''),
(4, 664697, '2018-04-24 11:11:00', NULL, 2, ''),
(5, 664697, '2018-02-23 20:08:00', NULL, 1, '');

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
(1, 'gebruiker'),
(2, 'admin');

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
  `role` int(11) NOT NULL,
  `activatie` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `token`, `email`, `achternaam`, `password`, `rekeningNummer`, `role`, `activatie`) VALUES
(287994, 'HagoU41tMX', 'thierry.rietveld0505@gmail.com', 'Rietveld', '', 'ABN12345', 1, 'GvXm6N'),
(485498, 'P7AQ8SDwYt', 'thierry.rietveld0505@gmail.com', 'Rietveld', 'dbb96cac4a275fe5c5001f195f18f8f9e2b8c123', 'ABN12345', 1, '1'),
(664697, 'o1lNzfziN4', 'mand@mand.nl', 'mand', 'dbb96cac4a275fe5c5001f195f18f8f9e2b8c123', '5623675432', 2, '1'),
(992598, '6kGiNgJr7k', 'thierry.rietveld0505@gmail.com', 'Rietveld', '', 'ABN12345', 1, 'H9aAPE');

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
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_role_idx` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bestellingen`
--
ALTER TABLE `bestellingen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role`) REFERENCES `userroles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

