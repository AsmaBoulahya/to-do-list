-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 13 sep. 2025 à 12:13
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `todolist_app`
--

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `project` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'en cours'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `date`, `category`, `project`, `status`) VALUES
(1, 'sport', '2025-07-05', 'personnel', 'personnel', 'terminée');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `created_at`) VALUES
(1, 'asma', 'asmablh350@gmail.com', '$2y$10$q1SopZQ5vkJnwi8OZAKB2eJQ.OtFC/1P5g/a1zD5R0YjMH4hfwNuK', '2025-05-04 13:00:59'),
(4, 'asma', 'asma1234@gmail.com', '$2y$10$IzS8DwIwwjht51iFwvQXF.I7h1i93WTP3QiYwDXQ6uyU2IKga6QVO', '2025-05-11 17:23:43'),
(5, 'asma', 'asmablh12@gmail.com', '$2y$10$FVFCHBexZiCb6bguWrlw8eSRlPRel45bnkp9v3Yw3pHKaOzvIVXSa', '2025-05-12 21:54:21'),
(9, 'asma', 'asmablh35@gmail.com', '$2y$10$y0mPwN9TZPNKQt72K6sk0urDGLp4BjRCgdjaQX5NSPPWzdqJW45je', '2025-05-14 14:09:04'),
(11, 'asma', 'asma12@gmail.com', '$2y$10$4SeDpiSfD.EPOvIJp4vFeOh27trl/YrwWkKK/FUGEbiqFrpQl1oLW', '2025-05-14 21:48:43'),
(12, 'asma', 'asma123@gmail.com', '$2y$10$cYPf5gNeZ53iEpQiVJh9/evxDNnEpTZoeiji7tCaPhyTcMPJEsk6W', '2025-05-16 22:15:02'),
(16, 'mustapha', 'mustapha@gmail.com', '$2y$10$BMK6moCywoppcs4ougC3Au8l1IrtSCwVEIK.iezCTZcNNlIpcG2EK', '2025-05-16 22:20:41');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
