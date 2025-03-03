import './config/envConfig.js';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ProductPage from './pages/productPage';
import ProtectedRoute from './components/protectedRoute';
import Navbar from './components/navbar';

function App() {
    const [isToken, setIsToken] = useState(!!localStorage.getItem('token'));

    return (
        <Router>
            <Navbar isToken={isToken} setIsToken={setIsToken} />
            <Routes>
                <Route
                    path="/Product_Management_Application/"
                    element={<HomePage />}
                />
                <Route
                    path="/Product_Management_Application/login"
                    element={<LoginPage setIsToken={setIsToken} />}
                />
                <Route
                    path="/Product_Management_Application/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/Product_Management_Application/products"
                    element={
                        <ProtectedRoute>
                            <ProductPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
