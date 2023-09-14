# AI-Powered Online Shop


## Introduction

Discover a new level of convenience with our AI-Powered Online Store. With Voice Assistance for Search, you're no longer limited to typing your shopping queries. Simply talk to our AI, and it will assist you in finding the products you desire. It's like having your own personal shopping assistant, available 24/7.


## Features

### Stripe for Secure Payments
We've integrated Stripe, a trusted and secure payment processing platform, to ensure that your transactions are safe and hassle-free. Pay for your orders with confidence, knowing that your payment information is protected.

### Auth0 for Seamless Login
Our online store utilizes Auth0, a robust authentication and authorization platform, to provide you with a seamless and secure login experience. Your personal information remains confidential, and you can access your account with ease.

### Voice Assistance for Effortless Search
Say goodbye to typing long search queries! Our Voice Assistance for Search feature allows you to browse and find products effortlessly using your voice. Whether you're on a mobile device or desktop, simply speak your preferences, and our AI-powered assistant will help you discover products quickly and intuitively.

## Getting Started


## Dependencies

Before setting up the AI-powered online store, you need the following:

- PostgreSQL (v10.0 or higher)
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

### 1. Clone the Repository:
Start by cloning the project repository to your local machine using the following command:

```
git clone https://github.com/Momowaz/voice-based-ai-assistant-store
```

### 2. Access Project Directories:
Inside the project directory, you'll notice two primary folders: backend-api and store. We'll set up the backend and frontend separately.

### 3. Setting Up the Backend:

For the backend:

- Go to the 'backend-api` directory:

  ``` 
  cd backend-api
  ```

Create a .env configuration file based on the provided .env.example. Customize the settings as necessary.

- Install the required dependencies:

  ```
  npm install
  ```

- Launch the backend server:

  ```
  npm start
  ```

### 4. Setting Up the Frontend:

For the frontend:

- Open a new terminal or command prompt.
- Navigate to the store directory:

  ```
  cd store
  ```

- Install the necessary dependencies:

- Install the dependencies by running the following command:

  ```
  npm install
  ```

- Once the dependencies are installed, start the backend server:
  ```
  npm start
  ```


### 5. Accessing the Application:
Once you've completed these steps, the backend and frontend servers will be running on separate ports. You can explore the application by opening your web browser and visiting http://localhost:3000 (or a different port if specified).