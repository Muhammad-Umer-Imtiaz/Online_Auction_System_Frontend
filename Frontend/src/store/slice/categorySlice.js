// store/slice/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
  },
  reducers: {
    categoryRequest(state) {
      state.loading = true;
    },
    getAllCategorySuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    categorySuccess(state) {
      state.loading = false;
    },
    categoryFailed(state) {
      state.loading = false;
    },
  },
});

export const getAllCategories = () => async (dispatch) => {
  dispatch(categorySlice.actions.categoryRequest());
  try {
    const res = await axios.get(
      "https://online-auction-system-backend-pcyr.onrender.com/api/v1/category/getall"
    );
    dispatch(categorySlice.actions.getAllCategorySuccess(res.data.categories));
  } catch (error) {
    dispatch(categorySlice.actions.categoryFailed());
    toast.error(error.response?.data?.message || "Failed to load categories");
  }
};

export const createCategory = (data) => async (dispatch) => {
  dispatch(categorySlice.actions.categoryRequest());
  try {
    const res = await axios.post(
      "https://online-auction-system-backend-pcyr.onrender.com/api/v1/category/new",
      data,
      { withCredentials: true }
    );
    dispatch(categorySlice.actions.categorySuccess());
    toast.success(res.data.message);
  } catch (error) {
    dispatch(categorySlice.actions.categoryFailed());
    toast.error(error.response?.data?.message || "Failed to create category");
  }
};

export const updateCategory = (id, data) => async (dispatch) => {
  dispatch(categorySlice.actions.categoryRequest());
  try {
    const res = await axios.put(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/category/update/${id}`,
      data,
      { withCredentials: true }
    );
    dispatch(categorySlice.actions.categorySuccess());
    toast.success(res.data.message);
    dispatch(getAllCategories());
  } catch (error) {
    dispatch(categorySlice.actions.categoryFailed());
    toast.error(error.response?.data?.message || "Failed to update category");
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  dispatch(categorySlice.actions.categoryRequest());
  try {
    const res = await axios.delete(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/category/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(categorySlice.actions.categorySuccess());
    toast.success(res.data.message);
    dispatch(getAllCategories());
  } catch (error) {
    dispatch(categorySlice.actions.categoryFailed());
    toast.error(error.response?.data?.message || "Failed to delete category");
  }
};

export default categorySlice.reducer;
