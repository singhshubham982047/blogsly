import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { clearError, logoutUser } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { RiMenu2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import { GrSearch } from "react-icons/gr";
import { IoCloseOutline } from "react-icons/io5";

const NavBar = () => {
  const [mobile, setMobile] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showInput, setShowInput] = useState(false);

  const mobileClass = mobile ? "right-0" : "right-[-100%]";
  const inputClass = showInput ? " right-[25px]" : "  hidden";

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const searchValueFromUrl = urlParams.get("search");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (searchValueFromUrl) setInputVal(searchValueFromUrl);
  }, [location.search]);

  const toggleMenu = () => {
    setMobile((prevMenu) => !prevMenu);
  };

  const notify = () => {
    if (error) return toast.error(error);
    return toast.success("Logged out successfully!");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    if (error) {
      notify();
      setTimeout(() => dispatch(clearError()), 2000);
    }
    toggleMenu();
    if (!error) {
      navigate("/login");
    }
  };

  const handleToggle = (path) => {
    navigate(path);
    toggleMenu();
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleInput = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("search", inputVal);
    const searchQuery = urlParams.toString();
    setInputVal("");
    navigate(`/search?${searchQuery}`);
  };

  const toggleBtn = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`flex fixed top-0 left-0 bg-[#1f2937] justify-between  md:justify-center items-center w-full h-16 text-center z-20 shadow-lg`}>
        <div className=" rounded ml-3 font-bold ">
          <h1
            className=" p-2  bg-gradient-to-r from-purple-600 to-sky-600 text-transparent bg-clip-text rounded-sm cursor-pointer hover:from-sky-500 hover:to-purple-500 select-none"
            onClick={() => navigate("/")}>
            BLOGSLY
          </h1>
        </div>
        <ul className="hidden md:flex  ml-auto mr-auto p-1 text-gray-400  font-normal text-lg  ">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              ` rounded-sm p-2  hover:bg-gradient-to-r from-purple-600 to-sky-600 hover:text-transparent bg-clip-text  ${
                isActive
                  ? `bg-gradient-to-r from-purple-600 to-sky-600 text-transparent bg-clip-text`
                  : ""
              }  `
            }>
            <li>Home</li>
          </NavLink>
          <NavLink
            to={"/blogs"}
            className={({ isActive }) =>
              ` rounded-sm p-2  hover:bg-gradient-to-r from-purple-600 to-sky-600 hover:text-transparent bg-clip-text  ${
                isActive
                  ? `bg-gradient-to-r from-purple-600 to-sky-600 text-transparent bg-clip-text`
                  : ""
              }  `
            }>
            <li>Blog</li>
          </NavLink>
          <NavLink
            to={"/news"}
            className={({ isActive }) =>
              ` rounded-sm p-2  hover:bg-gradient-to-r from-purple-600 to-sky-600 hover:text-transparent bg-clip-text  ${
                isActive
                  ? `bg-gradient-to-r from-purple-600 to-sky-600 text-transparent bg-clip-text`
                  : ""
              }  `
            }>
            <li>News</li>
          </NavLink>

          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              ` rounded-sm p-2  hover:bg-gradient-to-r from-purple-600 to-sky-600 hover:text-transparent bg-clip-text  ${
                isActive
                  ? `bg-gradient-to-r from-purple-600 to-sky-600 text-transparent bg-clip-text`
                  : ""
              }  `
            }>
            <li>Contact</li>
          </NavLink>
        </ul>
        <div className="hidden md:flex relative items-center mr-2 ">
          <form onSubmit={handleInput} className="items-center">
            <input
              type="search"
              name="search"
              id="search"
              value={inputVal}
              onChange={handleInputChange}
              placeholder="search for blog"
              className={`${inputClass} absolute top-[-10px] p-2 z-50 outline-none rounded border-2 border-sky-500 transition-all duration-200 ease-in-out text-gray-300`}
            />
            <button
              type="submit"
              className={`${inputClass} absolute right-[280px]`}></button>
            {showInput ? (
              <IoCloseOutline
                className={` text-xl text-sky-500 cursor-pointer`}
                onClick={toggleBtn}
              />
            ) : (
              <GrSearch
                className={` flex text-xl text-sky-500 cursor-pointer`}
                onClick={toggleBtn}
              />
            )}
          </form>
        </div>
        <div className="mr-0 hidden md:flex ">
          <ul className="flex text-gray-400">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/create-blog")}
                  className="relative inline-flex items-center justify-center me-2 overflow-hidden p-0.5 mr-2 w-[105px] cursor-pointer rounded  group hover:bg-gradient-to-br from-purple-600 to-blue-500  ">
                  <span className="p-2 transition-all ease-in-out rounded bg-[#1f2937] ">
                    Create Blog
                  </span>
                </button>
                <button
                  onClick={() => navigate("/my/blogs")}
                  className="relative inline-flex items-center justify-center me-2 overflow-hidden p-0.5 mr-2 w-[105px] cursor-pointer rounded  group hover:bg-gradient-to-br from-purple-600 to-blue-500  ">
                  <span className="relative py-2 px-[15.5px] transition-all rounded ease-in-out  bg-[#1f2937] ">
                    Your Blog
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center justify-center p-0.5 mr-2 w-[105px] cursor-pointer me-2 rounded   group bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white transition-all duration-200 ease-in-out">
                  <span className="py-2 px-[23px] transition-all ease-in-out rounded bg-[#1f2937] hover:from-purple-500 hover:to-blue-600 hover:bg-gradient-to-r ">
                    LogOut
                  </span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={"/login"}
                  className={`relative p-0.5 inline-flex items-center justify-center mr-3 w-24 me-2 rounded group bg-gradient-to-br from-purple-600 to-blue-500 `}>
                  <li
                    className="py-2 px-[26px] bg-[#1f2937] rounded  cursor-pointer 
                  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 hover:text-white transition-all duration-200 ease-in-out">
                    Login
                  </li>
                </NavLink>
                <NavLink
                  to={"/signup"}
                  className={`relative p-0.5 inline-flex items-center justify-center mr-3 w-24 me-2 rounded group bg-gradient-to-br from-purple-600 to-blue-500 `}>
                  <li
                    className="py-2 px-[21px] bg-[#1f2937] rounded  cursor-pointer 
                     hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 hover:text-white transition-all duration-200 ease-in-out">
                    Signup
                  </li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
        <div className="md:hidden fixed right-4 ">
          <button
            onClick={toggleMenu}
            className="p-2 text-2xl text-sky-500  hover:text-gray-400">
            <RiMenu2Fill />
          </button>
        </div>
        <div className="">
          <ul
            className={`md:hidden fixed top-0 ${mobileClass} z-50 h-screen flex flex-col w-full space-y-3  bg-[#1a3d5a] items-center justify-center transition-all duration-700 ease-in-out text-2xl text-gray-300
          `}>
            <li
              onClick={toggleMenu}
              className="p-2 cursor-pointer text-xl  text-white  hover:text-sky-500 absolute top-4 right-4 ">
              <TfiClose />
            </li>
            <form
              onSubmit={handleInput}
              className="absolute flex top-10 left-2 md:hidden  items-center border-2 border-sky-800 rounded">
              <input
                type="search"
                name="search"
                id="search"
                value={inputVal}
                onChange={handleInputChange}
                placeholder="search for blog"
                required
                className={` p-2 w-3/4  outline-none   transition-all duration-200 ease-in-out text-gray-300 text-sm`}
              />
              <button type="submit" className="ml-3 ">
                <GrSearch
                  className={` flex text-xl text-sky-500 cursor-pointer`}
                />
              </button>
            </form>
            <NavLink
              to={"/"}
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` hover:text-sky-500 rounded-sm p-2  ${
                  isActive ? `text-sky-500` : ""
                }  `
              }>
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/blogs"}
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` hover:text-sky-500 rounded-sm p-2  ${
                  isActive ? `text-sky-500` : ""
                }  `
              }>
              <li>Blog</li>
            </NavLink>
            <NavLink
              to={"/news"}
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` hover:text-sky-500 rounded-sm p-2  ${
                  isActive ? `text-sky-500` : ""
                }  `
              }>
              <li>News</li>
            </NavLink>

            <NavLink
              to={"/contact"}
              onClick={toggleMenu}
              className={({ isActive }) =>
                ` hover:text-sky-500 rounded-sm p-2  ${
                  isActive ? `text-sky-500` : ""
                }  `
              }>
              <li>Contact</li>
            </NavLink>
            <div className="  ">
              <ul className="flex flex-col text-gray- ">
                {isAuthenticated ? (
                  <>
                    <li
                      onClick={() => handleToggle("/create-blog")}
                      className="p-2 hover:text-sky-500 cursor-pointer">
                      Create Blog
                    </li>
                    <li
                      onClick={() => handleToggle("/my/blogs")}
                      className=" p-2 hover:text-sky-500  cursor-pointer">
                      Your Blog
                    </li>{" "}
                    <li
                      onClick={handleLogout}
                      className="p-2 hover:text-sky-500 cursor-pointer">
                      Logout
                    </li>
                  </>
                ) : (
                  <>
                    <NavLink
                      to={"/login"}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        ` hover:border-b-2 rounded-sm p-2 hover:border-black hover:font-bold hover:text-color-600 ${
                          isActive ? `border-b-2 border-black` : ""
                        }  `
                      }>
                      <li>Login</li>
                    </NavLink>
                    <NavLink
                      to={"/signup"}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        ` hover:border-b-2 rounded-sm p-2 hover:border-black hover:font-bold hover:text-color-600 ${
                          isActive ? `border-b-2 border-black` : ""
                        }  `
                      }>
                      <li>Signup</li>
                    </NavLink>
                  </>
                )}
              </ul>
            </div>
          </ul>
        </div>

        <Toaster />
      </nav>
    </>
  );
};

export default NavBar;
