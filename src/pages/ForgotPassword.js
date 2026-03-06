import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tokenDisplay, setTokenDisplay] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message);
      if (res.data.simulatedToken) {
        setTokenDisplay(res.data.simulatedToken);
      }
    } catch (err) {
      setMessage("User not found or something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-rose-600 mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-full hover:bg-rose-700 transition"
          >
            Send Reset Token
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
        )}

        {tokenDisplay && (
          <div className="mt-4 p-4 bg-orange-100 text-orange-800 rounded-lg text-sm text-center">
            <p>For testing, here is your simulated token:</p>
            <p className="text-xl font-bold tracking-widest my-2">{tokenDisplay}</p>
            <Link to="/reset-password" className="text-rose-600 underline">
              Proceed to Reset Password
            </Link>
          </div>
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

export default ForgotPassword;