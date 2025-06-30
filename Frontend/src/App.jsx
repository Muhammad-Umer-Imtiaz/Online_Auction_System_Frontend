import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import HomePage from './Pages/HomePage';
import LoginPage from "./Pages/LoginPage";
import SignupPage from './Pages/SignupPage';
import Layout from './Layout/Layout';
import Profile from './Pages/UserDashboard/Profile';
import MyAuction from './Pages/UserDashboard/MyAuction';
import SubmitComission from './Pages/UserDashboard/SubmitComission';
import Leaderboard from './Components/Leaderboard';
import AuctionPage from './Pages/AuctionPage';
import CreateAuction from './Pages/UserDashboard/CreateAuction';
import SingleAuctionDetail from './Pages/SingleAuctionDetail';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AllUser from './Pages/AdminDashboard/AllUser';
import PaymentProof from './Pages/AdminDashboard/PaymentProof';
import DeleteAuction from './Pages/AdminDashboard/DeleteAuction';
import AdminLayout from './Layout/AdminLayout';
import Category from './Pages/AdminDashboard/category';
import Contact from './Pages/Contact';

import { loadUser, fetchLeaderboard } from './store/slice/userSlice';
import { getAllAuctionItems } from './store/slice/auctionSlice';
import { getAllCategories } from './store/slice/categorySlice';
import DashboardUser from './Pages/AdminDashboard/DashboardUser';
import UpdatePassword from './Pages/UserDashboard/UpdatePassword';
import UpcomingAuctions from './Components/upcomingAuctions';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        {/* Top */}
        <div>
          <Navbar isLoggedIn={true} />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/auction' element={<AuctionPage />} />
            <Route path='/auction/item/:id' element={<SingleAuctionDetail />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/upcoming-auction' element={<UpcomingAuctions />} />
            <Route path="/password/forgot" element={<ForgetPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            {/* User Dashboard Routes */}
            <Route path='/user' element={<Layout />}>
              <Route path='create-auction' element={<CreateAuction />} />
              <Route path='profile' element={<Profile />} />
              <Route path='auction' element={<MyAuction />} />
              <Route path='submit-commission' element={<SubmitComission />} />
              <Route path='update-password' element={<UpdatePassword />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path='/admin' element={<AdminLayout />}>
              <Route path='user-dashboard' element={<DashboardUser />} />
              <Route path='dashboard' element={<AdminDashboard />} />
              <Route path='users' element={<AllUser />} />
              <Route path='delete-auction' element={<DeleteAuction />} />
              <Route path='payment-proof' element={<PaymentProof />} />
              <Route path='category' element={<Category />} />
              <Route path='profile' element={<Profile />} />
              <Route path='update-password' element={<UpdatePassword />} />

            </Route>
          </Routes>
        </div>

        {/* Footer always at bottom */}
        <Footer />
      </div>

      <ToastContainer position='top-right' />
    </Router>
  );
};

export default App;
