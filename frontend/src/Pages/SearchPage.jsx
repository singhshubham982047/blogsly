import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllBlog } from "../store/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../Components/BlogCard";
import Loader from "../Components/loader/Loader";
import Layout from "../layout/Layout";

const SearchPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getAllBlog(urlParams));
  }, [location.search]);

  if (loading) return <Loader />;

  return (
    <>
      {data?.length === 0 && (
        <div className=" flex justify-center items-center h-screen m-auto">
          <h1 className="text-xl font-serif font-bold text-red-700">
            No Blog Found!
          </h1>
        </div>
      )}
      <div className=" p-3  md:p-10 mt-12  md:mt-14  justify-center items-center m-auto overflow-y-auto">
        {data &&
          data.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              summary={blog.summary}
              content={blog.content}
              createdAt={blog.createdAt}
              updatedAt={blog.updatedAt}
              author={blog.author?.fullname}
              url={blog.cover?.url}
            />
          ))}
      </div>
    </>
  );
};

export default Layout()(SearchPage);
