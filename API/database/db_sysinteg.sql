DROP DATABASE IF EXISTS db_sysinteg;
CREATE DATABASE db_sysinteg;
USE db_sysinteg;

CREATE TABLE `tbl_access` (
  access_id int PRIMARY KEY,
  access_category varchar(10),
  descripton varchar(50)
);

CREATE TABLE `tbl_users` (
  `user_id` varchar(15) PRIMARY KEY,
  `nu_given_identifier` varchar(15) NOT NULL COMMENT'2021-170017',
  `f_name` varchar(20) NOT NULL,
  `m_name` varchar(20),
  `l_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `access_id` int,
  `date_of_birth` date NOT NULL,
  `gender` varchar(20) COMMENT 'eg., Male, Female, Non-Binary, etc.',
  `address` text NOT NULL COMMENT 'Full address for users',
  `profile_picture` varchar(255),
  `created_at` datetime COMMENT'now()',
   FOREIGN KEY (access_id) REFERENCES tbl_access(access_id)
);

-- stock nyu

CREATE TABLE `tbl_inventory_items` (
  `item_id` varchar(25) PRIMARY KEY COMMENT 'eg., TSH001-M, TUMB001-100ML',
  `item_name` varchar(50) NOT NULL,
  `item_image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `reservation_price_perday` decimal(10,2) NOT NULL,
  `status` enum('Available','Out Of Stock')
);

CREATE TABLE `tbl_reservations` (
  `reservation_id` varchar(20) PRIMARY KEY,
  `user_id` varchar(15),
  `item_id` varchar(25) NOT NULL,
  `reservation_date_start` date NOT NULL,
  `reservation_date_end` date NOT NULL,
  `quantity_reserved` int NOT NULL,
  `total_reservation_price` decimal NOT NULL,
  `status` ENUM('Cancelled','Reserved'),
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (item_id) REFERENCES tbl_inventory_items(item_id)
);

CREATE TABLE `tbl_messages` (
  `message_id` int PRIMARY KEY AUTO_INCREMENT,
  `reciever_id` varchar(15),
  `message` text NOT NULL,
  `sent_date` datetime NOT NULL,
  `sender_id` varchar(15) COMMENT 'Staff member who sent the message',
  FOREIGN KEY (reciever_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (sender_id) REFERENCES tbl_users(user_id)
);

CREATE TABLE `tbl_purchase_history` (
  `purchase_id` varchar(25) PRIMARY KEY,
  `reservation_id` varchar(25) DEFAULT 'None',
  `user_id` varchar(15),
  `item_id` varchar(25) NOT NULL,
  `purchase_date` datetime NOT NULL,
  `quantity_purchased` int NOT NULL,
  `total_price` decimal NOT NULL,
  `sold_by` varchar(25) COMMENT 'Staff member who sold the product',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (item_id) REFERENCES tbl_inventory_items(item_id)
);

CREATE TABLE `tbl_stock_change` (
  `change_id` varchar(25) PRIMARY KEY,
  `item_id` varchar(25) NOT NULL,
  `user_id` varchar(15) COMMENT 'Staff member who changed the stock',
  `quantity` int NOT NULL,
  `note` varchar(255) COMMENT 'Additional details or reason for stock change',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (item_id) REFERENCES tbl_inventory_items(item_id)
);

CREATE TABLE `tbl_faqs` (
  `faq_id` int PRIMARY KEY,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `created_by` varchar(25) COMMENT 'Staff member who added the FAQ',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES tbl_users(user_id)
);

CREATE TABLE `tbl_announcement` (
  `announcement_id` int PRIMARY KEY,
  `annoucement_text` varchar(255) NOT NULL,
  `annoucement_imf` varchar(255),
  `created_by` varchar(255) COMMENT 'Staff member who created the annoucement',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES tbl_users(user_id)
);

CREATE TABLE `tbl_notification_preferences` (
  `preference_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(15),
  `item_id` varchar(25),
  `notify_on_restock` boolean DEFAULT false COMMENT 'True if user wants to receive restock notifications',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (item_id) REFERENCES tbl_inventory_items(item_id)
);


CREATE TABLE `tbl_posts` (
  `post_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(15),
  `title` varchar(100),
  `content` text,
  `category` varchar(50),
  `image` varchar(255),
  `date` date,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
);

CREATE TABLE `tbl_comments` (
  `comment_id` int PRIMARY KEY AUTO_INCREMENT,
  `post_id` int,
  `user_id` varchar(15),
  `comment` text,
  `date` date,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (post_id) REFERENCES tbl_posts(post_id)
);

CREATE TABLE `tbl_likes` (
  `like_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(15),
  `post_id` int,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (post_id) REFERENCES tbl_posts(post_id)
);

CREATE TABLE `tbl_admin_panel` (
  `panel_id` int PRIMARY KEY AUTO_INCREMENT,
  `post_id` int,
  `status` enum('Resolved', 'Pending'),
  FOREIGN KEY (post_id) REFERENCES tbl_posts(post_id)
);

-- events

CREATE TABLE `tbl_resources` (
  `resources_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `description` text,  
  `quantity` int,
  `availability` ENUM('Available', 'Reserved') DEFAULT 'Available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `tbl_venue` (
  `venue_id` int PRIMARY KEY AUTO_INCREMENT ,
  `name` varchar(50),
  `availability` ENUM('Available', 'Occupied') DEFAULT 'Available', 
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `tbl_event_type` (
  `type_id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `tbl_policy` (
  `policy_id` int PRIMARY KEY AUTO_INCREMENT,
  `time_of_incident` time,
  `location_of_incident` varchar(50),
  `contacts` int,
  `name_of_students` varchar(255),
  `name_of_students_involve` varchar(255),
  `incident_report` text,
  `type_of_incident` enum('Damage to Property', 'Health and Safety','Lost or Misplaced Items','Inappropriate Behaviour'),
  `admin_incharge` varchar(15),
  FOREIGN KEY (admin_incharge) REFERENCES tbl_users(user_id)
);

CREATE TABLE `tbl_events` (
  `event_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` varchar(15),
  `title` varchar(100),
  `description` text,  
  `start_date` date,
  `end_date` date,
  `venue_id` int,
  `event_type` int,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES tbl_users(user_id),
  FOREIGN KEY (venue_id) REFERENCES tbl_venue(venue_id),
  FOREIGN KEY (event_type) REFERENCES tbl_event_type(type_id)
);

CREATE TABLE `tbl_venue_bookings` (
  `booking_id` int PRIMARY KEY AUTO_INCREMENT,
  `event_id` int,
  `venue_id` int,
  `resource_id` int,
  `start_date` datetime,
  `end_date` datetime,
  `status` enum('Booked', 'Available', 'Cancelled') DEFAULT 'Booked',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP , 
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  FOREIGN KEY (resource_id) REFERENCES tbl_resources(resources_id),
  FOREIGN KEY (venue_id) REFERENCES tbl_venue(venue_id),
  FOREIGN KEY (event_id) REFERENCES tbl_events(event_id)
);

CREATE TABLE tbl_calendar (
    calendar_id INT PRIMARY KEY AUTO_INCREMENT,
    calendar_type VARCHAR(100), 
    external_event_id VARCHAR(20), 
    user_id varchar(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
);

CREATE TABLE tbl_feedback (
    feedback_id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT, 
    user_id varchar(15), 
    comments TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES tbl_events(event_id),
    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
);

-- nud hub

CREATE TABLE tbl_product_review(
    review_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id varchar(15),
    to_review varchar(25),
    comments TEXT,
    rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES tbl_users(user_id),
    FOREIGN KEY (to_review) REFERENCES tbl_inventory_items(item_id)
);

--  DATA 

INSERT INTO tbl_access(access_id, access_category, descripton) VALUES
(1,"Fufa","Fufa");

INSERT INTO tbl_users
(user_id, 
nu_given_identifier, 
f_name, 
m_name, 
l_name, 
email, 
password, 
access_id, 
date_of_birth, 
gender, address, 
profile_picture, 
created_at)
VALUES(
"USR01",
"BTK20105",
"Ruro",
"Ruroa",
"Mikenai",
"RuroMiken@gmail.com",
"passwordmoto",
1,
"2000-01-01",
"Male",
"Basta nakatira kahit saan",
"pektur mo to",
"2024-01-01 10:00:00");