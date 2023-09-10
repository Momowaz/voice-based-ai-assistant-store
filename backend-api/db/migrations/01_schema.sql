DROP TABLE IF EXISTS wishlist_items CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS cart CASCADE;
DROP TABLE IF EXISTS voice_queries CASCADE;
DROP TABLE IF EXISTS feedbacks CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS payments CASCADE;


-- Creating the customers table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255),
  sub_id VARCHAR(255)
);

-- Creating the addresses table
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  street VARCHAR(100),
  city VARCHAR(50),
  province VARCHAR(50),
  postal_code VARCHAR(10),
  country VARCHAR(100)
);

-- Creating the categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

-- Creating the products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  name VARCHAR(255),
  image VARCHAR(255),
  price NUMERIC(10, 2),
  stock_quantity INT,
  description TEXT
);

-- Creating the cart table
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id) UNIQUE
);

-- Creating the cart_items table
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES cart(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  price NUMERIC(10, 2)
);

-- Creating the orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  order_date DATE,
  total_amount NUMERIC(10, 2)
);

-- Creating the order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  price NUMERIC(10, 2)
);

-- Creating the wishlist table
CREATE TABLE wishlist (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id)
);

-- Creating the wishlist_items table
CREATE TABLE wishlist_items (
  id SERIAL PRIMARY KEY,
  wishlist_id INT REFERENCES wishlist(id),
  product_id INT REFERENCES products(id)
);

-- Creating the feedbacks table
CREATE TABLE feedbacks (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  product_id INT REFERENCES products(id),
  rating INT,
  comment TEXT
);

-- Creating the admin table
CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255),
  sub_id VARCHAR(255)
);

-- Creating the voice_queries table
CREATE TABLE voice_queries (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  query_text TEXT,
  response_text TEXT
);

-- Creating the payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  date DATE,
  total_paid NUMERIC(10, 2),
  stripe_charge_id VARCHAR(255)
);