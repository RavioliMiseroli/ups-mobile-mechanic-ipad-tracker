import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import AuthController from "./components/Resources/AuthController";
import NavBar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <ToastContainer />
      <AuthController />
    </BrowserRouter>
  );
}

export default App;
