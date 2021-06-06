create database product_api_db;

use product_api_db;

CREATE TABLE `brand` (
     `brand_id` int NOT NULL AUTO_INCREMENT,
     `brand_name` varchar(20) NOT NULL,
     PRIMARY KEY (`brand_id`)
     UNIQUE KEY  (`brand_name`)
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

INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (1,'Maggie');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (2,'Nestle');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (3,'Cargill');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (4,'Coca-Cola');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (5,'KFC');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (6,'Eden');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (7,'Butterball');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (8,'Flora');
INSERT INTO `brand` (`brand_id`,`brand_name`) VALUES (9,'Barcel');
