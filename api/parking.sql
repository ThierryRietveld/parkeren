-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Gegenereerd op: 04 feb 2018 om 13:11
-- Serverversie: 5.7.19
-- PHP-versie: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `parking`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aankomsttijd` datetime NOT NULL,
  `vertrektijd` datetime DEFAULT NULL,
  `prijs` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `ticket`
--

INSERT INTO `ticket` (`id`, `aankomsttijd`, `vertrektijd`, `prijs`) VALUES
(1, '2018-01-11 14:02:13', '2018-01-11 15:02:13', 2),
(2, '2018-01-11 14:02:24', '2018-01-11 16:02:24', NULL),
(3, '2018-01-11 14:03:05', '2018-01-11 16:04:05', NULL),
(4, '2018-01-11 14:03:41', '2018-01-11 19:03:41', NULL),
(5, '2018-01-11 14:03:49', '2018-01-11 20:03:49', NULL),
(6, '2018-01-11 14:03:56', '2018-01-11 21:03:56', NULL),
(7, '2018-01-11 14:04:05', '2018-01-12 14:04:05', 12),
(8, '2018-01-11 14:04:25', '2018-01-12 14:05:25', NULL),
(9, '2018-01-11 14:04:36', '2018-01-14 14:04:36', 36),
(17, '2018-01-25 23:44:04', '1992-01-25 23:44:04', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
