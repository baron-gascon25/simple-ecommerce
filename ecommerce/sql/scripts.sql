#create database simple_ecommerce;

use simple_ecommerce;


drop table if exists `products`;
drop table if exists `users`;
drop table if exists `items`;
drop table if exists `cart`;

CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50)
);

-- Create the Product table
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
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
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

-- ALTER TABLE `cart`
-- ADD CONSTRAINT `unique_cart_user` UNIQUE (`user_id`);

-- ALTER TABLE `products`
-- ADD COLUMN `type` VARCHAR(255) NOT NULL;

UPDATE `products`
SET `amount_sold`=15
WHERE `id`=9;

