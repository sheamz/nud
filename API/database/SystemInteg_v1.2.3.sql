-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 16, 2024 at 04:25 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sysinteg`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_access`
--

CREATE TABLE `tbl_access` (
  `access_id` int(11) NOT NULL,
  `access_category` varchar(10) DEFAULT NULL,
  `descripton` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_access`
--

INSERT INTO `tbl_access` (`access_id`, `access_category`, `descripton`) VALUES
(1, 'USER', 'basic view, lowest of the lowest'),
(2, 'STAFF', 'manages systems'),
(3, 'ADMIN', 'add staff accounts');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin_panel`
--

CREATE TABLE `tbl_admin_panel` (
  `panel_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `status` enum('Resolved','Pending') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_announcement`
--

CREATE TABLE `tbl_announcement` (
  `announcement_id` int(11) NOT NULL,
  `annoucement_text` varchar(255) NOT NULL,
  `annoucement_imf` varchar(255) DEFAULT NULL,
  `created_by` varchar(25) DEFAULT NULL COMMENT 'Staff member who created the annoucement',
  `created_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_calendar`
--

CREATE TABLE `tbl_calendar` (
  `calendar_id` int(11) NOT NULL,
  `calendar_type` varchar(100) DEFAULT NULL,
  `external_event_id` varchar(20) DEFAULT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_comments`
--

CREATE TABLE `tbl_comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_events`
--

CREATE TABLE `tbl_events` (
  `event_id` int(11) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `event_type` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_event_type`
--

CREATE TABLE `tbl_event_type` (
  `type_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_faqs`
--

CREATE TABLE `tbl_faqs` (
  `faq_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `created_by` varchar(25) DEFAULT NULL COMMENT 'Staff member who added the FAQ',
  `created_date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_feedback`
--

CREATE TABLE `tbl_feedback` (
  `feedback_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory_items`
--

CREATE TABLE `tbl_inventory_items` (
  `item_id` varchar(25) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `item_image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('Available','Out Of Stock') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_inventory_items`
--

INSERT INTO `tbl_inventory_items` (`item_id`, `item_name`, `item_image`, `description`, `quantity`, `price`, `status`) VALUES
('NUD-M00001', 'NU Dasma T-Shirt - Blue', 'https://i.postimg.cc/Wbkpy646/NUD-M001.jpg', 'Blue T-shirt with NU Dasma Logo', 0, 300.00, 'Available'),
('NUD-M00002', 'NU Dasma T-Shirt - White', 'https://i.postimg.cc/cLG1Gggq/NUD-M002.jpg', 'White T-shirt with NU Dasma Logo', 29, 300.00, 'Available'),
('NUD-M00003', 'NU Dasma Hoodie', 'https://i.postimg.cc/brGYp19P/NUD-M003.jpg', 'Blue hoodie with NU Dasma embroidery', 20, 600.00, 'Available'),
('NUD-M00004', 'NU Dasma Cap', 'https://i.postimg.cc/DzFzLJnQ/NUD-M004.jpg', 'Blue Baseball cap', 40, 150.00, 'Available'),
('NUD-M00005', 'NU Dasma Tote Bag', 'https://i.postimg.cc/3wBxB8xs/NUD-M005.jpg', 'Eco-friendly tote bag with NU Dasma print', 50, 100.00, 'Available'),
('NUD-M00006', 'NU Dasma Lanyard', 'https://i.postimg.cc/LXQ4cxfv/NUD-M006.jpg', 'Lanyard with NU Dasma branding', 100, 50.00, 'Available'),
('NUD-M00007', 'NU Dasma Keychain', 'https://i.postimg.cc/vHgDsw0n/NUD-M007.jpg', 'Keychain with NU Dasma logo', 100, 30.00, 'Available'),
('NUD-M00008', 'NU Dasma Mug', 'https://i.postimg.cc/G3S9Vmxr/NUD-M008.jpg', 'White ceramic mug with NU Dasma logo', 30, 120.00, 'Available'),
('NUD-M00009', 'NU Dasma Notebook', 'https://i.postimg.cc/NFVMHdjL/NUD-M009.jpg', 'A5 notebook with NU Dasma cover', 40, 80.00, 'Available'),
('NUD-M00010', 'NU Dasma Umbrella', 'https://i.postimg.cc/25FVKd2X/NUD-M010.jpg', 'Foldable umbrella with NU Dasma branding', 15, 250.00, 'Available'),
('NUD-M00011', 'NU Dasma ID Holder', 'https://i.postimg.cc/T3byrvmx/NUD-M011.jpg', 'PU leather ID holder with NU Dasma print', 50, 60.00, 'Available'),
('NUD-M00012', 'NU Dasma Pen', 'https://i.postimg.cc/6QN8cbLv/NUD-M012.png', 'Blue ballpoint pen black ink', 200, 20.00, 'Available'),
('NUD-M00013', 'NU Dasma Water Bottle', 'https://i.postimg.cc/02bKywyb/NUD-M013.jpg', 'Stainless steel water bottle with NU Dasma logo', 30, 250.00, 'Available'),
('NUD-M00014', 'NU Dasma Phone Stand', 'https://i.postimg.cc/nVdQxkZy/NUD-M014.jpg', 'Adjustable phone stand', 20, 150.00, 'Available'),
('NUD-M00015', 'NU Dasma Wristband', 'https://i.postimg.cc/qqZtGkjJ/NUD-M015.jpg', 'Silicone wristband with NU Dasma print', 100, 20.00, 'Available'),
('NUD-M00016', 'NU Dasma Patch', 'https://i.postimg.cc/HnLc5J0v/NUD-M016.jpg', 'Embroidered patch with NU Dasma logo', 80, 40.00, 'Available'),
('NUD-M00017', 'NU Dasma Pin', 'https://i.postimg.cc/FsBcyxBy/NUD-M017.jpg', 'Enamel pin with NU Dasma crest', 60, 30.00, 'Available'),
('NUD-M00018', 'NU Dasma Blanket', 'https://i.postimg.cc/x1NmtbwW/NUD-M018.jpg', 'Soft blanket with NU Dasma embroidery', 10, 500.00, 'Available'),
('NUD-M00019', 'NU Dasma Flag', 'https://i.postimg.cc/m2DC1n8Z/NUD-M019.jpg', 'Flag with NU Dasma design', 15, 150.00, 'Available'),
('NUD-M00020', 'NU Dasma Sticker Pack', 'https://i.postimg.cc/9X1yM2PN/NUD-M020.png', 'Sticker pack with NU Dasma designs', 200, 30.00, 'Available'),
('NUD-M00021', 'NU Dasma Mouse Pad', 'https://i.postimg.cc/j2qNX3TX/NUD-M021.jpg', 'Blue mouse pad', 50, 100.00, 'Available'),
('NUD-M00022', 'NU Dasma Car Decal', 'https://i.postimg.cc/BvDxQ1Nx/NUD-M022.jpg', 'Car decal with NU Dasma logo', 80, 50.00, 'Available'),
('NUD-M00023', 'NU Dasma Face Mask', 'https://i.postimg.cc/DwSrHNXp/NUD-M023.jpg', 'Washable face mask with NU Dasma logo', 100, 60.00, 'Available'),
('NUD-M00024', 'NU Dasma Pillow', 'https://i.postimg.cc/SQGfMC4d/NUD-M024.jpg', 'Cushion pillow with NU Dasma print', 20, 350.00, 'Available'),
('NUD-M00025', 'NU Dasma Bomber Jacket', 'https://i.postimg.cc/2yTdNRGM/NUD-M025.jpg', 'Bomber Jacket with NU Dasma branding', 10, 800.00, 'Available'),
('NUD-M00026', 'NU Dasma Socks', 'https://i.postimg.cc/vZCrsv7Y/NUD-M026.png', 'Pair of socks with NU Dasma logo', 50, 100.00, 'Available'),
('NUD-M00027', 'NU Dasma Laptop Sleeve', 'https://i.postimg.cc/SNDdw8tR/NUD-M027.jpg', 'Blue laptop ', 15, 350.00, 'Available'),
('NUD-M00028', 'NU Dasma Calendar', 'https://i.postimg.cc/kX1NjCBt/NUD-M028.png', '2024 calendar with NU Dasma landmarks', 40, 150.00, 'Available'),
('NUD-M00029', 'NU Dasma Card Holder', 'https://i.postimg.cc/xdbPJZjN/NUD-M029.jpg', 'Blue card holder with gold polkadots ', 30, 250.00, 'Available'),
('NUD-M00030', 'NU Dasma Wall Clock', 'https://i.postimg.cc/L85DRXrT/NUD-M030.jpg', 'Blue wall clock with gold outlines', 10, 400.00, 'Available'),
('NUD-M00031', 'Cat', 'https://i.postimg.cc/zGXJyCJT/cat.jpg', 'White - with SunGlasses', 10, 100.00, 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_likes`
--

CREATE TABLE `tbl_likes` (
  `like_id` int(11) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_messages`
--

CREATE TABLE `tbl_messages` (
  `message_id` int(11) NOT NULL,
  `reciever_id` varchar(25) DEFAULT NULL,
  `message` text NOT NULL,
  `sent_date` datetime NOT NULL,
  `sender_id` varchar(25) DEFAULT NULL COMMENT 'Staff member who sent the message'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification_preferences`
--

CREATE TABLE `tbl_notification_preferences` (
  `preference_id` int(11) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `item_id` varchar(25) DEFAULT NULL,
  `notify_on_restock` tinyint(1) DEFAULT 0 COMMENT 'True if user wants to receive restock notifications',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nudhub_feedback`
--

CREATE TABLE `tbl_nudhub_feedback` (
  `feedback_id` int(11) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `program` varchar(45) DEFAULT NULL,
  `year_level` varchar(45) DEFAULT NULL,
  `section` varchar(45) DEFAULT NULL,
  `response` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_policy`
--

CREATE TABLE `tbl_policy` (
  `policy_id` int(11) NOT NULL,
  `time_of_incident` time DEFAULT NULL,
  `location_of_incident` varchar(50) DEFAULT NULL,
  `contacts` int(11) DEFAULT NULL,
  `name_of_students` varchar(255) DEFAULT NULL,
  `name_of_students_involve` varchar(255) DEFAULT NULL,
  `incident_report` text DEFAULT NULL,
  `type_of_incident` enum('Damage to Property','Health and Safety','Lost or Misplaced Items','Inappropriate Behaviour') DEFAULT NULL,
  `admin_incharge` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_posts`
--

CREATE TABLE `tbl_posts` (
  `post_id` int(11) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_review`
--

CREATE TABLE `tbl_product_review` (
  `review_id` int(11) NOT NULL,
  `sender_id` varchar(25) DEFAULT NULL,
  `to_review` varchar(25) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_purchase_history`
--

CREATE TABLE `tbl_purchase_history` (
  `purchase_id` varchar(25) NOT NULL,
  `reservation_id` varchar(25) DEFAULT 'None',
  `user_id` varchar(25) DEFAULT NULL,
  `item_id` varchar(25) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `quantity_purchased` int(11) NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  `sold_by` varchar(25) DEFAULT NULL COMMENT 'Staff member who sold the product',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reservations`
--

CREATE TABLE `tbl_reservations` (
  `reservation_id` varchar(20) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL,
  `item_id` varchar(25) NOT NULL,
  `reservation_date_start` date NOT NULL,
  `reservation_date_end` date NOT NULL,
  `quantity_reserved` int(11) NOT NULL,
  `status` enum('Cancelled','Reserved','Purchased','Expired') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_resources`
--

CREATE TABLE `tbl_resources` (
  `resources_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `availability` enum('Available','Reserved') DEFAULT 'Available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stock_change`
--

CREATE TABLE `tbl_stock_change` (
  `change_id` varchar(25) NOT NULL,
  `item_id` varchar(25) NOT NULL,
  `user_id` varchar(25) DEFAULT NULL COMMENT 'Staff member who changed the stock',
  `quantity_before` int(11) NOT NULL,
  `quantity_added` int(11) DEFAULT NULL,
  `quantity_subtracted` int(11) DEFAULT NULL,
  `quantity_current` int(11) NOT NULL,
  `note` varchar(255) DEFAULT NULL COMMENT 'Additional details or reason for stock change',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `user_id` varchar(25) NOT NULL,
  `nu_given_identifier` varchar(15) DEFAULT NULL,
  `f_name` varchar(20) NOT NULL,
  `m_name` varchar(20) DEFAULT NULL,
  `l_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `access_id` int(11) NOT NULL DEFAULT 1,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL COMMENT 'eg., Male, Female, Non-Binary, etc.',
  `address` text DEFAULT NULL COMMENT 'Full address for users',
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_venue`
--

CREATE TABLE `tbl_venue` (
  `venue_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `availability` enum('Available','Occupied') DEFAULT 'Available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_venue_bookings`
--

CREATE TABLE `tbl_venue_bookings` (
  `booking_id` int(11) NOT NULL,
  `event_id` int(11) DEFAULT NULL,
  `venue_id` int(11) DEFAULT NULL,
  `resource_id` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `status` enum('Booked','Available','Cancelled') DEFAULT 'Booked',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_access`
--
ALTER TABLE `tbl_access`
  ADD PRIMARY KEY (`access_id`);

--
-- Indexes for table `tbl_admin_panel`
--
ALTER TABLE `tbl_admin_panel`
  ADD PRIMARY KEY (`panel_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD PRIMARY KEY (`announcement_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  ADD PRIMARY KEY (`calendar_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `tbl_events`
--
ALTER TABLE `tbl_events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_type` (`event_type`);

--
-- Indexes for table `tbl_event_type`
--
ALTER TABLE `tbl_event_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `tbl_faqs`
--
ALTER TABLE `tbl_faqs`
  ADD PRIMARY KEY (`faq_id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_inventory_items`
--
ALTER TABLE `tbl_inventory_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `reciever_id` (`reciever_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `tbl_notification_preferences`
--
ALTER TABLE `tbl_notification_preferences`
  ADD PRIMARY KEY (`preference_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tbl_nudhub_feedback`
--
ALTER TABLE `tbl_nudhub_feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_policy`
--
ALTER TABLE `tbl_policy`
  ADD PRIMARY KEY (`policy_id`),
  ADD KEY `admin_incharge` (`admin_incharge`);

--
-- Indexes for table `tbl_posts`
--
ALTER TABLE `tbl_posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_product_review`
--
ALTER TABLE `tbl_product_review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `to_review` (`to_review`);

--
-- Indexes for table `tbl_purchase_history`
--
ALTER TABLE `tbl_purchase_history`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tbl_reservations`
--
ALTER TABLE `tbl_reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tbl_resources`
--
ALTER TABLE `tbl_resources`
  ADD PRIMARY KEY (`resources_id`);

--
-- Indexes for table `tbl_stock_change`
--
ALTER TABLE `tbl_stock_change`
  ADD PRIMARY KEY (`change_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `access_id` (`access_id`);

--
-- Indexes for table `tbl_venue`
--
ALTER TABLE `tbl_venue`
  ADD PRIMARY KEY (`venue_id`);

--
-- Indexes for table `tbl_venue_bookings`
--
ALTER TABLE `tbl_venue_bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `resource_id` (`resource_id`),
  ADD KEY `venue_id` (`venue_id`),
  ADD KEY `event_id` (`event_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_admin_panel`
--
ALTER TABLE `tbl_admin_panel`
  MODIFY `panel_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  MODIFY `calendar_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_events`
--
ALTER TABLE `tbl_events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_event_type`
--
ALTER TABLE `tbl_event_type`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_notification_preferences`
--
ALTER TABLE `tbl_notification_preferences`
  MODIFY `preference_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_nudhub_feedback`
--
ALTER TABLE `tbl_nudhub_feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_policy`
--
ALTER TABLE `tbl_policy`
  MODIFY `policy_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_posts`
--
ALTER TABLE `tbl_posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_product_review`
--
ALTER TABLE `tbl_product_review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_resources`
--
ALTER TABLE `tbl_resources`
  MODIFY `resources_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_venue`
--
ALTER TABLE `tbl_venue`
  MODIFY `venue_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_venue_bookings`
--
ALTER TABLE `tbl_venue_bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_admin_panel`
--
ALTER TABLE `tbl_admin_panel`
  ADD CONSTRAINT `tbl_admin_panel_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `tbl_posts` (`post_id`);

--
-- Constraints for table `tbl_announcement`
--
ALTER TABLE `tbl_announcement`
  ADD CONSTRAINT `tbl_announcement_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_calendar`
--
ALTER TABLE `tbl_calendar`
  ADD CONSTRAINT `tbl_calendar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_comments`
--
ALTER TABLE `tbl_comments`
  ADD CONSTRAINT `tbl_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `tbl_posts` (`post_id`);

--
-- Constraints for table `tbl_events`
--
ALTER TABLE `tbl_events`
  ADD CONSTRAINT `tbl_events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_events_ibfk_2` FOREIGN KEY (`event_type`) REFERENCES `tbl_event_type` (`type_id`);

--
-- Constraints for table `tbl_faqs`
--
ALTER TABLE `tbl_faqs`
  ADD CONSTRAINT `tbl_faqs_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_feedback`
--
ALTER TABLE `tbl_feedback`
  ADD CONSTRAINT `tbl_feedback_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `tbl_events` (`event_id`),
  ADD CONSTRAINT `tbl_feedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_likes`
--
ALTER TABLE `tbl_likes`
  ADD CONSTRAINT `tbl_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `tbl_posts` (`post_id`);

--
-- Constraints for table `tbl_messages`
--
ALTER TABLE `tbl_messages`
  ADD CONSTRAINT `tbl_messages_ibfk_1` FOREIGN KEY (`reciever_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_notification_preferences`
--
ALTER TABLE `tbl_notification_preferences`
  ADD CONSTRAINT `tbl_notification_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_notification_preferences_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory_items` (`item_id`);

--
-- Constraints for table `tbl_nudhub_feedback`
--
ALTER TABLE `tbl_nudhub_feedback`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_policy`
--
ALTER TABLE `tbl_policy`
  ADD CONSTRAINT `tbl_policy_ibfk_1` FOREIGN KEY (`admin_incharge`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_posts`
--
ALTER TABLE `tbl_posts`
  ADD CONSTRAINT `tbl_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`);

--
-- Constraints for table `tbl_product_review`
--
ALTER TABLE `tbl_product_review`
  ADD CONSTRAINT `tbl_product_review_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_product_review_ibfk_2` FOREIGN KEY (`to_review`) REFERENCES `tbl_inventory_items` (`item_id`);

--
-- Constraints for table `tbl_purchase_history`
--
ALTER TABLE `tbl_purchase_history`
  ADD CONSTRAINT `tbl_purchase_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_purchase_history_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory_items` (`item_id`);

--
-- Constraints for table `tbl_reservations`
--
ALTER TABLE `tbl_reservations`
  ADD CONSTRAINT `tbl_reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_reservations_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory_items` (`item_id`);

--
-- Constraints for table `tbl_stock_change`
--
ALTER TABLE `tbl_stock_change`
  ADD CONSTRAINT `tbl_stock_change_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`user_id`),
  ADD CONSTRAINT `tbl_stock_change_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory_items` (`item_id`);

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_ibfk_1` FOREIGN KEY (`access_id`) REFERENCES `tbl_access` (`access_id`);

--
-- Constraints for table `tbl_venue_bookings`
--
ALTER TABLE `tbl_venue_bookings`
  ADD CONSTRAINT `tbl_venue_bookings_ibfk_1` FOREIGN KEY (`resource_id`) REFERENCES `tbl_resources` (`resources_id`),
  ADD CONSTRAINT `tbl_venue_bookings_ibfk_2` FOREIGN KEY (`venue_id`) REFERENCES `tbl_venue` (`venue_id`),
  ADD CONSTRAINT `tbl_venue_bookings_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `tbl_events` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
