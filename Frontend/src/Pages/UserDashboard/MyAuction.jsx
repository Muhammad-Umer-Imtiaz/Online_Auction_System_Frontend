import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMyAuctionItems } from "../../store/slice/auctionSlice";
import CardTwo from "../../Components/CardTwo";
import Spinner from "../../Components/Spinner";

const MyAuction = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { myAuctions = [], loading } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
      return;
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, navigateTo]);

  return (
    <div className="w-full min-h-screen px-8 pt-12  ">
      <h1 className="text-[#d6482b] text-3xl text-center font-bold mb-6 sm:text-4xl md:text-5xl">
        My Auctions
      </h1>

      {loading && myAuctions.length === 0 ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-6">
          {myAuctions.length > 0 ? (
            myAuctions.map((element) => (
              <CardTwo
                key={element._id}
                id={element._id}
                title={element.title}
                startingBid={element.startingBid}
                startTime={element.startTime}
                endTime={element.endTime}
                imgSrc={
                  element.images && element.images.length > 0
                    ? element.images[0].url
                    : ""
                }
              />
            ))
          ) : (
            <h3 className="text-gray-500 text-xl font-semibold mt-8">
              You have not posted any auction.
            </h3>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAuction;
