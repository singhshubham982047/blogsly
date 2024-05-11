import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const login = createAsyncThunk(
  "login",
  async (userData, { rejectWithValue }) => {
    try {
      const { username, password } = userData;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${API}/user/login`,
        {
          username,
          password,
        },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { fullname, username, email, password } = userData;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${API}/user/register`,
        {
          fullname,
          username,
          email,
          password,
        },
        config
      );

      return data.user;
    } catch (error) {
      rejectWithValue(error.response.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${API}/user/logout`, {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "load/user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/user/me`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API}/user/forgot-password`, {
        email,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "reset/password",
  async ({ newPassword, confirmPassword, tokenId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `${API}/user/reset-password/${tokenId}`,
        {
          newPassword,
          confirmPassword,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    message: "",
    error: false,
    serverError: false,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.serverError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.serverError = action.error;
      })
      .addCase(signup.pending, (state) => {
        (state.loading = true),
          (state.error = null),
          (state.isAuthenticated = false);
      })
      .addCase(signup.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.user = action.payload),
          (state.isAuthenticated = true);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.serverError = action.error;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = {};
        state.error = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
      })
      .addCase(loadUser.fulfilled, (state, acton) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = acton.payload.user;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;

        state.serverError = action.error;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const clearError = userSlice.actions.clearError;
export default userSlice.reducer;
