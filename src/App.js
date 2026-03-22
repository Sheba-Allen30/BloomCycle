import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import NotificationChecker from "./components/NotificationChecker";
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
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import Reminders from "./pages/Reminders";
import DailyInsights from "./pages/DailyInsights";
import Articles from "./pages/Articles";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      {/* ✅ Toasts work everywhere */}
      <ToastContainer position="top-center" autoClose={2500} />
      <NotificationChecker />

      <Routes>
        {/* Pages WITH Navbar + Footer */}
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/membership" element={<Membership />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/log-period" element={<ProtectedRoute><LogPeriod /></ProtectedRoute>} />
          <Route path="/symptoms" element={<ProtectedRoute><Symptoms /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
          <Route path="/reminders" element={<ProtectedRoute><Reminders /></ProtectedRoute>} />
          <Route path="/daily-insights" element={<ProtectedRoute><DailyInsights /></ProtectedRoute>} />
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
