import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/loader/Loader";
import PopularBlogs from "../Components/PopularBlogs";
import Layout from "../layout/Layout";

const Home = () => {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center  ">
        <div className="flex flex-col justify-center items-center m-8  rounded bg-[#1f293733]  shadow-lg ">
          <div className=" m-10  text-center">
            <p className="font-bold bg-gradient-to-r from-purple-600 via-pink-400 to-sky-600 text-transparent bg-clip-text  text-3xl sm:text-4xl md:text-4xl ">
              Share via writting your blog,
            </p>
            <p className="font-bold bg-gradient-to-r from-sky-600 via-pink-400 to-sky-600 text-transparent bg-clip-text text-3xl sm:text-4xl md:text-5xl">
              hope you enjoy
            </p>
            <div className="mt-2 text-[#b5b5b5]">
              <p>
                create your blog share and share your knowledge along the globe
              </p>
              <p>hope you enjoy!</p>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row md:m-5 mb-4 space-y-2 md:space-y-0">
            <button
              onClick={() =>
                isAuthenticated ? navigate("/create-blog") : navigate("/login")
              }
              className="relative p-0.5 inline-flex items-center justify-center text-white rounded-full  me-2 overflow-hidden shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  ">
              <span className="px-7 py-3 transition-all ease-in-out  bg-gray-900 rounded-full group-hover:bg-opacity-0">
                Create Blogs
              </span>
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="relative p-0.5 inline-flex items-center justify-center text-white rounded-full me-2 overflow-hidden shadow-lg transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  ">
              <span className=" px-[34px] py-3 transition-all ease-in-out bg-gray-900 rounded-full group-hover:bg-opacity-0">
                Read Blogs
              </span>
            </button>
          </div>
        </div>
      </div>
      <section id="popular">
        <div className=" border-b-4 w-full border-[#1a3d5a]"></div>

        <div className="flex justify-center items-center mt-4 text-2xl sm:text-5xl text-[#e5e7eb] font-bold">
          <h1>Popular Blogs</h1>
        </div>
        <div className="mt-3 ">
          <PopularBlogs />
        </div>
      </section>
      <section className="mb-10">
        <div className="w-full h-[240px] sm:h-[300px]  bg-[#1f2937af] rounded mt-3 mb-3 flex justify-center items-center flex-col ">
          <h1 className="text-2xl sm:text-5xl font-bold text-center text-gray-500 sm:mb-3  ">
            Share your knowledge <span className="text-[#5f6425]">& </span>
            thoughts around the globe by creating a blog
          </h1>
          <button
            onClick={() => navigate("/create-blog")}
            className="relative inline-flex items-center justify-center  text-xl mt-5 sm:mt-10  rounded   w-3/2 p-0.5 mb-2 me-2 overflow-hidden transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white ">
            <span className="relative px-5 py-2.5 transition-all ease-in   bg-gray-900 rounded group-hover:bg-opacity-0">
              Create Blogs
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Layout()(Home);
