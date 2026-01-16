import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Symptoms from "./pages/Symptoms";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import LogPeriod from "./pages/LogPeriod";
import Insights from "./pages/Insights";
import Membership from "./pages/Membership";

function App() {
  return (
    <Router>
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
        </Route>

        {/* Auth pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
