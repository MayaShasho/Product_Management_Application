import './config/envConfig.js';
import express from 'express';
import cors from 'cors';
import { sqlDb } from './config/db.js';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/Product_Management_Application/auth', authRoutes);
app.use('/Product_Management_Application/products', productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;

async function startServer() {
    try {
        await sqlDb.query('SELECT 1');
        console.log('MySQL connected successfully');
    } catch (err) {
        console.error('MySQL connection failed:', err);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();
