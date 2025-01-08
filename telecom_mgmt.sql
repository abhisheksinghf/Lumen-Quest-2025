-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2025 at 09:28 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telecom_mgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `notification_type` enum('Stock Alert','Order Alert') NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `delivery_date` timestamp NULL DEFAULT NULL,
  `status` enum('Pending','Completed','Overdue') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `stock_level` int(11) NOT NULL DEFAULT 0,
  `reorder_point` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `category`, `stock_level`, `reorder_point`, `description`, `created_at`, `updated_at`) VALUES
(2, 'Product AAAdasdas', 'Electronicssss', 1003, 20, 'High-quality electronics product', '2025-01-04 06:13:55', '2025-01-04 07:31:28'),
(3, 'dasdjkas', 'dasdaks', 23232, 3232, 'kasdaskda dakjsdmnaksdmas', '2025-01-04 06:24:28', '2025-01-04 06:24:28'),
(4, 'dsdasd', 'dasd', 0, 32, 'dadasda', '2025-01-04 06:24:47', '2025-01-04 06:24:47'),
(5, 'sdfsf', 'rwdewe', 0, 0, 'ewew', '2025-01-04 06:26:01', '2025-01-04 06:26:01'),
(6, 'dasda', 'dasdas', 0, 0, 'dasds', '2025-01-04 06:27:04', '2025-01-04 06:27:04'),
(7, 'Abdasbdhasb', 'Dajdj', 232, 232, 'dmaskdmkasmd', '2025-01-04 06:29:39', '2025-01-04 06:29:39'),
(8, 'FSAREWRA', 'RR', 0, 0, 'DASFSFD', '2025-01-04 06:32:05', '2025-01-04 06:32:05'),
(9, 'dnasdjahnj', 'dasjdj', 0, 332, 'dnajkdkajsd', '2025-01-04 06:34:39', '2025-01-04 06:34:39');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`supplier_id`, `name`, `contact_person`, `phone`, `email`, `address`, `created_at`, `updated_at`) VALUES
(2, 'Supplissser Adsds', 'John Doe', '1234567890', 'john.doe@supplier.com', '123 Supplier Street', '2025-01-04 06:18:32', '2025-01-04 07:11:45'),
(3, 'Supplisssdaser A', 'Johsssn Doe', '1234567890', 'jddohn.doe@supplier.com', '123 Supplier Street', '2025-01-04 06:33:59', '2025-01-04 06:33:59'),
(4, 'dadas', 'dasdas', '23232323', 'dada@gmail.com', 'dasdasdas', '2025-01-04 07:05:35', '2025-01-04 07:05:35'),
(5, 'dasdas', 'dasdas', 'dasdas', 'dasdasd', 'dasdas', '2025-01-04 07:08:14', '2025-01-04 07:08:14'),
(6, 'dasdfafaf', 'dasdasd', '343424342222', 'dada@gmail.com', 'dasdas ada s', '2025-01-04 07:08:31', '2025-01-04 07:08:48'),
(7, 'adsda', 'dasd', '232323232', 'dakd@gmail.com', 'dadsfs', '2025-01-04 07:42:01', '2025-01-04 07:42:01'),
(8, 'dasfssf', '232323232323', 'dasfsdf', 'dasjdaj@gmail.com', 'fasffd', '2025-01-04 07:42:14', '2025-01-04 07:42:14');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `transaction_type` enum('IN','OUT') NOT NULL,
  `quantity` int(11) NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Manager','Staff') NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `email`, `created_at`, `updated_at`) VALUES
(2, 'sassa', '$2b$10$fosVAiV5PI5j1EPBwqUWced55IES1s6xmHPmUSFfMDlreNVm2ObJy', 'Admin', 'asdas@gmail.comd', '2025-01-04 08:11:24', '2025-01-04 08:20:31'),
(3, 'dadasd', '$2b$10$dN5Afh19zXDTC/fTbUNTwefbGBzJzH/zh4KxS7pjEnGvZna.6Q3gW', 'Admin', 'dasd@gmai.com', '2025-01-04 08:17:16', '2025-01-04 08:17:16'),
(10, 'dasdsa', '$2b$10$/BP/KywiBBHzKYG4Ka4i2e763eSb5.YVnKr3I.fRkQLc9LOIsMiFO', '', 'dasdasd@fafa.bb', '2025-01-04 08:20:18', '2025-01-04 08:20:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
