import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../Components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../store/newsSlice";
import Loader from "../Components/loader/Loader";
import Layout from "../layout/Layout";

const News = () => {
  const [className, setClassName] = useState(false);
  const toggle = className ? "block" : "hidden";

  const linkClassName = `text-[#acb531] p-2 hover:border-b-2 hover:border-yellow-500 hover:font-bold cursor-pointer`;
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);
  const [category, setCategory] = useState("latest");

  useEffect(() => {
    dispatch(getNews(category));
  }, [category]);
  if (loading) return <Loader />;
  if (!news)
    return (
      <div className="text-red-500 flex justify-center items-center h-screen">
        <p className="m-3"> {error?.message}</p>
      </div>
    );
  return (
    <>
      <nav className="hidden md:flex justify-center items-center ">
        <ul className="flex m-2  space-x-3">
          <li className={linkClassName} onClick={() => setCategory("latest")}>
            Latest
          </li>
          <li
            className={linkClassName}
            onClick={() => setCategory("technology")}>
            Technology
          </li>
          <li className={linkClassName} onClick={() => setCategory("health")}>
            Health
          </li>
          <li className={linkClassName} onClick={() => setCategory("business")}>
            Business
          </li>
          <li className={linkClassName} onClick={() => setCategory("world")}>
            World
          </li>
          <li className={linkClassName} onClick={() => setCategory("sports")}>
            Sports
          </li>
          <li className={linkClassName} onClick={() => setCategory("science")}>
            Science
          </li>
          <li
            className={linkClassName}
            onClick={() => setCategory("entertainment")}>
            Entertainment
          </li>
        </ul>
      </nav>
      <div className="md:hidden m-3 ">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className={`text-white bg-[#a8b233] focus:outline-none  font-medium rounded text-sm px-5 py-2 text-center inline-flex items-center  `}
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
          className={`fixed  z-10  ${toggle} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton">
            <li className={linkClassName} onClick={() => setCategory("latest")}>
              Latest
            </li>
            <li
              className={linkClassName}
              onClick={() => setCategory("technology")}>
              Technology
            </li>
            <li className={linkClassName} onClick={() => setCategory("health")}>
              Health
            </li>
            <li
              className={linkClassName}
              onClick={() => setCategory("business")}>
              Business
            </li>
            <li className={linkClassName} onClick={() => setCategory("world")}>
              World
            </li>
            <li className={linkClassName} onClick={() => setCategory("sport")}>
              Sport
            </li>
            <li
              className={linkClassName}
              onClick={() => setCategory("science")}>
              Science
            </li>
            <li
              className={linkClassName}
              onClick={() => setCategory("entertainment")}>
              Entertainment
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-3">
        <NewsCard {...news} />
      </div>
    </>
  );
};

export default Layout()(News);
