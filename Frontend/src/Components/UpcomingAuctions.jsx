import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionCard = ({ auction }) => {
  return (
    <Link
      to={`/auction/item/${auction._id}`}
      className="w-full bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      <div className="flex flex-col gap-4">
        <img
          src={auction.images?.[0]?.url || "/default-image.jpg"}
          alt={auction.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{auction.title}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span className="font-medium">Starting Bid:</span>
              <span className="text-orange-600 font-semibold">Rs. {auction.startingBid}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Current Bid:</span>
              <span className="text-green-600 font-semibold">
                Rs. {auction.currentBid || auction.startingBid}
              </span>
            </div>
            <div>
              <p className="font-medium">Starts At:</p>
              <p className="text-gray-800">{new Date(auction.startTime).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime);
    return auctionDate.toDateString() === todayString;
  });

  return (
    <section className="w-full px-4 py-10 lg:px-12 bg-[#f9f9f9] min-h-[60vh]">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          🔥 Upcoming Auctions
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Don't miss out – grab your chance to win!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {auctionsStartingToday.length > 0 ? (
          auctionsStartingToday.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg font-medium py-10">
            No auctions are starting today.
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingAuctions;
