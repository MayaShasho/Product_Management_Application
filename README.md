# Product Management Application

This is a **Full-Stack Product Management Application** built with:

-   **Backend**: Node.js, Express, MySQL, MongoDB
-   **Frontend**: React.js

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

### 🔹 Run the Backend Locally

```
npm start
```

Backend will be available at: http://localhost:5000

## Frontend Setup (React.js)

### 🔹 Install Dependencies

```
cd frontend
npm install
```

### 🔹 Configure Environment Variables

Set the backend URL in a .env file (local) or Render’s environment variables:

```
REACT_APP_PRODUCTS_URL="http://localhost:5000/api/products"
REACT_APP_AUTH_URL="http://localhost:5000/api/auth"
```

### 🔹 Run the Frontend Locally

```
npm start
```

Frontend will be available at: http://localhost:3000
