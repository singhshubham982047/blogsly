import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getNews = createAsyncThunk(
  "get/news",
  async (category = "latest", { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        url: `https://google-news13.p.rapidapi.com/${category}`,
        params: { lr: "en-US" },
        headers: {
          "X-RapidAPI-Key":
            "aaef7136b0msh3f6f0ef834d1ba7p1a6feajsn78942071f131",
          "X-RapidAPI-Host": "google-news13.p.rapidapi.com",
        },
      };

      const { data } = await axios.request(options);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const NewsSlice = createSlice({
  name: "news",
  initialState: {
    loading: false,
    news: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
        state.error = null;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.news = null;
        state.error = action.payload;
      });
  },
});

export default NewsSlice.reducer;
