import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();


  return (
    <nav className="flex justify-between items-center px-4 sm:px-16 py-4 shadow-md bg-white">
      {/* Logo */}
      <img src={logo} alt="Logo" onClick={() => navigate("/")} className="h-12" />

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium text-base">
        <Link
          to="/auction"
          className="hover:text-blue-600 hover:underline underline-offset-4 transition duration-200"
        >
          Auctions
        </Link>
        <Link
          to="/Leaderboard"
          className="hover:text-blue-600 hover:underline underline-offset-4 transition duration-200"
        >
          Leaderboard
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-600 hover:underline underline-offset-4 transition duration-200"
        >
          Contact Us
        </Link>
        <Link
          to="/upcoming-auction"
          className="hover:text-blue-600 hover:underline underline-offset-4 transition duration-200"
        >
          Upcoming Auctions
        </Link>
      </div>


      {/* Dashboard Link */}
      {isAuthenticated ? (
        <div
          onClick={() => navigate(user?.role === "user" ? "/user/profile" : "/admin/user-dashboard")}
          className="cursor-pointer font-medium text-blue-600"
        >
          {user?.role === "user" ? "User Dashboard" : "Admin Dashboard"}
        </div>
      ) : (<div onClick={() => navigate("/login")}>Login</div>)}
    </nav>
  );
};

export default Navbar;
