import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Example/Home';
import ListUser from './User/ListUser';
import DetailUser from './User/DetailUser';
import ListCar from './Todos/ListCar';
import Document from './Documents/Document';
import Nav from './nav/Nav';
import Header from './heater/heater';
import './admin-dashboard.scss';
import Logout from './Lognout/lognout';


const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Header />
            <Nav />
            <div className="routes-container">
                <Routes>
                    <Route path="/abc" element={<Home />} />
                    <Route path="/user" element={<ListUser />} />
                    <Route path="/user/:userId" element={<DetailUser />} />
                    <Route path="/Todos" element={<ListCar />} />
                    <Route path="/document" element={<Document />} />
                    <Route path="/login" element={<Logout />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
