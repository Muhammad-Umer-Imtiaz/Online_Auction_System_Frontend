import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../store/slice/userSlice"; // <-- adjust if needed
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { loading } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
    setSubmitted(true);
    toast.info("If an email is found, a reset link has been sent. Please check your inbox and spam folder.");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-sm text-gray-600 text-center">
            If you don't see the email, please check your spam or junk folder.
          </p>
        )}
      </div>
    </section>
  );
};

export default ForgetPassword;
