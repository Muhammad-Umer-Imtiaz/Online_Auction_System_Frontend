import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "../store/slice/auctionSlice";

// ==================== CardTwo =====================

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const dispatch = useDispatch();

  const calculateTimeLeft = () => {
    const now = new Date();
    const startDiff = new Date(startTime) - now;
    const endDiff = new Date(endTime) - now;

    if (startDiff > 0) {
      return {
        type: "Starts In:",
        days: Math.floor(startDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDiff / 1000 / 60) % 60),
        seconds: Math.floor((startDiff / 1000) % 60),
      };
    } else if (endDiff > 0) {
      return {
        type: "Ends In:",
        days: Math.floor(endDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDiff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDiff / 1000 / 60) % 60),
        seconds: Math.floor((endDiff / 1000) % 60),
      };
    }
    return {};
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const imageUrl = Array.isArray(imgSrc) && imgSrc.length > 0
    ? imgSrc[0]?.url || imgSrc[0]
    : typeof imgSrc === "string"
    ? imgSrc
    : "";

  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <div className="basis-full bg-white rounded-md group sm:basis-56 lg:basis-60 2xl:basis-80 shadow hover:shadow-md transition">
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-[4/3] object-cover rounded-t-md"
        />
        <div className="px-2 pt-4 pb-2">
          <h5 className="font-semibold text-[18px] group-hover:text-[#d6482b] mb-2">
            {title}
          </h5>
          {startingBid && (
            <p className="text-stone-600 font-light">
              Starting Bid:
              <span className="text-[#fdba88] font-bold ml-1">{startingBid}</span>
            </p>
          )}
          <p className="text-stone-600 font-light">
            {timeLeft.type}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#fdba88] font-bold ml-1">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#fdba88] font-bold ml-1">Time's up!</span>
            )}
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <Link
              to={`/auction/item/${id}`}
              className="bg-stone-700 text-center text-white text-xl px-4 py-2 rounded-md transition hover:bg-black"
            >
              View Auction
            </Link>
            <button
              onClick={handleDeleteAuction}
              className="bg-red-400 text-white text-xl px-4 py-2 rounded-md transition hover:bg-red-600"
            >
              Delete Auction
            </button>
            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
              className="bg-sky-400 text-white text-xl px-4 py-2 rounded-md transition hover:bg-sky-700 disabled:opacity-50"
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>

      {openDrawer && (
        <Drawer id={id} setOpenDrawer={setOpenDrawer} />
      )}
    </>
  );
};

export default CardTwo;

// ==================== Drawer =====================

const Drawer = ({ setOpenDrawer, id }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startingBid, setStartingBid] = useState("");

  const handleRepublishAuction = () => {
    if (!startTime || !endTime || !startingBid) return alert("All fields are required!");

    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("startingBid", startingBid);

    dispatch(republishAuction(id, formData));
    setOpenDrawer(false);
  };

  return (
    <section className={`fixed bottom-0 left-0 w-full h-full bg-[#00000087] flex items-end transition-all duration-300`}>
      <div className="bg-white w-full sm:max-w-[640px] m-auto h-fit px-5 py-8">
        <h3 className="text-[#D6482B] text-3xl font-semibold text-center mb-1">
          Republish Auction
        </h3>
        <p className="text-stone-600 text-center">
          Republish with new start/end time and starting bid.
        </p>

        <form className="flex flex-col gap-5 mt-5">
          <div>
            <label className="text-stone-600">Start Time</label>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full py-2 border-b border-stone-500 focus:outline-none bg-transparent"
            />
          </div>

          <div>
            <label className="text-stone-600">End Time</label>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full py-2 border-b border-stone-500 focus:outline-none bg-transparent"
            />
          </div>

          <div>
            <label className="text-stone-600">Starting Bid (PKR)</label>
            <input
              type="number"
              min="0"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              placeholder="Enter starting bid"
              className="w-full py-2 border-b border-stone-500 focus:outline-none bg-transparent"
            />
          </div>

          <button
            type="button"
            onClick={handleRepublishAuction}
            className="bg-blue-500 text-white text-xl py-2 rounded-md transition hover:bg-blue-700"
          >
            {loading ? "Republishing..." : "Republish"}
          </button>

          <button
            type="button"
            onClick={() => setOpenDrawer(false)}
            className="bg-yellow-500 text-white text-xl py-2 rounded-md transition hover:bg-yellow-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};
