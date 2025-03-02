import React, { useState } from 'react';

const AddProduct = ({ onAdd }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAdd(newProduct);
        setNewProduct({ name: '', description: '', price: '' });
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
            />
            <input
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
            <input
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
            <button type="submit" className="btn">
                Create Product
            </button>
        </form>
    );
};

export default AddProduct;
