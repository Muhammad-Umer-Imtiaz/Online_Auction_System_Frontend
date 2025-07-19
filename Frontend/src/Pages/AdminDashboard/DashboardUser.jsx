import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUserForDashboard } from "../../store/slice/superAdminSlice";

const DashboardUser = () => {
    const { getUsers, loading } = useSelector((state) => state.superAdmin);
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        if (!isAuthenticated) {
            navigateTo("/");
            return;
        }
        dispatch(getUserForDashboard());
    }, [dispatch, isAuthenticated, navigateTo]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    const filteredUsers = getUsers.filter((user) =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="p-4 sm:p-6 max-w-full overflow-x-auto mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin - Manage Users</h1>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="text-gray-600">Total: {filteredUsers.length}</div>
            </div>

            {loading ? (
                <p className="text-center text-lg">Loading users...</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow-md">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-blue-100 text-blue-900">
                                <th className="p-3 text-left">Profile</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <tr key={user._id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">
                                            <img
                                                src={user.profileImage?.url || "https://via.placeholder.com/40"}
                                                alt={user.userName}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="p-3">{user.userName}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Controls */}
            {filteredUsers.length > usersPerPage && (
                <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${
                            currentPage === 1
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${
                            currentPage === totalPages
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardUser;
