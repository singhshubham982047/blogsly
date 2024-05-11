import React, { useEffect, useState } from "react";
import BlogCard from "../Components/BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlog, getBlogByCategory } from "../store/blogSlice";
import Loader from "../Components/loader/Loader";
import Layout from "../layout/Layout";

const Blog = () => {
  const [className, setClassName] = useState(false);

  const toggle = className ? "block" : "hidden";
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.blog);

  const handleCategory = (category) => {
    dispatch(getBlogByCategory(category));
    setClassName((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  const linkClassName = `text-sky-500 p-2 hover:text-sky-700 text-normal cursor-pointer`;

  if (loading) return <Loader />;
  if (!data)
    return (
      <div className="text-red-500 flex justify-center items-center h-screen">
        server error:500
      </div>
    );

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`fixed top-16 ml-3 md:hidden md:mt-3 p-2 rounded-sm text-gray-300 bg-sky-600 inline-flex items-center text-center  z-10  `}
        type="button"
        onClick={() => setClassName((prev) => !prev)}>
        Category
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdown"
        className={`fixed md:hidden top-28 md:top-32 translate-x-2  z-10 ${toggle} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition-all duration-200 ease-in-out`}>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton">
          <li
            className={linkClassName}
            onClick={() => handleCategory("education")}>
            Education
          </li>
          <li
            className={linkClassName}
            onClick={() => {
              handleCategory("technology");
            }}>
            Technology
          </li>
          <li
            className={linkClassName}
            onClick={() => handleCategory("health")}>
            Health
          </li>
          <li
            className={linkClassName}
            onClick={() => handleCategory("business")}>
            Business
          </li>
          <li
            className={linkClassName}
            onClick={() => handleCategory("lifehack")}>
            Life Hack
          </li>
          <li className={linkClassName} onClick={() => handleCategory("sport")}>
            Sport
          </li>
          <li
            className={linkClassName}
            onClick={() => handleCategory("agriculture")}>
            Agriculture
          </li>
          <li
            className={linkClassName}
            onClick={() => handleCategory("entertainment")}>
            Entertainment
          </li>
          <li
            className={linkClassName}
            onClick={() => {
              dispatch(getAllBlog());
              setClassName((prev) => !prev);
            }}>
            Miscellaneous
          </li>
        </ul>
      </div>

      <div className="flex flex-col">
        <div
          className="categories  fixed top-[52px] left-0 right-0 z-10
        bg-[#10172a] shadow-xl hidden m-3 md:flex flex-row items-center  justify-around h-[32px] ">
          <ul className="py-2 text-sm  dark:text-gray-200 flex flex-row ">
            <li
              className={linkClassName}
              onClick={() => handleCategory("education")}>
              Education
            </li>
            <li
              className={linkClassName}
              onClick={() => {
                handleCategory("technology");
              }}>
              Technology
            </li>
            <li
              className={linkClassName}
              onClick={() => handleCategory("health")}>
              Health
            </li>
            <li
              className={linkClassName}
              onClick={() => handleCategory("business")}>
              Business
            </li>
            <li
              className={linkClassName}
              onClick={() => handleCategory("lifehack")}>
              Life Hack
            </li>
            <li
              className={linkClassName}
              onClick={() => handleCategory("sport")}>
              Sport
            </li>
            <li
              className={linkClassName}
              onClick={() => handleCategory("agriculture")}>
              Agriculture
            </li>
            <li
              className={linkClassName}
              onClick={() => handleCategory("entertainment")}>
              Entertainment
            </li>
            <li
              className={linkClassName}
              onClick={() => {
                dispatch(getAllBlog());
                setClassName((prev) => !prev);
              }}>
              Miscellaneous
            </li>
          </ul>
        </div>
        {data.length === 0 && (
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
      </div>
    </>
  );
};

export default Layout()(Blog);
