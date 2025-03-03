import '../styles/productPage.css';
import '../styles/productSearch.css';
import React, { useEffect, useState } from 'react';
import {
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} from '../services/productService';
import EditProductModal from '../components/editProductModal';
import useDebounce from '../hooks/useDebounce';
import ProductList from '../components/productList';
import AddProductModal from '../components/addProductModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Pagination from '../components/pagination';

const MySwal = withReactContent(Swal);

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editProduct, setEditProduct] = useState(null);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [isAddProduct, setIsAddProduct] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 5;

    const [sortBy, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('desc');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPaginatedProducts = async () => {
            try {
                setLoadingProducts(true);
                const { products: fetchedProducts, totalPages } =
                    await fetchProducts(
                        token,
                        debouncedSearchQuery,
                        currentPage,
                        productsPerPage,
                        sortBy,
                        order
                    );
                setProducts(fetchedProducts);
                setTotalPages(totalPages || 1);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchPaginatedProducts();
    }, [debouncedSearchQuery, token, currentPage, sortBy, order]);

    const loadProducts = async () => {
        const { products: fetchedProducts } = await fetchProducts(token);
        setProducts(fetchedProducts);
    };

    const handleCreateProduct = async (product) => {
        await createProduct(token, product);
        setSearchQuery('');
        setCurrentPage(1);
        loadProducts();
    };

    const handleDeleteProduct = async (id) => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: '#2C3930',
            color: '#2C3930',
            showCancelButton: true,
            confirmButtonColor: '#6a8b75',
            cancelButtonColor: '#aa4444',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            setSearchQuery('');
            setCurrentPage(1);
            await deleteProduct(token, id);
            loadProducts();
        }
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        await updateProduct(token, id, updatedProduct);
        setEditProduct(null);
        setSearchQuery('');
        loadProducts();
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSort = (column) => {
        let newOrder = 'asc';
        if (sortBy === column) {
            newOrder = order === 'asc' ? 'desc' : 'asc';
        }
        setSortBy(column);
        setOrder(newOrder);
    };

    return (
        <div className="product-container">
            <h2 className="title">Product List</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>
            <button
                onClick={() => setIsAddProduct(true)}
                className="add-product-btn btn"
            >
                + Add New Product
            </button>
            <ProductList
                products={products}
                loading={loadingProducts}
                setEditProduct={setEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                onSort={handleSort}
                sortBy={sortBy}
                order={order}
            />
            <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
            />

            {editProduct && (
                <EditProductModal
                    product={editProduct}
                    onUpdate={handleUpdateProduct}
                    onClose={() => setEditProduct(null)}
                />
            )}
            {isAddProduct && (
                <AddProductModal
                    onSubmit={handleCreateProduct}
                    onClose={() => setIsAddProduct(false)}
                />
            )}
        </div>
    );
}

export default ProductPage;
