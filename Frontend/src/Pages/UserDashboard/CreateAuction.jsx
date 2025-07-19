import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { createAuction } from "../../store/slice/auctionSlice";
import Sidebar from "../../Components/Sidebar"; // <-- You imported it, so use it!

const CreateAuction = () => {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const imageHandler = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    const newImages = [...images, ...files];
    const newPreviews = [
      ...imagePreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ];

    setImages(newImages);
    setImagePreviews(newPreviews);

    // Clear file input value to allow re-upload of same file if needed
    e.target.value = null;
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...imagePreviews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleCreateAuction = (e) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      toast.error("Please select start and end times.");
      return;
    }
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime.toISOString());
    formData.append("endTime", endTime.toISOString());

    dispatch(createAuction(formData));
  };

  return (
    <div className="flex min-h-screen w-full">

      <main className="flex-1 flex items-start justify-center py-4 px-2 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="w-full max-w-4xl bg-transparent rounded-xl shadow-lg px-8 py-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#D6482B] mb-4">
            Create Auction
          </h1>
          <form onSubmit={handleCreateAuction} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-2">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-2">Starting Bid</label>
                <input
                  type="number"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-2">Start Time</label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">End Time</label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Upload Images (max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={imageHandler}
                className="w-full border border-gray-300 rounded-md px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#D6482B] file:text-white file:font-semibold hover:file:bg-[#b8381e]"
              />

              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {imagePreviews.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 border rounded-md overflow-hidden"
                    >
                      <img
                        src={src}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute -top-0 -right-1 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-xs font-bold hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mb-6 rounded-md text-lg font-semibold bg-[#D6482B] text-white hover:bg-[#b8381e] transition-colors"
            >
              {loading ? "Creating Auction..." : "Create Auction"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateAuction;
