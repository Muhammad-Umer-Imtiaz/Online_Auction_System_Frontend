import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../../store/slice/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    user?.profileImage?.url || "/default-profile.jpg"
  );
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user) {
      setValue("userName", user.userName);
      setValue("phone", user.phone);
      setValue("address", user.address);
      setValue("accountNo", user.accountNo);
      setValue("accountName", user.accountName);
      setValue("accountType", user.accountType);
    }
  }, [user, setValue]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("accountNo", data.accountNo);
    formData.append("accountName", data.accountName);
    formData.append("accountType", data.accountType);
    if (imageFile) formData.append("profileImage", imageFile);

    try {
      await dispatch(updateUserProfile(formData));
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-10 px-6 py-10 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="flex flex-col items-center gap-4">
          <img
            src={previewImage}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full shadow"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="flex-1 w-full">
          {!editMode ? (
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">{user?.userName}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-400 text-sm">Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
              <span className="inline-block px-4 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                Role: {user?.role}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="text-gray-700 font-medium">Username</label>
                <input
                  {...register("userName")}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Phone</label>
                <input
                  {...register("phone")}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Address</label>
                <input
                  {...register("address")}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Account Number</label>
                <input
                  {...register("accountNo")}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Account Name</label>
                <input
                  {...register("accountName")}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-700 font-medium">Account Type</label>
                <select
                  {...register("accountType")}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="SadaPay">SadaPay</option>
                  <option value="Meezan Bank">Meezan Bank</option>
                  <option value="HBL Bank">HBL Bank</option>
                  <option value="Bank AlFalah">Bank AlFalah</option>
                  <option value="Al Faisal Bank">Al Faisal Bank</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 font-medium">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="mt-1 w-full"
                />
              </div>

              <div className="col-span-full flex gap-4 mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setPreviewImage(user?.profileImage?.url || "/default-profile.jpg");
                    setImageFile(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {!editMode && (
        <div className="bg-blue-50 mt-10 p-6 rounded-xl border shadow text-gray-800 space-y-3">
          <h4 className="text-xl font-semibold border-b pb-2 mb-3">Account & Auction Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Account Name:</strong> {user?.userName || "-"}</p>
            <p><strong>Account No:</strong> {user?.accountNo || "-"}</p>
            <p><strong>Account Type:</strong> {user?.accountType || "-"}</p>
            <p><strong>Phone:</strong> {user?.phone || "-"}</p>
            <p><strong>Address:</strong> {user?.address || "-"}</p>
            <p><strong>Auctions Won:</strong> {user?.auctionsWOn || 0}</p>
            <p><strong>Money Spent:</strong> Rs. {user?.moneySpent || 0}</p>
            <p><strong>Unpaid Commission:</strong> Rs. {user?.unpaidComission || 0}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
