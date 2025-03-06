import React, { useState } from 'react';
import { registerUser } from '../services/authService.js';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button.js';
import PasswordInput from '../components/passwordInput.js';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await registerUser(name, email, password);
            navigate('/Product_Management_Application/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2 className="header">Register</h2>
            {error && <p className="error">{error}</p>}
            <form className="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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

export default RegisterPage;
