import React from 'react';
import { formatDate } from '../utils/formatDate.js';

const ProductList = ({
    products,
    loading,
    setEditProduct,
    handleDeleteProduct,
    onSort,
    sortBy,
    order,
}) => {
    if (loading) {
        return <div>loading products...</div>;
    }

    const getSortIcon = (column) => {
        if (sortBy === column) {
            return order === 'asc' ? '🔼' : '🔽';
        }
        return '🔽';
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th className="sortable" onClick={() => onSort('price')}>
                        Price {getSortIcon('price')}
                    </th>
                    <th
                        className="sortable"
                        onClick={() => onSort('created_at')}
                    >
                        Created At {getSortIcon('created_at')}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan="5">No products found</td>
                    </tr>
                ) : (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{formatDate(product.created_at)}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => setEditProduct(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDeleteProduct(product.id)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default ProductList;
