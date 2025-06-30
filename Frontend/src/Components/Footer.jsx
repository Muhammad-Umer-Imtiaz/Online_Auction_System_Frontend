import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white mt-8 ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-[#D6482B] mb-2">EZ Auction</h2>
          <p className="text-sm text-gray-400">
            Join the best online auction platform. Bid smart, win big!
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-[#D6482B]">Home</Link></li>
            <li><Link to="/auction" className="hover:text-[#D6482B]">Auctions</Link></li>
            <li><Link to="/leaderboard" className="hover:text-[#D6482B]">Leaderboard</Link></li>
            <li><Link to="/user/profile" className="hover:text-[#D6482B]">Profile</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/privacy" className="hover:text-[#D6482B]">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#D6482B]">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-[#D6482B] text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-300 hover:text-[#D6482B] text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-[#D6482B] text-xl"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-400">
        © {new Date().getFullYear()} EZ Auctions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
