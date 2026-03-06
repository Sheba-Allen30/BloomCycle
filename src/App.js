import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import "./index.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Symptoms from "./pages/Symptoms";
import Calendar from "./pages/Calendar";
import LogPeriod from "./pages/LogPeriod";
import Insights from "./pages/Insights";
import Membership from "./pages/Membership";
import About from "./pages/About";
import Features from "./pages/Features";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      {/* ✅ Toasts work everywhere */}
      <ToastContainer position="top-center" autoClose={2500} />

      <Routes>
        {/* Pages WITH Navbar + Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/log-period" element={<LogPeriod />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
        </Route>

        {/* Auth pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

    </Router>
  );
}

export default App;
