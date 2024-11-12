import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';  // Để hiển thị thông báo
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';

const Login = () => {
    const [email, setEmail] = useState('');  // State lưu email người dùng
    const [password, setPassword] = useState('');  // State lưu mật khẩu người dùng
    const [loading, setLoading] = useState(false);  // State kiểm tra trạng thái đang gửi yêu cầu
    const navigate = useNavigate();  // Hook để điều hướng người dùng

    // Tài khoản mặc định (mock account)
    const defaultAccount = {
        email: 'default@example.com',
        password: 'default1234',
        token: 'mockToken1234567890',
        user: {
            id: 1,
            username: 'user_default',
            email: 'default@example.com',
        }
    };

    // Hàm xử lý khi người dùng submit form
    const handleLogin = async (e) => {
        e.preventDefault();  // Ngừng việc reload trang khi submit

        // Kiểm tra dữ liệu nhập vào
        if (!email || !password) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        setLoading(true);  // Đang xử lý yêu cầu đăng nhập

        try {
            // Gửi yêu cầu đăng nhập (thay đổi API url theo backend của bạn)
            const response = await axios.post('https://example.com/api/login', {
                email,
                password,
            });

            // Kiểm tra nếu đăng nhập thành công
            if (response.data.success) {
                // Lưu thông tin người dùng và token vào localStorage
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                toast.success("Đăng nhập thành công!");

                // Điều hướng người dùng tới trang quản trị hoặc trang chủ
                navigate('/admin');  // Chuyển hướng tới trang dashboard (quản trị)
            } else {
                toast.error("Thông tin đăng nhập không chính xác!");
            }
        } catch (error) {
            // Nếu API có lỗi, sử dụng tài khoản mặc định
            console.error("Đăng nhập thất bại:", error);
            toast.error("Đã có lỗi xảy ra, sử dụng tài khoản mặc định.");

            // Giả lập thông tin đăng nhập thành công với tài khoản mặc định
            localStorage.setItem('authToken', defaultAccount.token);
            localStorage.setItem('user', JSON.stringify(defaultAccount.user));

            toast.success("Đăng nhập thành công với tài khoản mặc định!");

            // Điều hướng người dùng tới trang quản trị (dashboard)
            navigate('/admin');
        } finally {
            setLoading(false);  // Kết thúc việc xử lý đăng nhập
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng Nhập</h2>

            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>

            <p className="signup-link">
                Chưa có tài khoản? <a href="/reister">Đăng ký ngay</a>
            </p>
        </div>
    );
};

export default Login;
