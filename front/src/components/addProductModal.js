import '../styles/addNewProduct.css';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const AddProductModal = ({ onSubmit, onClose }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(newProduct);
        setNewProduct({ name: '', description: '', price: '' });
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
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
                                required
                            />
                        </div>
                        <button type="submit" className="btn">
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
