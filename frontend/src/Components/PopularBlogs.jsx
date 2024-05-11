import React, { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../store/blogSlice";

const PopularCard = ({ url, summary, id }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = (value) => {
    setIsHovered(value);
  };

  return (
    <>
      <div
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        key={id}
        className="flex flex-col  min-w-60 w-80 text-center rounded text-gray-300 shadow-2xl transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300 space-y-1 border-2 border-blue-950">
        <img src={url} alt="" className="rounded h-[150px] object-cover" />

        <p className=" text-center ">{summary}</p>

        {isHovered && (
          <button
            className=" absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2  p-2  bg-blue-500 text-xl text-white rounded transition-all duration-300 ease-in-out hover:bg-sky-500"
            onClick={() => navigate(`/read-blog/${id}`)}>
            Read More
          </button>
        )}
      </div>
    </>
  );
};

const PopularBlogs = () => {
  const { data, loading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlog());
  }, []);

  if (loading) return <Loader />;
  if (!data)
    return (
      <div className=" flex justify-center items-center h-[250px] ">
        <h1 className="text-xl font-serif  text-red-500">
          Internal server Error:500!
        </h1>
      </div>
    );

  return (
    <div className="flex flex-row p-5 space-x-3 overflow-x-auto w-full ">
      {data.length > 0 &&
        data.map((item) => (
          <PopularCard
            key={item._id}
            url={item.cover?.url}
            summary={item.summary}
            id={item._id}
          />
        ))}
    </div>
  );
};

export default PopularBlogs;
