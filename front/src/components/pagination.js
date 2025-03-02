import '../styles/pagination.css';
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    console.log('currentPage', currentPage);
    console.log('totalPages', totalPages);
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    className={`page-btn ${
                        currentPage === index + 1 ? 'active' : ''
                    }`}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
