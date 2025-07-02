import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../assets/Hero.png";
import GraphemeSplitter from "grapheme-splitter"; // npm i grapheme-splitter
import { TypeAnimation } from "react-type-animation"; // npm i react-type-animation

const HeroSection = () => {
  const splitter = new GraphemeSplitter();
  const navigate = useNavigate();

  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Welcome to <span className="text-blue-600">EZ Auction</span>
          </h1>

          <TypeAnimation
            splitter={(str) => splitter.splitGraphemes(str)}
            sequence={[
              "Win Auction to Follow these Step",
              2000,
              "Login or Signup",
              2000,
              "Bids on Auction",
              2000,
              "If You are highest Bidder then You got Email",
              2000,
              "After Payment of Wining Auction",
              2000,
              "Congargulation Product is Yours",
              2000,
              
            ]}
            wrapper="span"
            speed={50}
            className="block text-2xl sm:text-3xl font-semibold text-blue-600"
            repeat={Infinity}
          />

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Discover exclusive auctions with rare items up for bid. Join now to
            experience thrilling auctions and win incredible treasures.
          </p>

          <button
            onClick={() => navigate("/user/create-auction")}
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-6 py-3 rounded-xl shadow transition duration-300"
          >
            Join Auction
          </button>
        </div>

        {/* Right: Hero Image */}
        <div className="w-full md:w-1/2">
          <img
            src={Hero}
            alt="Auction Hero"
            className="w-full h-auto rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
