-- Insert data into customers table
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Mohib', 'Waziri', 'mohib.waziri@example.com', 1);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Yuanyuan', 'Situ', 'yuanyuan.situ@example.com', 2);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Jorge', 'Salamanca', 'jorge.salamanca@example.com', 3);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Yevheniia', 'Horbachova', 'yevheniia.horbachova@example.com', 4);

-- Insert data into addresses table

INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (1, '789 Yonge St', 'Toronto', 'ON', 'M4W 2G8', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (2, '1010 Rue Sherbrooke O', 'Montreal', 'QC', 'H3A 2R7', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (3, '10355 Jasper Ave', 'Edmonton', 'AB', 'T5J 1Y6', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (4, '5670 Spring Garden Rd', 'Halifax', 'NS', 'B3J 1H6', 'Canada');

-- Insert data into categories table
INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Books');
INSERT INTO categories (name) VALUES ('Clothing');

-- Insert data into products table
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (1, 'GrapePhone X12', 'image1', 1000.00, 50, 'Introducing the all-new GrapePhone X12, a marvel of technology that is designed to enhance every moment of your day. Built with aerospace-grade aluminum and fronted by a stunning 6.7-inch Retina OLED display, the X12 offers a user experience that is second to none. ');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (2, 'How to Disappear Completely and Never Be Found', 'image2', 30.00, 100, 'This supposed handbook for those who really have something to hide features sections dedicated to procuring new identification papers, finding a job, “pseudocide,” and more, but it’s hard to take advice from an author who misspells “disappear” not once, but seven times.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (3, 'The Cloak of Invisibility', 'image3', 10000.00, 200, 'This Invisibility Cloak was the only known one that would not fade with age and would provide everlasting protection to the wearer, something no normal Invisibility Cloak could provide.');

-- Insert data into cart table
INSERT INTO cart (customer_id) VALUES (1);
INSERT INTO cart (customer_id) VALUES (2);
INSERT INTO cart (customer_id) VALUES (3);
INSERT INTO cart (customer_id) VALUES (4);

-- Insert data into cart_items table
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (1, 1, 1, 1000.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (3, 2, 2, 60.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (2, 3, 1, 10000.00);

-- Insert data into orders table
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (1, '2023-08-27', 1000.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (3, '2022-01-01', 60.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (2, '1980-07-31', 10000.00);

-- Insert data into order_items table
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (1, 1, 1, 1000.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (2, 2, 2, 60.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (3, 3, 1, 10000.00);

-- Insert data into wishlist table
INSERT INTO wishlist (customer_id) VALUES (1);
INSERT INTO wishlist (customer_id) VALUES (2);
INSERT INTO wishlist (customer_id) VALUES (3);
INSERT INTO wishlist (customer_id) VALUES (4);

-- Insert data into wishlist_items table
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (1, 2);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (3, 1);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (4, 1);

-- Insert data into feedbacks table
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (1, 1, 5, 'GrapePhone, great phone!');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (3, 2, 4, 'User not found..');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (2, 3, 1, 'It is fake!');

-- Insert data into admin table
INSERT INTO admin (first_name, last_name, email, sub_id) VALUES ('Admin', 'One', 'admin1@example.com', 1);
INSERT INTO admin (first_name, last_name, email, sub_id) VALUES ('Admin', 'Two', 'admin2@example.com', 2);
INSERT INTO admin (first_name, last_name, email, sub_id) VALUES ('Admin', 'Three', 'admin3@example.com', 3);

-- Insert data into voice_queries table
INSERT INTO voice_queries (customer_id, query_text, response_text) VALUES (1, 'Can you recommend the newest phone?', 'GrapePhone X12.');
INSERT INTO voice_queries (customer_id, query_text, response_text) VALUES (1, 'Do you have any books for learning how to pack my bag? ', '《How to Disappear Completely and Never Be Found》');
INSERT INTO voice_queries (customer_id, query_text, response_text) VALUES (1, 'Do you have the Cloak of Invisibility, one of the Deathly Hallows?', 'Yes, [link].');