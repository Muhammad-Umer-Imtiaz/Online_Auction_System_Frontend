// src/store/slice/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
    error: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = {};
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loadUserRequest(state) {
      state.loading = true;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    fetchLeaderboardRequest(state) {
      state.loading = true;
    },
    fetchLeaderboardSuccess(state, action) {
      state.loading = false;
      state.leaderboard = action.payload;
    },
    fetchLeaderboardFailed(state, action) {
      state.loading = false;
      state.leaderboard = [];
      state.error = action.payload;
    },
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordrequest(state) {
      state.loading = true;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    forgetPasswordRequest(state) {
      state.loading = true;
    },
    forgetPasswordSuccess(state) {
      state.loading = false;
    },
    forgetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest(state) {
      state.loading = true;
    },
    resetPasswordSuccess(state) {
      state.loading = false;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state) {
      state.error = null;
    },
  },
});

// --- Async Thunks ---

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const res = await axios.post(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/register`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess({ user: res.data.user }));
    toast.success(res.data.message);
  } catch (error) {
    dispatch(
      userSlice.actions.registerFailed(
        error.response?.data?.message || "Register failed"
      )
    );
    toast.error(error.response?.data?.message || "Register failed");
  } finally {
    dispatch(userSlice.actions.clearErrors());
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const res = await axios.post(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/login`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.loginSuccess({ user: res.data.user }));
    toast.success(res.data.message);
  } catch (error) {
    dispatch(
      userSlice.actions.loginFailed(
        error.response?.data?.message || "Login failed"
      )
    );
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    dispatch(userSlice.actions.clearErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(userSlice.actions.logoutRequest());
    const res = await axios.get(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/logout`,
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess());
    toast.success(res.data.message);
  } catch (error) {
    dispatch(
      userSlice.actions.logoutFailed(
        error.response?.data?.message || "Logout failed"
      )
    );
    toast.error(error.response?.data?.message || "Logout failed");
  } finally {
    dispatch(userSlice.actions.clearErrors());
  }
};
export const loadUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const res = await axios.get(
      "https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/me",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.loadUserSuccess(res.data.user));
  } catch (error) {
    dispatch(
      userSlice.actions.loadUserFailed(
        error.response?.data?.message || "Load user failed"
      )
    );
  } finally {
    dispatch(userSlice.actions.clearErrors());
  }
};
export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/leaderboard`,
      {
        withCredentials: true,
      }
    );
    dispatch(fetchLeaderboardSuccess(response.data.leaderboard));
    dispatch(clearErrors());
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || "Fetching leaderboard failed.";
    dispatch(fetchLeaderboardFailed(errMsg));
  }
};
export const updateUserProfile = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const res = await axios.put(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/update-profile`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(res.data.user));
    toast.success(res.data.message || "Profile updated successfully");
  } catch (error) {
    const message = error.response?.data?.message || "Profile update failed";
    dispatch(userSlice.actions.updateProfileFailed(message));
    toast.error(error.response?.data?.message);
  }
};

export const updatePassword = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.updatePasswordrequest());
  try {
    const res = await axios.put(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/update-password`,
      formData,
      { withCredentials: true }
    );
    dispatch(userSlice.actions.updatePasswordSuccess(res.data.user));
    toast.success(res.data.message || "password Updated");
  } catch (error) {
    dispatch(userSlice.actions.updatePasswordFailed());
    toast.error(error.response?.data?.message);
  }
};
export const forgetPassword = (email) => async (dispatch) => {
  dispatch(userSlice.actions.forgetPasswordRequest());
  try {
    const res = await axios.post(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/password/forgot`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.forgetPasswordSuccess());
    toast.success(res.data.message || "Password reset link sent.");
  } catch (error) {
    dispatch(
      userSlice.actions.forgetPasswordFailed(
        error.response?.data?.message || "Forget password failed"
      )
    );
    toast.error(error.response?.data?.message || "Forget password failed");
  } finally {
    dispatch(userSlice.actions.clearErrors());
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  dispatch(userSlice.actions.resetPasswordRequest());
  try {
    const res = await axios.put(
      `https://online-auction-system-backend-pcyr.onrender.com/api/v1/user/password/reset/${token}`,
      { password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(userSlice.actions.resetPasswordSuccess());
    toast.success(res.data.message || "Password reset successful.");
  } catch (error) {
    dispatch(
      userSlice.actions.resetPasswordFailed(
        error.response?.data?.message || "Reset password failed"
      )
    );
    toast.error(error.response?.data?.message || "Reset password failed");
  } finally {
    dispatch(userSlice.actions.clearErrors());
  }
};

// --- Exports ---
export const {
  loginFailed,
  loginSuccess,
  logoutSuccess,
  logoutFailed,
  clearErrors,
  loadUserRequest,
  fetchLeaderboardRequest,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailed,
  loadUserSuccess,
  loadUserFailed,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} = userSlice.actions;

export default userSlice.reducer;
