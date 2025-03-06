import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import PasswordInput from '../components/passwordInput';

function LoginPage({ setIsToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const token = await loginUser(email, password);
            localStorage.setItem('token', token);
            setIsToken(true);
            navigate('/Product_Management_Application/products');
        } catch (err) {
            setError('Login failed. Please check your email and password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="header">Login</h2>
            {error && <p className="error">{error}</p>}
            <form className="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <PasswordInput
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    title="Submit"
                    type="submit"
                    className="btn"
                    loading={isLoading}
                />
            </form>
        </div>
    );
}

export default LoginPage;
