import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({
  id,
  title,
  url,
  summary,
  author,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = (value) => {
    setIsHovered(value);
  };

  return (
    <div className="flex flex-col w-full  ">
      <div className=" border-2 border-sky-800 rounded mt-3">
        <div className="flex justify-center items-center   w-full">
          <img
            className="w-full object-cover h-[200px]  md:h-[300px] md:object-cover rounded "
            src={url}
            alt="cover"
          />
        </div>

        <div
          className=" relative text-center flex flex-col text-gray-300 justify-evenly items-center  w-full hover:bg-neutral-800/35 transition-all duration-300 ease-in-out  "
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}>
          <div className="   md:w-full flex flex-col justify-around items-center p-2">
            <h2 className="font-bold text-xl md:text-2xl ">{title}</h2>
            <p className="flex gap-1 sm:gap-2  text-gray-200 font-serif font-light ">
              @{author}
              {createdAt === updatedAt ? (
                <time className="">
                  {new Date(createdAt).toLocaleDateString()}
                </time>
              ) : (
                <>
                  <span>Updated:-</span>
                  <time>{new Date(updatedAt).toLocaleDateString()}</time>
                </>
              )}
            </p>
            <p>{summary}</p>

            {isHovered && (
              <button
                className="  absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 text-xl text-white rounded transition-all duration-300 ease-in-out hover:bg-blue-600"
                onClick={() => navigate(`/read-blog/${id}`)}>
                Read More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
