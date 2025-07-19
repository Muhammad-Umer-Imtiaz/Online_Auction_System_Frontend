import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
      state.error = null;
    },
    postCommissionProofSuccess(state) {
      state.loading = false;
    },
    postCommissionProofFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const commissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const res = await axios.post(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/commision-proof/post`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(commissionSlice.actions.postCommissionProofSuccess());
    toast.success(res.data.message);
  } catch (error) {
    dispatch(
      commissionSlice.actions.postCommissionProofFailed(
        error.response?.data?.message || "Submission failed"
      )
    );
    toast.error(error.response?.data?.message || "Submission failed");
  }
};

export const { clearErrors } = commissionSlice.actions;

export default commissionSlice.reducer;
