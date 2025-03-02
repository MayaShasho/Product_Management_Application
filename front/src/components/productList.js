import '../styles/productsTable.css';
import React from 'react';
import { formatDate } from '../utils/formatDate.js';
import { LuChevronUp } from 'react-icons/lu';
import { LuChevronDown } from 'react-icons/lu';
import { LuChevronsUpDown } from 'react-icons/lu';

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
            return order === 'asc' ? <LuChevronUp /> : <LuChevronDown />;
        }
        return <LuChevronsUpDown />;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th className="name-column">Name</th>
                    <th className="description-column">Description</th>
                    <th
                        className="price-column"
                        onClick={() => onSort('price')}
                    >
                        Price {getSortIcon('price')}
                    </th>
                    <th
                        className="created-at-column"
                        onClick={() => onSort('created_at')}
                    >
                        Created At {getSortIcon('created_at')}
                    </th>
                    <th className="action-column">Actions</th>
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
