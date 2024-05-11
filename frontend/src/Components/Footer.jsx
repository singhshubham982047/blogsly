import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagramSquare,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <div className="border-b-2 border-[#1a3d5a]"></div>
      <div className=" uppercase flex justify-evenly items-center flex-col sm:flex-row   text-white p-2">
        <div>About Us</div>
        <div>
          <Link to={"/blogs"}>Blogs</Link>
        </div>
        <div>
          <Link to="/">Popular Blogs</Link>
        </div>
        <div>
          <Link to={"/contact"}>Contact Us</Link>
        </div>
      </div>
      <div className="border-b-2 border-[#1a3d5a] mx-12 sm:mx-20  lg:mx-40 "></div>
      <div className="flex justify-center items-center text-center p-3 mt-4 text-gray-300 text-sm font-medium">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          assumenda recusandae accusamus aperiam magni. Saepe impedit voluptatum
          iusto neque recusandae veritatis qui, ab deleniti perspiciatis fuga
          necessitatibus eius rerum aperiam.
        </p>
      </div>
      <div className="flex justify-center items-center space-x-3 text-2xl">
        <a href="" className="hover:text-blue-500">
          <FaFacebook />
        </a>
        <a href="" className="hover:text-red-400">
          <FaInstagramSquare />
        </a>
        <a href="" className="hover:text-gray-900">
          <FaXTwitter />
        </a>
        <a href="" className="hover:text-blue-500">
          <FaLinkedin />
        </a>
        <a href="">
          <FaGithub />
        </a>
      </div>
      <div className="flex justify-center items-center p-3 bg-[#1b3333] my-2 text-gray-100 ">
        ©{new Date().getFullYear()} Blog Site | Designed & Developed by &nbsp;
        {" Shubham Singh"}
      </div>
    </div>
  );
};

export default Footer;
