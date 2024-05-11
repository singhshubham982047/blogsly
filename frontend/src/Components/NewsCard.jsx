import React from "react";

const NewsCard = ({ ...news }) => {
  return (
    <div className="bg-gray-300 m-3 p-2">
      {news &&
        news.items?.map((data, index) => (
          <div className="" key={index + 1}>
            <h1 className="font-bold text-xl ">{data.title}</h1>
            <img src={data?.images?.thumbnailProxied} alt="" />
            <p className="font-serif">{data.snippet}</p>

            <p>Publisher: {data.publisher}</p>
            <a
              href={data.newsUrl}
              target="_blank"
              className="hover:text-blue-700">
              Read More
            </a>
          </div>
        ))}
    </div>
  );
};

export default NewsCard;
