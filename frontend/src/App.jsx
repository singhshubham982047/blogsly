import React, { lazy, useEffect, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/userSlice";
import "./App.css";
import Loader from "./Components/loader/Loader";
import { getAllBlog } from "./store/blogSlice";
import ScrollToTop from "./Components/ScrollTotop";
import ScrollButton from "./Components/ScrollButton";
import ProtectedRoute from "./Components/ProtectedRoute";
import PageNotFound from "./Pages/PageNotFound";
import DashBoard from "./Pages/DashBoard";
import Blogs from "./Pages/Admin/Blogs";
import Users from "./Pages/Admin/Users";
import Home from "./Pages/Home";

const Blog = lazy(() => import("./Pages/Blog"));
const LogIn = lazy(() => import("./Pages/LogIn"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const CreateBlog = lazy(() => import("./Pages/CreateBlog"));
const UserBlogs = lazy(() => import("./Pages/UserBlogs"));
const UpadateBlog = lazy(() => import("./Pages/UpadateBlog"));
const ReadMore = lazy(() => import("./Pages/ReadMore"));
const News = lazy(() => import("./Pages/News"));
const Contact = lazy(() => import("./Pages/Contact"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllBlog());
  }, []);
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/news" element={<News />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/admin-panel" element={<DashBoard />} />
          <Route path="/admin-panel/users" element={<Users />} />
          <Route path="/admin-panel/blogs" element={<Blogs />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/my/blogs" element={<UserBlogs />} />
            <Route path="/my-blog/:blogId" element={<UpadateBlog />} />
          </Route>

          <Route path="/read-blog/:blogId" element={<ReadMore />} />
          <Route
            path="/user/reset-password/:tokenId"
            element={<ResetPassword />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <ScrollButton />
    </>
  );
}

export default App;
