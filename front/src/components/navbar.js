import '../styles/navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isToken, setIsToken }) {
    const logOut = () => {
        localStorage.removeItem('token');
        setIsToken(false);
    };

    return (
        <nav className="navbar">
            <h2>Product App</h2>
            <div className="navbar-links-container">
                <Link to="/Product_Management_Application/">Home</Link>
                {isToken ? (
                    <Link
                        to="/Product_Management_Application/"
                        onClick={logOut}
                    >
                        Logout
                    </Link>
                ) : (
                    <Link to="/Product_Management_Application/login">
                        Login
                    </Link>
                )}
                <Link to="/Product_Management_Application/register">
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
