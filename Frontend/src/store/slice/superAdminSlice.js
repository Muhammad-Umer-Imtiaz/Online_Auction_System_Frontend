import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllAuctionItems } from "./auctionSlice";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    allUsers: [],
    paymentProofs: [],
    error: null,
    getUsers: [],
    singlePaymentProof: {},
  },
  reducers: {
    requestForMonthlyRevenue(state) {
      state.loading = true;
      state.monthlyRevenue = [];
    },
    successForMonthlyRevenue(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    failedForMonthlyRevenue(state) {
      state.loading = false;
      state.monthlyRevenue = [];
    },

    requestForAllUsers(state) {
      state.loading = true;
      state.allUsers = [];
    },
    successForAllUsers(state, action) {
      state.loading = false;
      state.allUsers = action.payload.users;
    },
    failureForAllUsers(state) {
      state.loading = false;
      state.allUsers = [];
    },

    requestForPaymentProofs(state) {
      state.loading = true;
      state.paymentProofs = [];
    },
    successForPaymentProofs(state, action) {
      state.loading = false;
      state.paymentProofs = action.payload;
    },
    failureForPaymentProofs(state) {
      state.loading = false;
      state.paymentProofs = [];
    },

    requestForDeletePaymentProof(state) {
      state.loading = true;
    },
    successForDeletePaymentProof(state) {
      state.loading = false;
    },
    failureForDeletePaymentProof(state) {
      state.loading = false;
    },
    requestForGetUsers(state) {
      state.loading = true;
      state.getUsers = [];
    },
    successForGetUsers(state, action) {
      state.loading = false;
      state.getUsers = action.payload;
    },
    failureForGetusers(state) {
      state.loading = false;
      state.getUsers = [];
    },
    requestForSinglePaymentProofDetail(state) {
      state.loading = true;
      state.singlePaymentProof = {};
    },
    successForSinglePaymentProofDetail(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    failureForSinglePaymentProofDetail(state) {
      state.loading = false;
      state.singlePaymentProof = {};
    },

    requestForUpdatePaymentProof(state) {
      state.loading = true;
    },
    successForUpdatePaymentProof(state) {
      state.loading = false;
    },
    failureForUpdatePaymentProof(state) {
      state.loading = false;
    },

    requestForAuctionItemDelete(state) {
      state.loading = true;
    },
    successForAuctionItemDelete(state) {
      state.loading = false;
    },
    failureForAuctionItemDelete(state) {
      state.loading = false;
    },
    requestForDeletUser(state) {
      state.loading = true;
    },
    successForDeletUser(state) {
      state.loading = false;
    },
    failureForDeletUser(state) {
      state.loading = false;
    },

    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// ================== THUNKS ===================

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/admin/monthlyincome",
      { withCredentials: true }
    );
    toast.success(response.data.success);
    dispatch(
      superAdminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(superAdminSlice.actions.failedForMonthlyRevenue());
    console.error(error.response?.data?.message || error.message);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAllUsers());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/admin/users/getall",
      { withCredentials: true }
    );
    console.log(response);
    dispatch(
      superAdminSlice.actions.successForAllUsers({
        users: response.data.monthlyUserCounts,
      })
    );
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForAllUsers());
    console.error(error.response?.data?.message || error.message);
  }
};

export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForPaymentProofs());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/admin/paymentproofs/getall`,
      { withCredentials: true }
    );
    console.log(response);
    dispatch(
      superAdminSlice.actions.successForPaymentProofs(
        response.data.paymentProofs
      )
    );
  } catch (error) {
    console.log(error);
    dispatch(superAdminSlice.actions.failureForPaymentProofs());
    console.error(error.response?.data?.message || error.message);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForDeletePaymentProof());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/admin/paymentproof/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForDeletePaymentProof());
    dispatch(getAllPaymentProofs());
    toast.success(response.data.message);
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForDeletePaymentProof());
    console.error(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || error.message);
  }
};

export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForSinglePaymentProofDetail());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/admin/paymentproof/${id}`,
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.successForSinglePaymentProofDetail(
        response.data.paymentProofDetail
      )
    );
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForSinglePaymentProofDetail());
    console.error(error.response?.data?.message || error.message);
  }
};

export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForUpdatePaymentProof());
  try {
    const response = await axios.put(
      `http://localhost:5000/api/v1/admin/paymentproof/status/update/${id}`,
      { status, amount },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(superAdminSlice.actions.successForUpdatePaymentProof());
    toast.success(response.data.message);
    dispatch(getAllPaymentProofs());
    dispatch(superAdminSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForUpdatePaymentProof());
    console.error(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || error.message);
  }
};

export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAuctionItemDelete());
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/admin/auctionitem/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForAuctionItemDelete());
    toast.success(response.data.message);
    dispatch(getAllAuctionItems());
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForAuctionItemDelete());
    console.error(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || error.message);
  }
};
export const getUserForDashboard = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForGetUsers());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/admin/getuser`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForGetUsers(response.data.users));
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForGetusers());
    console.log(error);
  }
};
export const deleteUser = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForDeletUser());
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/v1/admin/deleteuser/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.successForDeletUser());
    toast.success(res.data.message);
    dispatch(getAllUsers()); // Refresh user list
  } catch (error) {
    dispatch(superAdminSlice.actions.failureForDeletUser());
    console.error(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || error.message);
  }
};

export const clearAllSuperAdminSliceErrors = () => (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;
