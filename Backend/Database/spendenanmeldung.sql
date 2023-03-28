-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 28. Mrz 2023 um 19:53
-- Server-Version: 10.5.18-MariaDB-0+deb11u1
-- PHP-Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `SpendenanmeldungDB`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Areas`
--

DROP TABLE IF EXISTS `Areas`;
CREATE TABLE `Areas` (
  `AREANAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Areas`
--

INSERT INTO `Areas` (`AREANAME`) VALUES
('Indien'),
('Kolumbien'),
('Mali'),
('Nigeria'),
('Syrien'),
('Türkei');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Clothes`
--

DROP TABLE IF EXISTS `Clothes`;
CREATE TABLE `Clothes` (
  `DRESSNAME` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Clothes`
--

INSERT INTO `Clothes` (`DRESSNAME`) VALUES
('Babykleidung'),
('Jacken'),
('Kopfbedeckung'),
('Pullover'),
('Schuhe'),
('Shirts'),
('Socken'),
('Unterwäsche');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Registrations`
--

DROP TABLE IF EXISTS `Registrations`;
CREATE TABLE `Registrations` (
  `registrationID` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `timestamp` datetime NOT NULL,
  `state` varchar(10) NOT NULL DEFAULT 'Offen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Registrations_Addresses`
--

DROP TABLE IF EXISTS `Registrations_Addresses`;
CREATE TABLE `Registrations_Addresses` (
  `ID` int(11) NOT NULL,
  `registrationID` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` int(11) NOT NULL,
  `zipcode` int(11) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Registrations_Areas`
--

DROP TABLE IF EXISTS `Registrations_Areas`;
CREATE TABLE `Registrations_Areas` (
  `ID` int(11) NOT NULL,
  `registrationID` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Registrations_Clothes`
--

DROP TABLE IF EXISTS `Registrations_Clothes`;
CREATE TABLE `Registrations_Clothes` (
  `ID` int(11) NOT NULL,
  `registrationID` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `States`
--

DROP TABLE IF EXISTS `States`;
CREATE TABLE `States` (
  `STATE` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `States`
--

INSERT INTO `States` (`STATE`) VALUES
('Abgeschlossen'),
('Geschlossen'),
('In Bearbeitung'),
('Offen');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Types`
--

DROP TABLE IF EXISTS `Types`;
CREATE TABLE `Types` (
  `TYPE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Types`
--

INSERT INTO `Types` (`TYPE`) VALUES
('Abholung'),
('Übergabe an der Geschäftsstelle');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Areas`
--
ALTER TABLE `Areas`
  ADD PRIMARY KEY (`AREANAME`);

--
-- Indizes für die Tabelle `Clothes`
--
ALTER TABLE `Clothes`
  ADD PRIMARY KEY (`DRESSNAME`);

--
-- Indizes für die Tabelle `Registrations`
--
ALTER TABLE `Registrations`
  ADD PRIMARY KEY (`registrationID`),
  ADD KEY `Type_REG_FK` (`type`),
  ADD KEY `States_REG_FK` (`state`);

--
-- Indizes für die Tabelle `Registrations_Addresses`
--
ALTER TABLE `Registrations_Addresses`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `registrationID` (`registrationID`);

--
-- Indizes für die Tabelle `Registrations_Areas`
--
ALTER TABLE `Registrations_Areas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `registrationID` (`registrationID`),
  ADD KEY `Areas_REGAREAS_FK` (`name`);

--
-- Indizes für die Tabelle `Registrations_Clothes`
--
ALTER TABLE `Registrations_Clothes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `registrationID` (`registrationID`),
  ADD KEY `Clothes_REGCLOTHES_FK` (`name`);

--
-- Indizes für die Tabelle `States`
--
ALTER TABLE `States`
  ADD PRIMARY KEY (`STATE`);

--
-- Indizes für die Tabelle `Types`
--
ALTER TABLE `Types`
  ADD PRIMARY KEY (`TYPE`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Registrations_Addresses`
--
ALTER TABLE `Registrations_Addresses`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Registrations_Areas`
--
ALTER TABLE `Registrations_Areas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Registrations_Clothes`
--
ALTER TABLE `Registrations_Clothes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Registrations`
--
ALTER TABLE `Registrations`
  ADD CONSTRAINT `States_REG_FK` FOREIGN KEY (`state`) REFERENCES `States` (`STATE`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Type_REG_FK` FOREIGN KEY (`type`) REFERENCES `Types` (`TYPE`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Registrations_Addresses`
--
ALTER TABLE `Registrations_Addresses`
  ADD CONSTRAINT `Registration_ADRESSES_FK` FOREIGN KEY (`registrationID`) REFERENCES `Registrations` (`registrationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Registrations_Areas`
--
ALTER TABLE `Registrations_Areas`
  ADD CONSTRAINT `Areas_REGAREAS_FK` FOREIGN KEY (`name`) REFERENCES `Areas` (`AREANAME`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Registrations_REGAREAS_FK` FOREIGN KEY (`registrationID`) REFERENCES `Registrations` (`registrationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `Registrations_Clothes`
--
ALTER TABLE `Registrations_Clothes`
  ADD CONSTRAINT `Clothes_REGCLOTHES_FK` FOREIGN KEY (`name`) REFERENCES `Clothes` (`DRESSNAME`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Registrations_REGCLOTHES_FK` FOREIGN KEY (`registrationID`) REFERENCES `Registrations` (`registrationID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
