import { deleteAuctionItem } from "../../store/slice/superAdminSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DeleteAuction = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  // Search and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  // Filter auctions based on search query
  const filteredAuctions = allAuctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start w-full py-10 px-4">
      <div className="w-full max-w-5xl rounded-2xl shadow-lg p-6 border border-blue-100 ">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Delete Auctions
        </h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full border border-blue-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 text-left font-semibold">Auction Image</th>
                <th className="py-3 px-4 text-left font-semibold">Title</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedAuctions.length > 0 ? (
                paginatedAuctions.map((element) => (
                  <tr
                    key={element._id}
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4">
                      <img
                        src={element?.images?.[0]?.url || "https://via.placeholder.com/100"}
                        alt="Auction"
                        className="h-16 w-24 object-cover rounded-lg border border-blue-100 shadow"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium">{element.title}</td>
                    <td className="py-3 px-4 flex flex-wrap gap-2">
                      <Link
                        to={`/auction/item/${element._id}`}
                        className="bg-blue-500 text-white py-1.5 px-4 rounded-md hover:bg-blue-700 transition font-semibold shadow"
                      >
                        View
                      </Link>
                      <button
                        className="bg-red-500 text-white py-1.5 px-4 rounded-md hover:bg-red-700 transition font-semibold shadow"
                        onClick={() => handleAuctionDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-lg text-blue-600 font-semibold">
                    No auctions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAuction;
