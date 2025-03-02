import express from 'express';
import validateRegistration from '../middlewares/validateRegistration.js';
import validateLogin from '../middlewares/validateLogin.js';
import { register, login } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

export default router;
