import axios from 'axios';

const AUTH_URL =
    process.env.REACT_APP_AUTH_URL || 'http://localhost:5000/api/auth';

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`, {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.log('error', error);
        throw new Error(
            error.response?.data?.errors[0] || 'Registration failed'
        );
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, {
            email,
            password,
        });
        return response.data.token;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Login failed');
    }
};
