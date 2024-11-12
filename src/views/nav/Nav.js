import React from "react";
import './Nav.scss';
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink to="/abc" className={({ isActive }) => (isActive ? "active" : "")}>Trang chủ</NavLink>
                <NavLink to="/user" className={({ isActive }) => (isActive ? "active" : "")}>Người dùng</NavLink>
                <NavLink to="/Todos" className={({ isActive }) => (isActive ? "active" : "")}>Ô tô</NavLink>
                <NavLink to="/document" className={({ isActive }) => (isActive ? "active" : "")}>Tài liệu thêm</NavLink>
                <NavLink to="/out" className={({ isActive }) => (isActive ? "active" : "")}>Đăng xuất</NavLink>
            </div>
        );
    }
}

export default Nav;
