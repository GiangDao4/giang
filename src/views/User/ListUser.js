import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ListUser.scss';
import { toast } from 'react-toastify';

const ListUser = () => {
    const [ListUser, setListUser] = useState([]);  // State lưu trữ danh sách người dùng
    const [status, setStatus] = useState('offline');  // State lưu trạng thái người dùng (online/offline)
    const [currentPage, setCurrentPage] = useState(1);  // State lưu trang hiện tại
    const [totalPages, setTotalPages] = useState(1);  // Tổng số trang
    const [usersPerPage] = useState(5);  // Số người dùng mỗi trang
    const navigate = useNavigate();  // Hook điều hướng

    // Hàm fetch dữ liệu người dùng từ API với phân trang
    const fetchUsers = async (page) => {
        try {
            const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
            const users = res.data && res.data.data ? res.data.data : [];
            const total = res.data.total / usersPerPage;



            // Tính tổng số trang
            setListUser(users);
            setTotalPages(Math.ceil(total));  // Lưu số trang (làm tròn lên)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);  // Gọi hàm khi component mount hoặc khi `currentPage` thay đổi
    }, [currentPage]);

    // Hàm điều hướng đến trang chi tiết người dùng
    const handleViewDetailUser = (userId) => {
        navigate(`/user/${userId}`);  // Điều hướng tới trang chi tiết người dùng với ID
    };

    // Giả lập trạng thái người dùng (có thể từ API hoặc một số điều kiện khác)
    useEffect(() => {
        const randomStatus = Math.random() > 0.5 ? 'online' : 'offline';
        setStatus(randomStatus);
    }, []);

    // Hàm xóa người dùng
    // const handleDeleteUser = (userId) => {
    //     setListUser(ListUser.filter(user => user.id !== userId));
    //     toast.success("Xóa người dùng thành công!");
    // };
    const handleDeleteUser = async (userId) => {
        try {

            await axios.delete(`https://reqres.in/api/users/${userId}`);

            // Sau khi xóa thành công, cập nhật lại danh sách người dùng
            setListUser(prevList => prevList.filter(user => user.id !== userId));


            toast.success("Xóa người dùng thành công!");
            //fetchUsers(currentPage);
        } catch (error) {
            // Nếu có lỗi xảy ra (ví dụ API không cho phép xóa), thông báo lỗi
            toast.error("Không thể xóa người dùng!");
            console.error("Error deleting user:", error);
        }
    };
    // Hàm chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchUsers(page);
    };

    useEffect(() => {
        fetchUsers(currentPage);  // Gọi API khi trang thay đổi
    }, [currentPage]);
    // Hàm chuyển trang tiếp theo
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Hàm chuyển trang trước
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    // Hàm tạo các trang cho phân trang
    const createPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 3) {
            // Nếu tổng số trang nhỏ hơn hoặc bằng 3, hiển thị tất cả các trang
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Nếu có nhiều hơn 3 trang
            if (currentPage === 1) {
                // Trang đầu tiên
                pageNumbers.push(1, 2, 3, '...');
            } else if (currentPage === totalPages) {
                // Trang cuối cùng
                pageNumbers.push('...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Các trang ở giữa
                pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
            }
        }
        return pageNumbers;
    };

    return (
        <div className="list-user-container">
            <div style={{ display: 'flex', marginLeft: '80px' }}>
                <div className="title">Danh sách người dùng</div>
                <div style={{ marginLeft: '400px' }}>Trạng thái</div>
            </div>

            <div className="list-user-content">
                {ListUser && ListUser.length > 0 &&
                    ListUser.map((item, index) => {
                        // Tính số thứ tự của người dùng trong trang
                        const userIndex = (currentPage - 1) * usersPerPage + index + 1;
                        return (
                            <div className="child" key={item.id}>
                                <div className="user-info">
                                    <span>{userIndex}. {item.email}</span>
                                    <span className={`status ${status}`}>{status}</span>
                                </div>

                                <div className="list-ud">
                                    <div>
                                        <button type="button" onClick={() => handleViewDetailUser(item.id)}>
                                            Sửa
                                        </button>
                                    </div>

                                    <div>
                                        <button type="button" onClick={() => handleDeleteUser(item.id)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            {/* Phân trang */}
            <div className="pagination">
                {totalPages > 1 && (
                    <div className="pagination-buttons">
                        <button
                            className="page-button"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            {"<<"}
                        </button>
                        {createPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                className={`page-button ${page === currentPage ? 'active' : ''}`}
                                onClick={() => page !== '...' && handlePageChange(page)}
                                disabled={page === '...'}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="page-button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            {">>"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListUser;
