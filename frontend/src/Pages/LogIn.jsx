import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../store/userSlice";
import Loader from "../Components/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout/Layout";

const LogIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, token, error, user, serverError } =
    useSelector((state) => state.user);

  const notify = () =>
    toast.error((error && error?.message) || (serverError && "server error"));

  // const notify2 = () => toast.success(user && `Welcome  ${user?.fullname}`);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
    setUserName("");
    setPassword("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      // notify2();
    }
    if (error || serverError) {
      notify();
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [isAuthenticated, navigate, dispatch, error, serverError]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col  justify-center items-center   w-full h-screen">
      <h1 className="text-3xl font-bold  bg-gradient-to-r from-purple-600 via-pink-400 to-sky-600 text-transparent bg-clip-text ">
        Log In
      </h1>
      <div className=" shadow-2xl  p-5  bg-[#3f54704d]  rounded  m-3 ">
        <form
          className="flex flex-col p-6 w-full text-gray-300"
          onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="username"
            value={username}
            required
            className="border border-gray-700 p-2  mt-3 rounded-sm w-full outline-none bg-transparent "
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            className="border border-gray-700 p-2 mt-3  rounded-sm w-full outline-none bg-transparent"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className=" relative inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-purple-600 text-gray-300 overflow-hidden p-0.5  mt-3 rounded-sm text-xl w-full hover:from-purple-600 hover:to-sky-600 ">
            <span className="py-2 px-[95px] rounded-sm bg-[#1e293f]">
              Login
            </span>
          </button>

          <span className=" mt-6 text-sky-500 cursor-pointer hover:text-sky-800 text-center">
            <Link to={"/forgot-password"}> forgot password? </Link>
          </span>
        </form>
      </div>
      <p className="mt-3 text-pink-400">
        New user ? <Link to={"/signup"}>Signup</Link>{" "}
      </p>
      <Toaster />
    </div>
  );
};

export default Layout()(LogIn);
