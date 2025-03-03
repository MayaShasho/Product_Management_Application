import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? (
        children
    ) : (
        <Navigate to="/Product_Management_Application/login" />
    );
};

export default ProtectedRoute;
