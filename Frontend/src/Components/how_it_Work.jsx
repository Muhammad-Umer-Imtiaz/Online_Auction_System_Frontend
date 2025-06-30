import React from "react";

const HowItWork = () => {
  const processList = [
    {
      id: "01",
      title: "Sign up",
      desc: "Sign your car up via our contact form or via the WhatsApp chat on the website. Send us a couple of pictures of the car that you want to put up for auction.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/shape-7.png",
    },
    {
      id: "02",
      title: "Auction goes online",
      desc: "As soon as we collect enough cars for the auction (we strive for 25 to 40 cars per auction), the auction will show up on the website.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction.png",
    },
    {
      id: "03",
      title: "Closing auction",
      desc: "After the viewing day(s) the auction is still a few days open for new bids. We evaluate the highest bid after the closing of an auction.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction-2.png",
    },
    {
      id: "04",
      title: "The last steps",
      desc: "After the car is sold to the highest bidder, all the cars will be collected by the buyers on a determined date.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction-3.png",
    },
  ];

  return (
    <section className="relative bg-[#265A4D] py-20 px-4">
      {/* White overlay at the top */}
      <div className="absolute top-0 left-0 right-0 bg-white h-20 rounded-b-[40px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">How It Works</h2>
          <p className="text-lg text-gray-200">Easy 4 Steps to Win</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {processList.map((item) => (
            <div
              key={item.id}
              className="bg-[rgba(255,255,255,0.05)] border border-white/10 p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-4">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-200">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
