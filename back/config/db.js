import mysql from 'mysql2/promise';

async function initializeDatabase() {
    let connectionConfig = {};
    let isLocal = false;

    if (process.env.DATABASE_URL) {
        const dbUrl = process.env.DATABASE_URL;

        const { hostname, port, pathname, username, password } = new URL(dbUrl);
        const database = pathname.replace('/', '');

        connectionConfig = {
            host: hostname,
            user: username || 'root',
            password: password || '',
            database,
            port,
        };
    } else {
        isLocal = true;

        connectionConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        };
    }

    const connection = await mysql.createConnection({
        host: connectionConfig.host,
        user: connectionConfig.user,
        password: connectionConfig.password,
        port: connectionConfig.port,
    });

    if (isLocal) {
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
        );
    }

    const sqlDb = await mysql.createConnection(connectionConfig);

    await sqlDb.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await sqlDb.query(`
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return sqlDb;
}

const sqlDb = await initializeDatabase();

export { sqlDb };
