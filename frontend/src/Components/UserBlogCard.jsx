import React from "react";
import { useNavigate } from "react-router-dom";

const UserBlogCard = ({
  id,
  title,
  content,
  url,
  summary,
  author,
  createdAt,
  updatedAt,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full ">
      <div className="p-5  w-3/4 m-auto">
        <div className="flex justify-center items-center mt-3 w-full">
          <img
            className="w-full object-cover h-[200px]  md:h-[300px] md:object-cover "
            src={url}
            alt="cover"
          />
        </div>
        <div className="mt-3 text-center flex flex-col  justify-evenly items-center text-gray-300 w-full">
          <div className="bg-[#1e293f] rounded md:w-full flex flex-col justify-around items-center p-2">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p className="flex gap-4 text-gray-400 font-serif">
              {createdAt === updatedAt ? (
                <time>{new Date(createdAt).toLocaleDateString()}</time>
              ) : (
                <>
                  <span>Updated</span>
                  <time>{new Date(updatedAt).toLocaleDateString()}</time>
                </>
              )}
            </p>
            <p>{summary}</p>
            <button
              className="p-2 border-2 rounded hover:text-blue border-sky-500 mr-2 w-[105px] text-white  cursor-pointer"
              onClick={() => navigate(`/my-blog/${id}`)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlogCard;
