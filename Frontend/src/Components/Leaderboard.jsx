import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  const getRankColor = (index) => {
    if (index === 0) return "text-yellow-500";
    if (index === 1) return "text-gray-400";
    if (index === 2) return "text-orange-400";
    return "text-gray-600";
  };

  return (
    <section className="my-10 px-4 sm:px-6 lg:px-12">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Top 10 <span className="text-orange-600">Bidders Leaderboard</span>
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Track the highest spenders and auction winners on the platform.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-[700px] w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-left text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Profile</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Spent</th>
              <th className="py-3 px-4">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm sm:text-base">
            {leaderboard.slice(0, 10).map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className={`py-3 px-4 font-bold ${getRankColor(index)}`}>
                  {index + 1}
                </td>
                <td className="py-3 px-4">
                  <img
                    src={user.profileImage?.url}
                    alt={user.userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{user.userName}</td>
                <td className="py-3 px-4 text-orange-600 font-semibold">
                  Rs.{user.moneySpent}
                </td>
                <td className="py-3 px-4 text-green-600 font-medium">
                  {user.auctionsWOn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Leaderboard;
