import React from 'react';

const Button = ({ title, type, className, loading }) => {
    return (
        <button type={type} className={className}>
            {loading ? 'Submitting...' : title}
        </button>
    );
};

export default Button;
