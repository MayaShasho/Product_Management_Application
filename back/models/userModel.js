import { sqlDb } from '../config/db.js';
import bcrypt from 'bcryptjs';

class User {
    static async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await sqlDb.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await sqlDb.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }
}

export default User;
