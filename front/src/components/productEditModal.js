import '../styles/productEditModal.css';
import React, { useState } from 'react';

function ProductEditModal({ product, onUpdate, onClose }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
    });

    const handleChange = (e) => {
        setUpdatedProduct({
            ...updatedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(product.id, updatedProduct);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit Product</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={updatedProduct.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={updatedProduct.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={updatedProduct.price}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Update</button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="close-btn"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductEditModal;
