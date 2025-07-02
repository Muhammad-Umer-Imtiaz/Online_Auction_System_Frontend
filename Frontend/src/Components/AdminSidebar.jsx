import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/userSlice";

import { MdLogout, MdOutlineDeleteSweep } from "react-icons/md";
import { FaUsersCog, FaUserShield } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { LayoutDashboard, Send, FileText } from "lucide-react";
import { TbPasswordUser } from "react-icons/tb";

const navLinkStyles = ({ isActive }) =>
  `flex items-center gap-3 py-3 px-4 w-full cursor-pointer rounded-lg transition-all duration-200
   ${isActive ? "bg-blue-100 border-r-4 border-blue-700 font-semibold text-blue-700 shadow" : "hover:bg-blue-50 text-gray-700"}`;

const AdminSidebar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-4 z-50 relative"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <span className="text-2xl">&#9776;</span>
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-xl border-r min-h-screen fixed md:static top-0 left-0 transform ${open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 w-[230px] z-50 flex flex-col`}
      >
        {/* Logo/Title */}
        <div className="flex items-center justify-center py-6 border-b border-blue-100 mb-2">
          <span className="text-xl font-bold text-blue-700 tracking-wide">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          <NavLink end to="/admin/user-dashboard" className={navLinkStyles}>
            <FaUsersCog className="w-5 h-5" />
            <span className="hidden md:inline">User Management</span>
          </NavLink>

          <NavLink end to="/admin/dashboard" className={navLinkStyles}>
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </NavLink>

          <NavLink end to="/admin/profile" className={navLinkStyles}>
            <FaUserShield className="w-5 h-5" />
            <span className="hidden md:inline">Admin Profile</span>
          </NavLink>

          <NavLink end to="/admin/category" className={navLinkStyles}>
            <BiCategoryAlt className="w-5 h-5" />
            <span className="hidden md:inline">Categories</span>
          </NavLink>

          <NavLink to="/admin/users" className={navLinkStyles}>
            <FileText className="w-5 h-5" />
            <span className="hidden md:inline">Registered Users</span>
          </NavLink>

          <NavLink to="/admin/delete-auction" className={navLinkStyles}>
            <MdOutlineDeleteSweep className="w-5 h-5" />
            <span className="hidden md:inline">Delete Auctions</span>
          </NavLink>

          <NavLink to="/admin/payment-proof" className={navLinkStyles}>
            <Send className="w-5 h-5" />
            <span className="hidden md:inline">Payment Proofs</span>
          </NavLink>
          <NavLink to="/admin/update-password" className={navLinkStyles}>
            <TbPasswordUser className="w-5 h-5" />
            <span className="hidden md:inline">Update Password</span>
          </NavLink>

          <div
            onClick={handleLogout}
            className={`${navLinkStyles({ isActive: false })} mt-2 hover:bg-red-50 hover:text-red-600`}
            role="button"
            tabIndex={0}
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && handleLogout()}
          >
            <MdLogout className="w-5 h-5" />
            <span className="hidden md:inline">Logout</span>
          </div>
        </nav>
        <div className="flex-1" />
        {/* Optional: Add footer or version info here */}
      </aside>
    </>
  );
};

export default AdminSidebar;