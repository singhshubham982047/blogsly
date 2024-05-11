import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const createBlog = createAsyncThunk(
  "create/blog",
  async (blogFormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${API}/blogs/create`,
        blogFormData.blogData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBlog = createAsyncThunk(
  "all/blogs",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/blogs?${query}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBlogByCategory = createAsyncThunk(
  "blog/category",
  async (category, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/blogs/${category}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserBlog = createAsyncThunk(
  "user/blogs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/blogs/my-blogs`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "get/single-blog",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/blogs/my-blog/${id}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "update/blog",
  async ({ blogData, blogId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${API}/blogs/update/${blogId}`,
        blogData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "delete/blog",
  async (blogId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API}/blogs/delete/${blogId}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: null,
    data: null,
    error: null,
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.newBlog;
        state.error = null;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.blogs;
        state.error = null;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getUserBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getUserBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.blogs;
        state.error = null;
      })
      .addCase(getUserBlog.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.blog;
        state.error = null;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.blog = null;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.updatedBlog;
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.blog = null;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.error = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.blog;
      })
      .addCase(getBlogByCategory.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
