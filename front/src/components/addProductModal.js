import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const AddProductModal = ({ onSubmit, onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await onSubmit(newProduct);
            setNewProduct({ name: '', description: '', price: '' });
        } catch (error) {
            console.error('Failed to create product:', error);
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
                    <h2 className="card-title">Add New Product</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="product-form">
                        <div className="form-group">
                            <label for="name" className="form-label">
                                Name
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        name: e.target.value,
                                    })
                                }
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="description" className="form-label">
                                Description
                            </label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description: e.target.value,
                                    })
                                }
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="price" className="form-label">
                                Price
                            </label>
                            <input
                                className="form-input"
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        price: parseFloat(e.target.value) || '',
                                    })
                                }
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

                            {isSubmitting
                                ? 'Creating...'
                                : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
