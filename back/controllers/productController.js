import ProductSQL from '../models/productModel.js';
import ProductMongo from '../models/productSearchModel.js';
import { getPaginationParams } from '../utils/pagination.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit } = getPaginationParams(req);
        const { sortBy = 'created_at', order = 'desc' } = req.query;
        const sortOption = {};
        if (sortBy === 'price') {
            sortOption.price = order === 'asc' ? 1 : -1;
        } else {
            sortOption.created_at = order === 'asc' ? 1 : -1;
        }
        const products = await ProductSQL.getProducts(page, limit, sortOption);
        const totalProducts = await ProductSQL.getProductsCount();
        res.json({
            page,
            limit,
            totalPages: Math.ceil(totalProducts[0].counter / limit),
            products,
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const result = await ProductSQL.createProduct(name, description, price);
        const productId = result.insertId;

        const productMongo = new ProductMongo({
            mysqlId: productId,
            name,
            description,
            price,
        });
        await productMongo.save();

        res.status(201).json({ message: 'Product created', id: productId });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                error: 'fields "name" and "price" are required',
            });
        }

        const product = await ProductSQL.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await ProductSQL.updateProduct(id, name, description, price);
        await ProductMongo.findOneAndUpdate(
            { mysqlId: id },
            { name, description, price }
        );
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedRows = await ProductSQL.deleteProduct(id);
        if (deletedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await ProductMongo.findOneAndDelete({ mysqlId: id });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};

export const searchProducts = async (req, res, next) => {
    try {
        const {
            query,
            minPrice,
            maxPrice,
            sortBy = 'created_at',
            order = 'desc',
            page = 1,
            limit = 5,
        } = req.query;

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        const offset = (pageNum - 1) * limitNum;

        let filter = {};

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ];
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const sortOption = {};
        if (sortBy === 'price') {
            sortOption.price = order === 'asc' ? 1 : -1;
        } else {
            sortOption.created_at = order === 'asc' ? 1 : -1;
        }

        const totalProducts = await ProductMongo.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limitNum);

        const products = await ProductMongo.find(filter)
            .sort(sortOption)
            .skip(offset)
            .limit(limitNum);
        res.json({ page: pageNum, limit: limitNum, totalPages, products });
    } catch (error) {
        next(error);
    }
};
