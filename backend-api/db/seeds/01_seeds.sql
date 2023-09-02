-- Insert data into customers table
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Mohib', 'Waziri', 'mohib.waziri@example.com', 1);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Yuanyuan', 'Situ', 'yuanyuan.situ@example.com', 2);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Jorge', 'Salamanca', 'jorge.salamanca@example.com', 3);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Yevheniia', 'Horbachova', 'yevheniia.horbachova@example.com', 4);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('John', 'Doe', 'john.doe@example.com', 5);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Jane', 'Smith', 'jane.smith@example.com', 6);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Alice', 'Johnson', 'alice.johnson@example.com', 7);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Bob', 'Brown', 'bob.brown@example.com', 8);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Emily', 'Davis', 'emily.davis@example.com', 9);
INSERT INTO customers (first_name, last_name, email, sub_id) VALUES ('Michael', 'Wilson', 'michael.wilson@example.com', 10);


-- Insert data into addresses table

INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (1, '789 Yonge St', 'Toronto', 'ON', 'M4W 2G8', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (2, '1010 Rue Sherbrooke O', 'Montreal', 'QC', 'H3A 2R7', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (3, '10355 Jasper Ave', 'Edmonton', 'AB', 'T5J 1Y6', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (4, '5670 Spring Garden Rd', 'Halifax', 'NS', 'B3J 1H6', 'Canada');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (5, '123 Elm St', 'Los Angeles', 'CA', '90001', 'USA');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (6, '456 Oak Ave', 'New York', 'NY', '10001', 'USA');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (7, '789 Maple Rd', 'Chicago', 'IL', '60601', 'USA');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (8, '101 Pine Ln', 'Houston', 'TX', '77001', 'USA');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (9, '234 Cedar Dr', 'San Francisco', 'CA', '94101', 'USA');
INSERT INTO addresses (customer_id, street, city, province, postal_code, country) VALUES (10, '567 Birch Blvd', 'Miami', 'FL', '33101', 'USA');


-- Insert data into categories table
INSERT INTO categories (name) VALUES ('Electronics');
INSERT INTO categories (name) VALUES ('Books');
INSERT INTO categories (name) VALUES ('Clothing');
INSERT INTO categories (name) VALUES ('Toys');
INSERT INTO categories (name) VALUES ('Home Decor');
INSERT INTO categories (name) VALUES ('Jewelry');
INSERT INTO categories (name) VALUES ('Beauty');

-- Insert data into products table
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (1, 'GrapePhone X12', 'image1', 1000.00, 50, 'Introducing the all-new GrapePhone X12, a marvel of technology that is designed to enhance every moment of your day. Built with aerospace-grade aluminum and fronted by a stunning 6.7-inch Retina OLED display, the X12 offers a user experience that is second to none. ');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (2, 'How to Disappear Completely and Never Be Found', 'image2', 30.00, 100, 'This supposed handbook for those who really have something to hide features sections dedicated to procuring new identification papers, finding a job, “pseudocide,” and more, but it’s hard to take advice from an author who misspells “disappear” not once, but seven times.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (3, 'The Cloak of Invisibility', 'image3', 10000.00, 200, 'This Invisibility Cloak was the only known one that would not fade with age and would provide everlasting protection to the wearer, something no normal Invisibility Cloak could provide.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (4, 'Luxury Perfume', 'image4', 150.00, 20, 'Indulge in the exquisite scent of this luxury perfume, designed to make you feel like royalty.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (3, 'Diamond Pendant Necklace', 'image5', 5000.00, 10, 'Adorn yourself with the timeless elegance of this diamond pendant necklace.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (2, 'Handcrafted Ceramic Vase', 'image6', 75.00, 30, 'Add a touch of artistry to your home with this beautifully handcrafted ceramic vase.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (1, 'Remote Control Car', 'image7', 50.00, 15, 'Have endless fun with this high-speed remote control car, perfect for all ages.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (4, 'Luxury Skincare Set', 'image8', 200.00, 25, 'Experience the ultimate in skincare luxury with this comprehensive skincare set.');
INSERT INTO products (category_id, name, image, price, stock_quantity, description) VALUES (3, 'Sapphire and Diamond Ring', 'image9', 7500.00, 5, 'Make a statement with this stunning sapphire and diamond ring, a true masterpiece.');

-- Insert data into cart table
INSERT INTO cart (customer_id) VALUES (1);
INSERT INTO cart (customer_id) VALUES (2);
INSERT INTO cart (customer_id) VALUES (3);
INSERT INTO cart (customer_id) VALUES (4);
INSERT INTO cart (customer_id) VALUES (5);
INSERT INTO cart (customer_id) VALUES (6);
INSERT INTO cart (customer_id) VALUES (7);
INSERT INTO cart (customer_id) VALUES (8);
INSERT INTO cart (customer_id) VALUES (9);


-- Insert data into cart_items table
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (1, 1, 1, 1000.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (3, 2, 2, 60.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (2, 3, 1, 10000.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (5, 7, 2, 100.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (6, 8, 1, 5000.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (7, 9, 3, 60.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (8, 3, 2, 150.00);
INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (9, 7, 1, 200.00);


-- Insert data into orders table
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (1, '2023-08-27', 1000.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (3, '2022-01-01', 60.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (2, '1980-07-31', 10000.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (5, '2023-08-28', 400.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (7, '2023-02-15', 6000.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (6, '2022-12-10', 180.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (8, '2023-07-05', 300.00);
INSERT INTO orders (customer_id, order_date, total_amount) VALUES (9, '2023-06-20', 2000.00);


-- Insert data into order_items table
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (1, 1, 1, 1000.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (2, 2, 2, 60.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (3, 3, 1, 10000.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (4, 7, 2, 200.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (5, 8, 1, 5000.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (6, 9, 3, 180.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (7, 7, 2, 300.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (8, 3, 1, 2000.00);


-- Insert data into wishlist table
INSERT INTO wishlist (customer_id) VALUES (1);
INSERT INTO wishlist (customer_id) VALUES (2);
INSERT INTO wishlist (customer_id) VALUES (3);
INSERT INTO wishlist (customer_id) VALUES (4);
INSERT INTO wishlist (customer_id) VALUES (5);
INSERT INTO wishlist (customer_id) VALUES (6);
INSERT INTO wishlist (customer_id) VALUES (7);
INSERT INTO wishlist (customer_id) VALUES (8);
INSERT INTO wishlist (customer_id) VALUES (9);


-- Insert data into wishlist_items table
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (1, 2);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (2, 1);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (3, 1);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (4, 4);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (5, 5);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (6, 6);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (7, 7);
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (8, 8);

-- Insert data into feedbacks table
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (1, 1, 5, 'GrapePhone, great phone!');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (3, 2, 4, 'User not found..');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (2, 3, 1, 'It is fake!');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (5, 4, 5, 'The perfume is divine!');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (7, 5, 4, 'Beautiful necklace, great quality.');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (6, 6, 5, 'I love the ceramic vase, its a work of art!');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (8, 7, 3, 'The remote control car is fun, but the batteries run out quickly.');
INSERT INTO feedbacks (customer_id, product_id, rating, comment) VALUES (9, 8, 4, 'The skincare set has done wonders for my skin.');


-- Insert data into admin table
INSERT INTO admin (first_name, last_name, email, sub_id) VALUES ('Admin', 'One', 'admin1@example.com', 'Zy12Xw34AbCD56Ef789G');
INSERT INTO admin (first_name, last_name, email, sub_id) VALUES ('Admin', 'Two', 'admin2@example.com', 'Hi01Jk23LMn45OpQR678');
INSERT INTO admin (first_name, last_name, email, sub_id) VALUES ('Admin', 'Three', 'admin3@example.com', 'ST90Uv12WX34YZ56abCD3');

-- Insert data into voice_queries table
INSERT INTO voice_queries (customer_id, query_text, response_text) VALUES (1, 'Can you recommend the newest phone?', 'GrapePhone X12.');
INSERT INTO voice_queries (customer_id, query_text, response_text) VALUES (1, 'Do you have any books for learning how to pack my bag? ', '《How to Disappear Completely and Never Be Found》');
INSERT INTO voice_queries (customer_id, query_text, response_text) VALUES (1, 'Do you have the Cloak of Invisibility, one of the Deathly Hallows?', 'Yes, [link].');