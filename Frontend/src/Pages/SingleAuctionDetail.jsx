import React, { useEffect, useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { RiAuctionFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { getAuctionDetail } from '../store/slice/auctionSlice';
import { placeBid } from '../store/slice/bidSlice';

const SingleAuctionDetail = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigate]);

  useEffect(() => {
    if (auctionDetail?.images?.length > 0) {
      setMainImage(auctionDetail.images[0].url);
    }
  }, [auctionDetail]);

  const handleBid = () => {
    const numericBid = parseFloat(amount);
    const currentBid = auctionDetail.highestBid || auctionDetail.startingBid;
    if (numericBid <= 0 || isNaN(numericBid)) return;
    if (numericBid <= currentBid) {
      alert('Bid must be higher than the current highest bid.');
      return;
    }
    const formData = new FormData();
    formData.append('amount', numericBid);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
    setAmount('');
  };

  const isAuctionLive =
    new Date(auctionDetail.startTime) < Date.now() &&
    new Date(auctionDetail.endTime) > Date.now();

  const isAuctionNotStarted = new Date(auctionDetail.startTime) > Date.now();
  const isAuctionEnded = new Date(auctionDetail.endTime) < Date.now();

  return (
    <section className="w-full px-5 pt-24 pb-24 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <FaGreaterThan className="text-gray-400" />
        <Link to="/auction" className="text-blue-600 hover:underline">Auctions</Link>
        <FaGreaterThan className="text-gray-400" />
        <span className="font-semibold text-gray-800">{auctionDetail.title}</span>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Images and Info */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            {/* Main Image */}
            <div className="border-2 border-gray-100 rounded-xl overflow-hidden">
              <img
                src={mainImage || '/default.jpg'}
                alt="Main"
                className="w-full h-80 sm:h-96 object-scale-down"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-6 overflow-x-auto scrollbar-hide">
              {auctionDetail.images?.length > 0 ? (
                auctionDetail.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`thumb-${index}`}
                    onClick={() => setMainImage(img.url)}
                    className={`w-20 h-20 rounded-lg border-2 cursor-pointer transition-all hover:border-[#D6482B] ${
                      mainImage === img.url ? 'border-[#D6482B]' : 'border-gray-200'
                    }`}
                  />
                ))
              ) : (
                <img
                  src="/default.jpg"
                  alt="default"
                  className="w-20 h-20 rounded-lg border-2 border-gray-200"
                />
              )}
            </div>

            {/* Info */}
            <div className="mt-6 space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">{auctionDetail.title}</h2>
              <p><strong>Condition:</strong> <span className="text-[#D6482B]">{auctionDetail.condition}</span></p>
              <p><strong>Starting Bid:</strong> Rs. {auctionDetail.startingBid}</p>
              <p><strong>Current Bid:</strong> Rs. {auctionDetail.currentBid || auctionDetail.startingBid}</p>
              <p><strong>Start Time:</strong> {formatDateTime(auctionDetail.startTime)}</p>
              <p><strong>End Time:</strong> {formatDateTime(auctionDetail.endTime)}</p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Description</h3>
              {auctionDetail.description ? (
                <div className="space-y-2 text-gray-700">
                  {auctionDetail.description.split('. ').map((line, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-[#D6482B] mt-1">•</span> {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No description provided.</p>
              )}
            </div>
          </div>

          {/* Right - Bidding Panel */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#D6482B] to-[#A93226] px-6 py-4 text-white font-semibold text-lg">
                Bidders
              </div>
              <div className="px-6 py-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#D6482B]/50 scrollbar-track-gray-100">
                {isAuctionLive ? (
                  auctionBidders?.length > 0 ? (
                    auctionBidders.map((bidder, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <img
                            src={bidder.profileImage || '/default.jpg'}
                            alt="user"
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-medium">{bidder.userName}</p>
                            <p className="text-sm text-gray-600">Rs. {bidder.amount}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          i === 0 ? 'bg-green-100 text-green-700' :
                          i === 1 ? 'bg-blue-100 text-blue-700' :
                          i === 2 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-6">No bids placed yet.</p>
                  )
                ) : isAuctionNotStarted ? (
                  <div className="flex justify-center py-6">
                    <img
                      src="/notStarted.png"
                      alt="Auction Not Started"
                      className="max-w-xs w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center py-6">
                    <img
                      src="/auctionEnded.png"
                      alt="Auction Ended"
                      className="max-w-xs w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Bid Section */}
              {isAuctionLive && (
                <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-[#D6482B] to-[#A93226] text-white gap-3">
                  <div>
                    <p className="text-sm">Current Highest Bid</p>
                    <p className="text-xl font-bold">Rs. {auctionDetail.currentBid || auctionDetail.startingBid}</p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      className="w-28 sm:w-32 px-3 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                      placeholder="Your Bid"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                      onClick={handleBid}
                      className="p-3 bg-black rounded-full hover:bg-gray-800 transition"
                    >
                      <RiAuctionFill className="text-white text-xl" />
                    </button>
                  </div>
                </div>
              )}
              {!isAuctionLive && (
                <div className="text-center py-6 font-semibold text-gray-800 bg-gray-50">
                  {isAuctionNotStarted ? "Auction has not started yet" : "Auction has ended"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default SingleAuctionDetail;
