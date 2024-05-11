import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import blogSlice from "./blogSlice";
import commentSlice from "./commentSlice";
import newsSlice from "./newsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    blog: blogSlice,
    news: newsSlice,
    comments: commentSlice,
  },
  devTools: true,
});

export default store;
