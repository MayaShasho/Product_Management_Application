import { sqlDb } from '../config/db.js';
import { getPaginationParams } from '../utils/pagination.js';

class ProductSQL {
    static async createProduct(name, description, price) {
        const [result] = await sqlDb.execute(
            'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
            [name, description, price]
        );
        return result;
    }

    static async getProducts(
        page = 1,
        limit = 10,
        sortOption = { created_at: -1 }
    ) {
        const offset = (page - 1) * limit;
        const orderBy = Object.keys(sortOption)[0];
        const orderDirection = sortOption[orderBy] === 1 ? 'ASC' : 'DESC';
        const query = `SELECT * FROM products ORDER BY ${orderBy} ${orderDirection} LIMIT ${parseInt(
            limit
        )} OFFSET ${parseInt(offset)}`;
        const [rows] = await sqlDb.execute(query);
        return rows;
    }

    static async getProductsCount() {
        const query = `SELECT COUNT(name) as counter FROM products`;
        const [rows] = await sqlDb.execute(query);
        return rows;
    }

    static async getProductById(id) {
        const [rows] = await sqlDb.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async updateProduct(id, name, description, price) {
        const [result] = await sqlDb.execute(
            'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
            [name, description, price, id]
        );
        return result.affectedRows;
    }

    static async deleteProduct(id) {
        const [result] = await sqlDb.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}

export default ProductSQL;
