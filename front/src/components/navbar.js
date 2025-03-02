import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ isToken, setIsToken }) {
    const logOut = () => {
        localStorage.removeItem('token');
        setIsToken(false);
    };

    return (
        <nav className="navbar">
            <h2>Product App</h2>
            <div>
                <Link to="/">Home</Link>
                {isToken ? (
                    <Link to="/" onClick={logOut}>
                        Logout
                    </Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;
