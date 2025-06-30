import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../Components/Card';
import Spinner from '../Components/Spinner';

const AuctionPage = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const auctionsPerPage = 12;

  const filteredAuctions = allAuctions
    .filter((auction) =>
      auction.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((auction) => {
      const now = new Date();
      const start = new Date(auction.startTime);
      const end = new Date(auction.endTime);

      if (filter === 'upcoming') return start > now;
      if (filter === 'ended') return end < now;
      return true;
    })
    .sort((a, b) => {
      if (filter === 'lowToHigh') return a.startingBid - b.startingBid;
      if (filter === 'highToLow') return b.startingBid - a.startingBid;
      if (filter === 'latest') return new Date(b.startTime) - new Date(a.startTime);
      return 0;
    });

  const totalPages = Math.ceil(filteredAuctions.length / auctionsPerPage);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * auctionsPerPage,
    currentPage * auctionsPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="w-full h-full px-4 pt-8 bg-[#f9f9f9] min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-[#d6482b] text-4xl sm:text-5xl font-bold drop-shadow-md">
              Explore Live Auctions
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mt-2">
              Bid smart. Win big. Discover amazing items!
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Search auctions..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="latest">Latest</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="upcoming">Upcoming</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          {/* Auction Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paginatedAuctions.length > 0 ? (
              paginatedAuctions.map((auction) => (
                <Card
                  key={auction._id}
                  id={auction._id}
                  title={auction.title}
                  startTime={auction.startTime}
                  endTime={auction.endTime}
                  imgSrc={auction.images}
                  startingBid={auction.startingBid}
                  currentBid = {auction.currentBid}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg font-medium py-10">
                No auctions match your search or filter.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AuctionPage;
