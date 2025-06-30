import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slice/categorySlice";
const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editMode) {
      dispatch(updateCategory(editId, { name }));
      setEditMode(false);
      setEditId(null);
    } else {
      dispatch(createCategory({ name })).then(() => {
        dispatch(getAllCategories());
      });
    }
    setName("");
  };

  const handleEdit = (category) => {
    setName(category.name);
    setEditMode(true);
    setEditId(category._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));

  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Categories</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-2 mb-6"
      >
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {editMode ? "Update" : "Add"} Category
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Category Name</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat, idx) => (
                <tr key={cat._id} className="border-t">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{cat.name}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category



