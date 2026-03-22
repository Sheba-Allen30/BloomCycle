import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/BLOOMCYCLE_LOGO.png";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, text: "🌸 Your period is predicted to start in 3 days.", time: "2h ago", unread: true },
    { id: 2, text: "📝 Don't forget to log your symptoms today!", time: "5h ago", unread: false },
    { id: 3, text: "🥗 New phase-based diet recommendations are ready.", time: "1d ago", unread: false }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("isPremium");
    sessionStorage.clear();
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
        {isLoggedIn && (
          <div className="notification-container">
            <button
              className="notification-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              <span className="badge">1</span>
            </button>

            {showNotifications && (
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                <ul>
                  {mockNotifications.map(n => (
                    <li key={n.id} className={n.unread ? "unread" : ""}>
                      <p>{n.text}</p>
                      <small>{n.time}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/articles" className="nav-link">Learn</Link>
        <Link to="/community" className="nav-link">Community</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">My Cycle</Link>
            <Link to="/reminders" className="nav-link">Reminders</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
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
