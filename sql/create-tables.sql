create database simple_ecommerce;

use simple_ecommerce;

drop table if exists `products`;
drop table if exists `users`;
drop table if exists `items`;
drop table if exists `cart`;

-- Create the Users table
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50)
);

-- Create the Products table
CREATE TABLE `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `image_path` VARCHAR(255),
    `amount_sold` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Cart table
CREATE TABLE `cart` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `total` INT,
    `user_id` INT UNIQUE,
    CONSTRAINT `fk_cart_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `users`(`id`)
        ON DELETE CASCADE
);

-- Create the Items table
CREATE TABLE `items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `quantity` INT,
    `total` INT,
    `status` ENUM('PENDING', 'PAID') NOT NULL,
    `product_id` INT,
    `cart_id` INT,
    CONSTRAINT `fk_items_product`
        FOREIGN KEY (`product_id`)
        REFERENCES `products`(`id`)
        ON DELETE CASCADE,
    CONSTRAINT `fk_items_cart`
        FOREIGN KEY (`cart_id`)
        REFERENCES `cart`(`id`)
        ON DELETE CASCADE
);

-- Insert Starter User Account
-- Admin
START TRANSACTION;

INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES ('admin', 'admin@example.com', '$2a$10$NS/53B3RFAziWVetUiwx6.WySC7JhiLxXZf7nXcz8oCYiFcHHoERO', 'admin');

SET @user_id = LAST_INSERT_ID();

INSERT INTO `cart` (`total`, `user_id`) VALUES (null, @user_id);

COMMIT;

-- User
START TRANSACTION;

INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES ('user', 'user@example.com', '$2a$10$mbwHU5upNyFAO718fzjryulYNV0HHPmjoD/u4zgiPs1Z.64AjtL6y', 'user');

SET @user_id = LAST_INSERT_ID();

INSERT INTO `cart` (`total`, `user_id`) VALUES (null, @user_id);

COMMIT;