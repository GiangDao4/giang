import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarStatistics from './bieudo/bieudo';

import './Demo.scss'; // Import file CSS đã viết ở trên

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            console.log('check timeout');
            navigate('/Todos'); // Điều hướng đến trang Todos sau 100 giây
        }, 1000000);
    }, [navigate]);

    return (
        <div className="main-content">
            <CarStatistics />
        </div>
    );
};

export default Home;
