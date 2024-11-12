import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import Login from './login/login';
import AdminDashboard from './admin';
import Register from './login/Resister';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";




function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  // const App= ()
  /* 2 components: class componet/ fuction compoet(function, arrow)
*  
* 2 
*/

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">

          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/*" />} />
            <Route path="/*" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path='/reister' element={<Register />} />

          </Routes>



        </header>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

        />

      </div>
    </BrowserRouter>
  );
}
export default App;
