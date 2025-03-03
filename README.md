# Product Management Application

This project is a Full-Stack Product Management Application that enables users to manage products with authentication, CRUD operations, full-text search using MongoDB, sorting, and pagination.

This is a **Full-Stack Product Management Application** built with:

-   **Backend**: Node.js, Express, MySQL, MongoDB
-   **Frontend**: React.js

---

## Deployment Notes

**NOTICE:** The backend is hosted on Render's free tier.  
This means the instance will **spin down due to inactivity**, which can cause **delays of up to 50 seconds** for the first request.

If you experience slow responses at first, please wait for the instance to wake up.  
After that, it should perform normally.

---

## Features

-   User authentication (Register & Login with JWT)
-   Product CRUD operations (Create, Read, Update, Delete)
-   **Search** using MongoDB
-   **Sorting & Pagination** for better UX

## Technologies Used

### Frontend:

-   React.js
-   React Router
-   CSS Modules

### Backend:

-   Node.js & Express.js
-   MongoDB & Mongoose
-   JSON Web Token (JWT) for authentication

## Backend Setup (Node.js + MySQL + MongoDB)

### 🔹 Install Dependencies

```
cd backend
npm install
```

### 🔹 Configure Environment Variables

Add the following environment variables in Render or a .env file locally:

```
PORT=5000
DB_HOST=<your-mysql-host>
DB_USER=<your-mysql-username>
DB_PASS=<your-mysql-password>
DB_NAME=<your-mysql-database>
DB_PORT=<your-mysql-port>
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

**_If you are using a hosted database like Railway, you need to add:_**

```
DATABASE_URL=<your-db-url>
```

**_that contain the hostname, username, password, database, and port_**

### 🔹 Run the Backend Locally

```
npm start
```

Backend will be available at: http://localhost:5000/Product_Management_Application/

## Frontend Setup (React.js)

### 🔹 Install Dependencies

```
cd frontend
npm install
```

### 🔹 Configure Environment Variables

Set the backend URL in a .env file (local) or Render’s environment variables:

```
REACT_APP_PRODUCTS_URL="http://localhost:5000/Product_Management_Application/products"
REACT_APP_AUTH_URL="http://localhost:5000/Product_Management_Application/auth"
```

### 🔹 Run the Frontend Locally

```
npm start
```

Frontend will be available at: http://localhost:3000

## How to Test the Application

### Test Backend with Postman

    Start the Backend (npm start)
    Use Postman to Test APIs:
        POST /api/auth/register → Register a new user
        POST /api/auth/login → Get JWT Token
        GET /api/products → Get all products
        POST /api/products → Add a product
        PUT /api/products/:id → Update a product
        DELETE /api/products/:id → Delete a product
        GET /api/products/search?query=? → Search for products by name or description

### Test Frontend

    Run Frontend (npm start)
    Open http://localhost:3000 in browser
    Login & Try Product CRUD

## Author

-   [@Maya Shasho](https://github.com/MayaShasho)
