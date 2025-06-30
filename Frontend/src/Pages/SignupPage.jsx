import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../store/slice/userSlice";

const SignupPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [accountName, setAccountName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("accountNo", accountNo);
    formData.append("accountName", accountName);
    if (profileImage) formData.append("profileImage", profileImage);

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(file);
      setProfilePreview(reader.result);
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        {profilePreview && (
          <div className="flex justify-center mb-4">
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
            />
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6" encType="multipart/form-data">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Account No"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={imageHandler}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
