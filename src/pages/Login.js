import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        username,
        password,
      });

      const token = res.data.token;
      const isPremium = res.data.user.isPremium;
      // Storing username for the dashboard greeting
      const userName = res.data.user.name || "Beautiful";

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("isPremium", isPremium);
        localStorage.setItem("userName", userName);
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("isPremium", isPremium);
        localStorage.setItem("userName", userName);
      }

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login to continue tracking your cycle</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          New to BloomCycle?
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;