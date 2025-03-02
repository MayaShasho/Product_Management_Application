import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserSQL from '../models/userModel.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserSQL.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ errors: ['User already exists'] });
        }

        const userId = await UserSQL.register(name, email, password);
        res.status(201).json({ message: 'User registered', userId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserSQL.findByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ errors: ['Invalid email or password'] });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ errors: ['Invalid email or password'] });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
};
