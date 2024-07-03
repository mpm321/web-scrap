CREATE DATABASE web_scraper_db;

USE web_scraper_db;

CREATE TABLE companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    logo VARCHAR(255),
    facebook_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    instagram_url VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(100),
    screenshot_path VARCHAR(255)
);
