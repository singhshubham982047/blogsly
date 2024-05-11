import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBlog } from "../store/blogSlice.js";
import UserBlogCard from "../Components/UserBlogCard.jsx";
import Loader from "../Components/loader/Loader";
import Layout from "../layout/Layout.jsx";

const UserBlogs = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getUserBlog());
  }, []);

  if (loading) return <Loader />;
  if (!data)
    return (
      <div className="text-red-500 flex justify-center items-center h-screen">
        <p>{error?.message} </p>
      </div>
    );

  return (
    <div className="mt-10">
      {data.length > 0 ? (
        data.map((blog) => (
          <UserBlogCard
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
        ))
      ) : (
        <div className=" flex flex-col justify-center items-center m-10  ">
          <h1 className="text-5xl text-gray-500 font-bold">
            You have no blog Yet!
          </h1>
          <h2 className="text-5xl text-gray-500 font-bold">
            Do create Your first Blog
          </h2>
        </div>
      )}
    </div>
  );
};

export default Layout()(UserBlogs);
