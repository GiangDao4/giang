// import React from "react";
// import './Listto.scss';
// import AddTODO from "./AddTODO";
// import { toast } from 'react-toastify';
// import Color from "../Example/HOC/color";

// class ListTodo extends React.Component {
//     state = {
//         ListTodos: [
//             { id: 'todo1', title: 'Doing homework' },
//             { id: 'todo2', title: 'homework' },
//             { id: 'todo3', title: 'toing' },
//         ],
//         editTodo: {}
//     }
//     addNewTodo = (todo) => {
//         this.setState({
//             ListTodos: [...this.state.ListTodos, todo]

//         })
//         toast.success("Wow so easy!");
//     }
//     handleDeleteTodo = (todo) => {
//         let currenttodo = this.state.ListTodos;
//         currenttodo = currenttodo.filter(item => item.id !== todo.id)
//         this.setState({
//             ListTodos: currenttodo
//         })
//         toast.error("Xoa thanh cong")
//     }
//     handleEditTodo = (todo) => {
//         let { editTodo, ListTodos } = this.state;
//         let isEmptyObj = Object.keys(editTodo).length === 0;
//         if (isEmptyObj === false && editTodo.id === todo.id) {
//             let listTodoCopy = [...ListTodos];
//             let objIndex = listTodoCopy.findIndex(item => item.id === todo.id);


//             listTodoCopy[objIndex].title = editTodo.title;
//             this.setState({
//                 ListTodos: listTodoCopy,
//                 editTodo: {}
//             })
//             toast.success("update todo success!")

//             return;
//         }



//         this.setState({
//             editTodo: todo
//         })

//     }
//     handleOnchangeEditTodo = (event) => {
//         let editTodocopy = { ...this.state.editTodo }
//         editTodocopy.title = event.target.value;
//         this.setState({
//             editTodo: editTodocopy
//         })
//     }
//     render() {
//         let { ListTodos, editTodo } = this.state;
//         // let ListTodos = this.state.ListTodos;
//         let isEmptyObj = Object.keys(editTodo).length === 0
//         console.log("check empty", isEmptyObj)
//         return (
//             <>
//                 <p>
//                     Simple TODO Apps with React.js (Hoi Dan IT)
//                 </p>
//                 <div className="list-todo-container">
//                     <AddTODO
//                         addNewTodo={this.addNewTodo}
//                     />
//                     <div className="list-todo-co">
//                         {ListTodos && ListTodos.length > 0 &&
//                             ListTodos.map((item, index) => {
//                                 return (
//                                     <div className="todo-child" key={item.id}>
//                                         {isEmptyObj === true ?
//                                             <span>{index + 1}-{item.title}</span>
//                                             :
//                                             <>
//                                                 {editTodo.id === item.id ?
//                                                     <span>
//                                                         {index + 1}- <input
//                                                             value={editTodo.title}
//                                                             onChange={(event) => this.handleOnchangeEditTodo(event)}
//                                                         />
//                                                     </span>
//                                                     :
//                                                     <span>
//                                                         {index + 1}-{item.title}
//                                                     </span>
//                                                 }
//                                             </>
//                                         }
//                                         <button className="edit"
//                                             onClick={() => this.handleEditTodo(item)}
//                                         >
//                                             {isEmptyObj === false && editTodo.id === item.id ?
//                                                 'Save' : 'Edit'
//                                             }

//                                         </button>
//                                         <button className="delete"
//                                             onClick={() => this.handleDeleteTodo(item)}
//                                         >Delete</button>
//                                     </div>
//                                 )
//                             })
//                         }

//                     </div>

//                 </div>
//             </>

//         )
//     }
// }
// export default ListTodo;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ListCar.scss';
import { toast } from 'react-toastify';

const ListCar = () => {
    const [listCar, setListCar] = useState([]);  // State lưu trữ danh sách ô tô
    const [currentPage, setCurrentPage] = useState(1);  // Trạng thái trang hiện tại
    const [totalPages, setTotalPages] = useState(1);  // Tổng số trang
    const [carsPerPage] = useState(5);  // Số ô tô mỗi trang
    const navigate = useNavigate();  // Hook điều hướng

    // Hàm fetch dữ liệu ô tô từ API với phân trang
    const fetchCars = async (page) => {
        try {
            // API giả định trả về dữ liệu ô tô
            const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
            const cars = res.data && res.data.data ? res.data.data : [];
            const total = 100;  // Giả sử API trả về tổng số xe là 100 cho ví dụ

            // Tính tổng số trang
            setListCar(cars);
            setTotalPages(Math.ceil(total / carsPerPage));  // Lưu số trang (làm tròn lên)
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    useEffect(() => {
        fetchCars(currentPage);  // Gọi hàm khi component mount hoặc khi `currentPage` thay đổi
    }, [currentPage]);

    // Hàm xóa ô tô
    const handleDeleteCar = async (carId) => {
        try {
            // Gửi yêu cầu xóa ô tô từ API
            await axios.delete(`https://api.example.com/cars/${carId}`);

            // Sau khi xóa thành công, cập nhật lại danh sách ô tô
            setListCar(prevList => prevList.filter(car => car.id !== carId));
            toast.success("Xóa ô tô thành công!");
            fetchCars(currentPage);
        } catch (error) {
            toast.error("Không thể xóa ô tô!");
            console.error("Error deleting car:", error);
        }
    };

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchCars(page);
    };

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
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage === 1) {
                pageNumbers.push(1, 2, 3, '...');
            } else if (currentPage === totalPages) {
                pageNumbers.push('...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
            }
        }
        return pageNumbers;
    };
    const handleEditCar = () => {

    }
    const AddCarnew = () => {

    }

    return (
        <>

            <div className="list-car-container">

                <div style={{ display: 'flex', marginLeft: '80px' }}>
                    <div className="title" style={{ marginLeft: '-70px' }}>Danh sách ô tô</div>
                    <div style={{ marginLeft: '600px' }}>Trạng thái</div>
                    {/* <div style={{ marginLeft: '200px' }}><button type="button" onClick={'AddCarnew()'} >Thêm mới xe</button></div> */}
                </div>

                <div className="list-car-content">
                    {listCar && listCar.length > 0 &&
                        listCar.map((item, index) => {
                            // Tính số thứ tự của ô tô trong trang
                            const carIndex = (currentPage - 1) * carsPerPage + index + 1;
                            return (
                                <div className="child" key={item.model_name}>
                                    <div className="car-info">
                                        <span>{index + 1}.{item.first_name}   {item.last_name}</span>
                                        {/* <span className={`status available`}><h1>Ô tô</h1> +{carIndex}</span> */}
                                    </div>

                                    <div className="list-ud">
                                        <div>
                                            <button type="button" onClick={() => handleDeleteCar(item.id)}>
                                                Xóa
                                            </button>
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => handleEditCar(item.id)}>
                                                Sửa
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
            <div style={{ marginLeft: '100px' }}><button type="button" onClick={() => AddCarnew()}>Thêm xe mới</button></div>
        </>
    );
};

export default ListCar;


