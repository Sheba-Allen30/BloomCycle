import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/BLOOMCYCLE_LOGO.png";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* LEFT: LOGO + BRAND */}
      <Link to="/" className="navbar-left">
        <img src={logo} alt="BloomCycle Logo" className="nav-logo" />
        <h2 className="brand-text">BloomCycle</h2>
      </Link>

      {/* RIGHT: LINKS */}
      <nav className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button className="nav-btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
