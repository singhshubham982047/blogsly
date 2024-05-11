import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { message, error, loading, serverError } = useSelector(
    (state) => state.user
  );

  const notify = () => {
    if (message) return toast.success(message);
    if (error) return toast.error(error);
    if (serverError) return toast.error("Server Error try again later");
  };

  useEffect(() => {
    if (message || error || serverError) {
      notify();
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [message, error, serverError, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));

    setEmail("");
  };

  return (
    <div className="flex  justify-center items-center h-screen text-gray-300 w-full">
      <div className="m-3">
        <form className="flex flex-col sm:flex-row m-3" onSubmit={handleSubmit}>
          <input
            type="email"
            name=""
            id=""
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-3  outline-none rounded-sm bg-[#1e293f]"
          />

          <button
            type="submit"
            className=" mt-3 sm:mt-0 relative inline-flex items-center justify-center bg-gradient-to-r from-sky-600 to-purple-600 text-gray-300 overflow-hidden p-0.5  rounded-sm text-xl w-full hover:from-purple-600 hover:to-sky-600 ">
            <span className="py-3 px-[95px]  sm:px-3 rounded-sm bg-[#1e293f]">
              Submit
            </span>
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout()(ForgotPassword);
