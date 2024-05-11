import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;
export const getCommentByBlogId = createAsyncThunk(
  "get/comments",
  async (blogId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/comment/${blogId}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  "create/comment",
  async ({ comment, blogId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API}/comment/create/${blogId}`,
        { comment },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "delete/comment",
  async (commentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API}/comment/delete/${commentId}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeComment = createAsyncThunk(
  "like/comment",
  async (commentId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/comment/like/${commentId}`, {
        withCredentials: true,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    loading: false,
    comments: [{}],
    likeComment: [{}],
    newComment: {},
    commentCount: 0,
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentByBlogId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentByBlogId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;

        state.commentCount = action.payload.commentCount;
        state.error = null;
      })
      .addCase(getCommentByBlogId.rejected, (state, action) => {
        state.loading = false;
        state.comments = null;
        state.commentCount = 0;
        state.error = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
        state.newComment = action.payload.newComment;
        state.commentCount = state.commentCount + 1;
        state.error = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.newComment = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.comments = state.comments.filter((comment) => {
          return comment._id !== action.payload.deletedCommentId;
        });
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.loading = false;
        state.likeComment = action.payload.likeComment;
        state.error = null;
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
