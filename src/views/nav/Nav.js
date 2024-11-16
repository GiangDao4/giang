import React from "react";
import './Nav.scss';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="topnav">
            <Link to="/admin/a" className={({ isActive }) => (isActive ? "active" : "")}>Trang chủ</Link>
            <Link to="/admin/user" className={({ isActive }) => (isActive ? "active" : "")}>Người dùng</Link>
            <Link to="/admin/Todos" className={({ isActive }) => (isActive ? "active" : "")}>Ô tô</Link>
            <Link to="/admin/document" className={({ isActive }) => (isActive ? "active" : "")}>Tài liệu thêm</Link>
            <Link to="/out" className={({ isActive }) => (isActive ? "active" : "")}>Trang cá nhân</Link>
            {/* <Link to="/admin/carlist" className={({ isActive }) => (isActive ? "active" : "")}>carlist</Link> */}
            {/* <Link to="/admin/cardetail/:id" className={({ isActive }) => (isActive ? "active" : "")}>cardetail</Link>
            <button>djdjd</button> */}
        </div>
    );
};

export default Nav;
