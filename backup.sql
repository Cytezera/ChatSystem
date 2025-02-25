-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: chat
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `user1` varchar(100) NOT NULL,
  `user2` varchar(100) NOT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `friend_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`friend_id`),
  KEY `fk_user1` (`user1`),
  KEY `fk_user2` (`user2`),
  CONSTRAINT `fk_user1` FOREIGN KEY (`user1`) REFERENCES `users` (`username`),
  CONSTRAINT `fk_user2` FOREIGN KEY (`user2`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES ('d','a','accepted','2025-02-13 13:05:41',22),('d','e','pending','2025-02-13 13:05:42',23),('d','Ezra','pending','2025-02-13 13:05:44',24),('d','b','accepted','2025-02-13 13:05:45',25),('d','c','pending','2025-02-13 13:05:46',26),('a','c','pending','2025-02-13 13:06:35',27),('a','Ezra','pending','2025-02-13 13:06:36',28),('a','e','pending','2025-02-13 13:06:38',29),('a','b','accepted','2025-02-13 13:06:39',30),('b','c','pending','2025-02-13 13:08:43',31),('b','Ezra','pending','2025-02-13 13:08:44',32),('b','e','pending','2025-02-13 13:08:45',33);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `friend_id` int DEFAULT NULL,
  `sender` varchar(100) DEFAULT NULL,
  `messages` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `friend_id` (`friend_id`),
  KEY `sender` (`sender`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`friend_id`) REFERENCES `friends` (`friend_id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (184,22,'d','test','2025-02-23 06:16:15'),(185,22,'d','hi','2025-02-23 06:16:16'),(186,22,'d','now its fine','2025-02-23 06:16:18'),(187,22,'d','okay ','2025-02-23 06:16:19'),(188,25,'d','hello','2025-02-23 06:21:53'),(189,22,'a','wow it fuckign works','2025-02-23 07:16:59'),(190,22,'a','ehe','2025-02-23 07:17:01');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `account_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('a','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','2025-02-06 09:36:03','a'),('b','3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d','2025-02-09 10:09:24','b'),('c','2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6','2025-02-12 06:42:16','c'),('d','18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4','2025-02-12 06:56:46','d'),('e','3f79bb7b435b05321651daefd374cdc681dc06faa65e374e38337b88ca046dea','2025-02-13 12:57:54','e'),('Ezra','ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb','2025-02-05 11:10:55','ezrachin05@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24 16:00:28
