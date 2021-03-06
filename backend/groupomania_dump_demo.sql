-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.28
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
-- Table structure for table `comments`
--
DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(100) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `postId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postUuid` (`postId`)
) ENGINE = InnoDB AUTO_INCREMENT = 165 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `comments`
--
LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO
  `comments`
VALUES
  (162, '115', 'Oh le petit chat 😍', '250'),(163, '114', 'Merci Michael', '250'),(164, '114', 'nan..', '251');
  /*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `likes`
  --
  DROP TABLE IF EXISTS `likes`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
    `id` int NOT NULL AUTO_INCREMENT,
    `userId` varchar(100) DEFAULT NULL,
    `postId` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 171 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `likes`
  --
  LOCK TABLES `likes` WRITE;
  /*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO
  `likes`
VALUES
  (133, '106', '218'),(139, '110', '218'),(149, '106', '244'),(166, '113', '250'),(167, '115', '250'),(168, '114', '250'),(169, '116', '250'),(170, '116', '251');
  /*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `posts`
  --
  DROP TABLE IF EXISTS `posts`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) DEFAULT NULL,
    `text` varchar(255) DEFAULT NULL,
    `mediaUrl` varchar(250) DEFAULT NULL,
    `userID` int DEFAULT NULL,
    `caption` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `userID` (`userID`),
    CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 252 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `posts`
  --
  LOCK TABLES `posts` WRITE;
  /*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO
  `posts`
VALUES
  (
    250,
    'Bonne semaine à tous',
    'Vivement le weekend !',
    'Monday-already.jpg1651558874157.jpg1651567359653.jpg',
    113,
    'un chat qui s\'ennui'
  ),(
    251,
    'Quelqu\'un a vu mon stylo ?',
    'J\'ai perdu mon 4 couleurs',
    NULL,
    116,
    'undefined'
  );
  /*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `users`
  --
  DROP TABLE IF EXISTS `users`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `avatarUrl` varchar(255) DEFAULT NULL,
    `privileges` int DEFAULT NULL,
    `token` varchar(16) DEFAULT NULL,
    `reinitialisationLink` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 117 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `users`
  --
  LOCK TABLES `users` WRITE;
  /*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO
  `users`
VALUES
  (
    106,
    'groupomaniaAdmin',
    'groupomaniaadmin@test.fr',
    '$2b$10$l7gB.wKh9qNm4cgXQXGV9.wEhKSbodAVCSnGfdWwYIq06jFNypFa2',
    'admin.png1651476271860.png1651567322563.png',
    1,
    NULL,
    NULL
  ),(
    110,
    'Maxence',
    'maxence.califano@gmail.com',
    '$2b$10$QCnqT6PfKSr368jiToULu.Hd7nQTd9JWLHpLRFjrKTw7QTAWh3Hmu',
    'r2.jpg1651149316411.jpg',
    NULL,
    NULL,
    NULL
  ),(
    113,
    'Michael scott',
    'michael@groupomania.fr',
    '$2b$10$0c/vmvxEf3COYgrsrK/I7.2MqFb7XMtIWcg/gESqDfqd6FQwUrd8S',
    'michaelScott.jpg1651128491469.jpg',
    NULL,
    NULL,
    NULL
  ),(
    114,
    'Dwight Shrute',
    'dwight@groupomania.fr',
    '$2b$10$rbzImO.rPqEN5S2rzDxI8u/t2oLogYg3e6y/JcxWWwL6uvR2kjYLK',
    'dwight.jpg1651128930189.jpg',
    NULL,
    NULL,
    NULL
  ),(
    115,
    'Angela Martin',
    'angela@groupomania.fr',
    '$2b$10$.DrUz/UHgOoaJ7Lm3bpWXOryVA6qKR56XMhdVskT7M5qGsHkuV2LG',
    'angela.jpg1651129174536.jpg',
    NULL,
    NULL,
    NULL
  ),(
    116,
    'Jim Halpert',
    'jim@groupomania.fr',
    '$2b$10$vH1TT8QGxS0sotrPJ8nHi.hXR7PXLmB6haGS61cjZRJexUb1BJn4K',
    'jim.jpg1651129510771.jpg',
    NULL,
    NULL,
    NULL
  );
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
-- Dump completed on 2022-05-03 10:46:00
