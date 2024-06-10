#create database simple_ecommerce;

use simple_ecommerce;

drop table if exists `users`;
drop table if exists `product`;

CREATE TABLE `users` (
	`user_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(500) NOT NULL,
    `role` varchar(100) NOT NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `products` (
	`product_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `price` int NOT NULL,
    `image_data` blob,
    PRIMARY KEY (`product_id`)
);

