import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError, signup } from "../store/userSlice";
import Loader from "../Components/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout/Layout";

const SignUp = () => {
  const [fullname, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token, loading, error, user } = useSelector(
    (state) => state.user
  );

  const notify = () => toast(error && error?.message);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ fullname, username, password, email }));
    setEmail("");
    setName("");
    setPassword("");
    setUserName("");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      notify();
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [error, navigate, isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col  justify-center items-center h-screen  w-full">
      <h1 className="text-3xl bg-gradient-to-r from-purple-600  to-sky-600 text-transparent bg-clip-text  font-bold  ">
        Sign Up
      </h1>
      <div className=" shadow-2xl p-5  bg-[#3f54704d]   rounded m-3  ">
        <form
          className="flex flex-col p-6 w-full  text-gray-300"
          onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            required
            className="border border-gray-700 p-2  mt-3 rounded-sm  outline-none  bg-transparent "
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            required
            className="border border-gray-700 p-2  mt-3 rounded-sm outline-none  bg-transparent"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            className="border border-gray-700 p-2  mt-3 rounded-sm  outline-none  bg-transparent"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="border border-gray-700 p-2 mt-3  rounded-sm  outline-none  bg-transparent"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className=" relative inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-purple-600 text-gray-300 overflow-hidden p-0.5  mt-3 rounded-sm text-xl w-full hover:from-purple-600 hover:to-sky-600 ">
            <span className="py-2 px-[95px] rounded-sm bg-[#1e293f]">
              Signup
            </span>
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout()(SignUp);
