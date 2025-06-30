import React from 'react';
import { logout } from "../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { RiAuctionLine } from "react-icons/ri";
import { MdOutlineCreate, MdLogout } from "react-icons/md";
import { LuSend } from "react-icons/lu";
import { TbPasswordUser } from "react-icons/tb";


const navLinkStyles = ({ isActive }) =>
  `flex items-center gap-3 py-3.5 px-4 md:px-6 w-full rounded-r-xl transition-all duration-200 font- border-b
   ${isActive ? "bg-blue-100 text-blue-700 border-r-4 border-blue-600" : "hover:bg-blue-50 text-gray-600"}`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside className="min-h-screen h-full bg-white border-r shadow-lg w-full max-w-[240px] p-4">
      {/* Profile Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.profileImage?.url || "/default-profile.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover shadow-md mb-2"
        />
        <p className="text-sm font-semibold text-gray-800">{user?.userName || "User"}</p>
        <p className="text-xs text-gray-500">{user?.email || "Email"}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        <NavLink end to="/user/profile" className={navLinkStyles}>
          <CgProfile className="w-5 h-5" />
          <span className="hidden md:inline">Profile</span>
        </NavLink>

        <NavLink to="/user/auction" className={navLinkStyles}>
          <RiAuctionLine className="w-5 h-5" />
          <span className="hidden md:inline">Auctions</span>
        </NavLink>

        <NavLink to="/user/create-auction" className={navLinkStyles}>
          <MdOutlineCreate className="w-5 h-5" />
          <span className="hidden md:inline">Create Auction</span>
        </NavLink>

        <NavLink to="/user/submit-commission" className={navLinkStyles}>
          <LuSend className="w-5 h-5" />
          <span className="hidden md:inline">Submit Commission</span>
        </NavLink>
        <NavLink to="/user/update-password" className={navLinkStyles}>
          <TbPasswordUser className="w-5 h-5" />
          <span className="hidden md:inline">Update Password</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-3.5 px-4 md:px-6 w-full rounded-r-xl transition-all duration-200 text-gray-600 hover:bg-red-50 hover:text-red-600"
        >
          <MdLogout className="w-5 h-5" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
