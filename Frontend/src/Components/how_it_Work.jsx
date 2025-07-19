import React from "react";

const HowItWork = () => {
  const processList = [
    {
      id: "01",
      title: "User Registration",
      desc: "Start by creating an account by providing your username, email, password, and a profile image. This gives you access to all auction features including bidding and listing items.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/01/shape-7.png",
    },
    {
      id: "02",
      title: "Create an Auction",
      desc: "Once registered, you can create an auction by submitting item details, images, and a starting time. If the start time is in the future, your auction will be listed under 'Upcoming Auctions' and will automatically go live at the scheduled time.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction.png",
    },
    {
      id: "03",
      title: "Live Bidding",
      desc: "When the auction starts, it becomes available for bidding. Registered users can place bids in real-time until the auction ends. The highest bidder at the closing time wins the item.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction-2.png",
    },
    {
      id: "04",
      title: "Payment & Handover",
      desc: "After the auction ends, the winning bidder must contact the item owner to arrange payment and delivery or pickup. Online Payment is also accepted our system provide you a number of both User and Product Owner.",
      cover: "https://rainbowthemes.net/themes/nuron/wp-content/uploads/2023/09/auction-3.png",
    },
  ];


  return (
    <section className="relative bg-[#265A4D] py-20 px-4">
      {/* White overlay at the top */}
      <div className="absolute top-0 left-0 right-0 bg-white h-20 rounded-b-[40px] z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 py-4">How It Works</h2>
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
