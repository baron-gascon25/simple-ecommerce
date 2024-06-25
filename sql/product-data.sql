-- Will not work unless you have the images and their corresponding filenames stored in the src/main/resources/static/images directory

-- Mouse Products
INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('Razer DeathAdder Essential Gaming Mouse', 29, 'MOUSE', '104b0178-5125-4917-b099-2e7082fe0655_Razer-deathadder.jpg', 16, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 3 DAY), '%Y-%m-%d 23:01:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('HyperX Pulsefire Raid Gaming Mouse', 85, 'MOUSE', '8770a049-ec17-471a-82c7-0a43cdb113c1_images.jpg', 11, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 2 DAY), '%Y-%m-%d 16:32:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('Logitech Pro HERO Gaming Mouse', 68, 'MOUSE', '32c5ce9b-af60-4e8d-83c5-85118bb8054c_N169859_0.jpg', 1, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY), '%Y-%m-%d 12:59:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('SteelSeries Rival 3 Wired Gaming Mouse', 45, 'MOUSE', 'd3fff04c-6a36-4f67-88e7-8dd5bb9e96c2_steelseries-rival-3-1.jpg', 0, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 5 DAY), '%Y-%m-%d 09:12:00'));

-- Keyboard Products
INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`)
VALUES ('HyperX Alloy FPS Pro Mechanical Gaming Keyboard', 150, 'KEYBOARD', 'fcb552a6-7941-414b-9f01-73b64f0459b9_HyperX-Alloy-FPS-Pro-Feature-Image-1200x630-cropped.jpg', 12, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 4 DAY), '%Y-%m-%d 02:15:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('Razer BlackWidow V3 Mini Hyperspeed', 105, 'KEYBOARD', '2d1f5a6a-0c77-4376-8f59-02673e3f8f7f_241638116.jpg', 5, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 12 DAY), '%Y-%m-%d 07:45:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('HyperX Alloy Elite 2 Mechanical Gaming Keyboard', 110, 'KEYBOARD', 'd16ce697-0a41-4a87-a409-7995fec73e4c_vloBrBqUAsbXZvUi.jpg', 5, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 10 DAY), '%Y-%m-%d 10:45:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('Logitech G PRO Mechanical Gaming Keyboard - League of Legends Edition', 145, 'KEYBOARD', 'bcfbcaa9-4904-4c13-9c2d-64f8e6c9a6bf_s-l1600.jpg', 3, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 2 DAY), '%Y-%m-%d 11:15:00'));

-- Headset Products
INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('Logitech G733 Lightspeed Wireless RGB Gaming Headset', 92, 'HEADSET', 'acdc6b1b-4c66-4307-98ce-72f755011881_Logitech_G733_Blu-1__92732.jpg', 10, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 3 DAY), '%Y-%m-%d 20:40:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('Razer Kraken V3 Pro HyperSense Wireless Gaming Headset', 68, 'HEADSET', '0d23d5c4-189a-4641-beef-adc364d60e07_71rxPYrICuLQL80_.jpg', 9, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 5 DAY), '%Y-%m-%d 21:45:00'));

INSERT INTO `products` (`name`, `price`, `type`, `image_path`, `amount_sold`, `created_at`) VALUES ('HyperX Cloud Stinger Gaming Headset', 87, 'HEADSET', '2eb8913b-ff5a-4df8-a15e-8f059160c1fb_61bVcEoMx3L._AC_UF1000,1000_QL80_.jpg', 2, DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY), '%Y-%m-%d 22:55:00'));