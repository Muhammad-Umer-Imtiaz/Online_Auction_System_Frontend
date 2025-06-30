import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../store/slice/userSlice";
import { Eye, EyeOff } from "lucide-react";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return alert("New password and confirm password do not match.");
        }

        const formData = {
            oldPassword,
            newPassword,
        };

        dispatch(updatePassword(formData));

        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 w-full py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Update Password</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Old Password */}
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Current Password</label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                className="w-full border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition pr-12"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                                onClick={() => setShowOld((v) => !v)}
                            >
                                {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    {/* New Password */}
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full border border-blue-200 bg-blue-50 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition pr-12"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                                onClick={() => setShowNew((v) => !v)}
                            >
                                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 font-semibold text-blue-700">Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full border border-blue-200 bg-blue-50 px-4 py-2 outline-none rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition pr-12"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                                onClick={() => setShowConfirm((v) => !v)}
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;