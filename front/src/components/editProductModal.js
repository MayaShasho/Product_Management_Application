import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function EditProductModal({ product, onUpdate, onClose }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setUpdatedProduct({
            ...updatedProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await onUpdate(product.id, updatedProduct);
        } catch (error) {
            console.error('Failed to update product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal" onClick={() => {
                if (!isSubmitting) {
                    onClose();
                }
            }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose} disabled={isSubmitting}>
                    <IoClose />
                </button>
                <div className="card-header">
                    <h3 className="card-title">Edit Product</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="product-form">
                        <div className="form-group">
                            <label for="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="description" className="form-label">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={updatedProduct.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="price" className="form-label">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <span className="button-spinner" />
                            )}

                            {isSubmitting ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProductModal;
