import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './componenets/Navbar';
import Home from "./componenets/Home";
import SignIn from './componenets/SignIn';
import Profile from './componenets/Profile';
import SignUp from './componenets/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/signup" element={<SignUp />}  />
      <Route path="/signin" element={<SignIn />}  />
      <Route path="/profile" element={<Profile />}  />

    </Routes>



    <ToastContainer theme='dark' />
    </div>
    </BrowserRouter>
  );
}

export default App;
