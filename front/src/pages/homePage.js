import '../styles/homePage.css';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="body-container">
            <div className="home-container">
                <h1>Welcome to Product Management App</h1>
                <p>Manage your products efficiently.</p>
                <div>
                    <Link to="/Product_Management_Application/login">
                        <button className="btn">Login</button>
                    </Link>
                    <Link to="/Product_Management_Application/register">
                        <button className="btn">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
