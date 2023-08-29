-- Creating the customers table
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  sub_id INT
);

-- Creating the addresses table
CREATE TABLE addresses (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  street VARCHAR(100),
  city VARCHAR(50),
  province VARCHAR(50),
  postal_code VARCHAR(10),
  country VARCHAR(50)
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
  name VARCHAR(50),
  image VARCHAR(100),
  price NUMERIC(10, 2),
  stock_quantity INT,
  description TEXT
);

-- Creating the cart table
CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id)
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
  username VARCHAR(50),
  password VARCHAR(50)
);

-- Creating the voice_queries table
CREATE TABLE voice_queries (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  query_text TEXT,
  response_text TEXT
);