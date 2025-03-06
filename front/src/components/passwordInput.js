import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const PasswordInput = ({ name, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="password-eye">
            <label>
                <input
                    className="form-input"
                    type={showPassword ? 'text' : 'password'}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                />
                <button
                    className="show-password"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? (
                        <FaEyeSlash size={18} />
                    ) : (
                        <FaEye size={18} />
                    )}
                </button>
            </label>
        </div>
    );
};

export default PasswordInput;
