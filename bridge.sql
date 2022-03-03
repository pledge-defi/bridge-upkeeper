-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: bridge
-- ------------------------------------------------------
-- Server version	5.7.37-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `txhistory`
--

DROP TABLE IF EXISTS `txhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `txhistory` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `tx_type` varchar(100) DEFAULT NULL,
  `src_chain` varchar(100) DEFAULT NULL,
  `dest_chain` varchar(100) DEFAULT NULL,
  `asset` varchar(100) DEFAULT NULL,
  `amount` varchar(100) DEFAULT NULL,
  `fee` varchar(100) DEFAULT NULL,
  `timestamp` varchar(100) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `deposit_hash` varchar(100) DEFAULT NULL,
  `bridge_hash` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='txhistory';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `txhistory`
--

LOCK TABLES `txhistory` WRITE;
/*!40000 ALTER TABLE `txhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `txhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unlock_time`
--

DROP TABLE IF EXISTS `unlock_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unlock_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `next_time` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unlock_time`
--

LOCK TABLES `unlock_time` WRITE;
/*!40000 ALTER TABLE `unlock_time` DISABLE KEYS */;
/*!40000 ALTER TABLE `unlock_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bridge'
--

--
-- Dumping routines for database 'bridge'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 16:19:30
