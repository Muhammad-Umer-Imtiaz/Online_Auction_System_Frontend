import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/slice/userSlice"; // <-- adjust path if needed
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { loading } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    dispatch(resetPassword(token, password));
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-12 bg-gray-50"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none pr-12 bg-gray-50"
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;