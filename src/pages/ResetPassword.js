import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/reset-password", {
        email,
        resetToken,
        newPassword: password
      });
      alert("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-rose-600 mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Account Email"
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Reset Token (6 digits)"
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={resetToken}
            onChange={(e) => setResetToken(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition"
          >
            Reset Password
          </button>
        </form>

        {error && (
          <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>
        )}

        <p className="mt-6 text-center text-sm">
          <Link to="/login" className="text-rose-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;