create database product_api_db;

CREATE TABLE `brand` (
     `brand_id` int NOT NULL AUTO_INCREMENT,
     `brand_name` varchar(20) NOT NULL,
     PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product` (
    `product_id` int NOT NULL AUTO_INCREMENT,
    `product_slug` varchar(20) NOT NULL,
    `product_name` varchar(25) NOT NULL,
    `sku` varchar(20) DEFAULT NULL,
    `brand_id` int NOT NULL,
    PRIMARY KEY (`product_id`),
    UNIQUE KEY (`product_slug`),
    FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;



