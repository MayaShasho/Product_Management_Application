import axios from 'axios';

const API_URL =
    process.env.REACT_APP_PRODUCTS_URL || 'http://localhost:5000/products';

export const fetchProducts = async (
    token,
    searchQuery = '',
    page = 1,
    limit = 5,
    sortBy = 'created_at',
    order = 'desc'
) => {
    try {
        let url = `${API_URL}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`;
        if (searchQuery) {
            url = `${API_URL}/search?query=${encodeURIComponent(
                searchQuery
            )}&sortBy=${sortBy}&order=${order}`;
        }

        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const createProduct = async (token, product) => {
    try {
        await axios.post(API_URL, product, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error creating product:', error);
    }
};

export const deleteProduct = async (token, productId) => {
    try {
        await axios.delete(`${API_URL}/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

export const updateProduct = async (token, productId, updatedProduct) => {
    try {
        console.log('productId', productId);
        await axios.put(`${API_URL}/${productId}`, updatedProduct, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error updating product:', error);
    }
};
