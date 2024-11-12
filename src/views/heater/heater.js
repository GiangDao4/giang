import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss'; // Import file SCSS
import logo from '../../assets/images/car (1).png';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        console.log("Tìm kiếm với từ khóa: ", searchQuery);
    };

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
        console.log("Chuyển hướng tới trang đăng nhập");
    };

    return (
        <div>
            <div className="header">
                {/* Logo */}
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <div className="logo-text">Hệ thống quản lý ô tô</div>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button className="timkiem" onClick={handleSearchSubmit}>Tìm kiếm</button>
                    <button className="login-button" onClick={handleLoginClick}>Đăng nhập</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
