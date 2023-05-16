import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/root/Navbar";
import Homepage from "./components/home/Homepage";
import LoginForm from "./components/home/LoginForm";
import AdminPanel from "./components/admin/AdminPanel";
import ManagerPanel from "./components/manager/ManagerPanel";
import About from "./components/home/About";
import Contact from "./components/home/Contact";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/manager-panel" element={<ManagerPanel />} />
        <Route path="/about" element={<About />} />
        <Route path="/conatct" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
