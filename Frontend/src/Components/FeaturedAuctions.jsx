import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  return (
    <section className="my-10 px-4 md:px-8 lg:px-12">
      <div className="mb-6 text-start">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">
          Featured Auctions
        </h2>
        
      </div>

      {allAuctions && allAuctions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {allAuctions.slice(0, 8).map((auction) => (
            <Card
              key={auction._id}
              title={auction.title}
              imgSrc={auction.images}
              startTime={auction.startTime}
              endTime={auction.endTime}
              startingBid={auction.startingBid}
              id={auction._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8 text-lg">
          No auctions found.
        </div>
      )}
    </section>
  );
};

export default FeaturedAuctions;
