import React, { useState } from 'react';

const Modal = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="modal">
            <div className="modal-content">{children}</div>
        </div>
    );
};

export default Modal;
