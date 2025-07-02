import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const now = new Date();

  // Filter out future auctions and sort by startTime (latest first)
  const filteredAndSorted = allAuctions
    ?.filter((auction) => new Date(auction.startTime) <= now)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <section className="my-10 px-4 md:px-8 lg:px-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
          Featured Auctions
        </h2>
        <div>
          <Link to="/auction">
            <button className="flex items-center gap-1 px-6 hover:text-blue-700 font-semibold rounded-lg transition duration-300">
              View All Auctions
              <MdKeyboardDoubleArrowRight />
            </button>
          </Link>
        </div>
      </div>

      {filteredAndSorted && filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSorted.slice(0, 8).map((auction) => (
            <Card
              key={auction._id}
              title={auction.title}
              imgSrc={auction.images}
              currentBid={auction.currentBid}
              startTime={auction.startTime}
              endTime={auction.endTime}
              startingBid={auction.startingBid}
              id={auction._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8 text-lg">
          No auctions available right now.
        </div>
      )}
    </section>
  );
};

export default FeaturedAuctions;
