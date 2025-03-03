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
        <Router basename={process.env.REACT_APP_BASENAME || '/'}>
            <Navbar isToken={isToken} setIsToken={setIsToken} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={<LoginPage setIsToken={setIsToken} />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/products"
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
