import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen  font-bold">
      <div className="m-3 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl text-center text-sky-600 mb-3">
          Oops!
        </h1>
        <h2 className="text-xl sm:text-3xl text-center text-red-50">
          404! you are lost...
        </h2>
        <Link
          to="/"
          className={
            "mt-3 p-0.5 border-2 border-sky-800   text-gray-300  relative inline-flex items-center justify-center me-2 overflow-hidden rounded group "
          }>
          <span className=" text-xl  p-2 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none">
            &#129060;
          </span>
          <span className=" p-2">Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Layout()(PageNotFound);
