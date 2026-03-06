import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/BLOOMCYCLE_LOGO.png";

function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isPremium");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src={logo} alt="BloomCycle Logo" />
          <span className="logo-text">BloomCycle</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="hide-mobile">Home</Link>
          <Link to="/features" className="hide-mobile">Features</Link>

          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Rendered Here */}
      <div className="app-content">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;