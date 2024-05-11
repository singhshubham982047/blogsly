import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, resetPassword } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout/Layout";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const dispatch = useDispatch();

  const { error, success, serverError } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    dispatch(resetPassword({ newPassword, confirmPassword, tokenId }));
    setConfirmPassword("");
    setNewPassword("");
  };

  const notify = () => {
    if (error) {
      return toast.error(error?.message);
    }
    if (serverError) {
      return toast.error("Server error! Please try again later");
    }
    if (success) {
      return toast.success("Password reset successfully");
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
      notify();
    }
    if (error || serverError || success) {
      notify();
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [navigate, dispatch, error, serverError, success]);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        action=""
        className="flex flex-col space-y-3 text-gray-300"
        onSubmit={handleSubmit}>
        <label htmlFor="new-password">New Password</label>
        <input
          type=" "
          name=""
          id=""
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New-Password"
          className="p-3 outline-none"
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="text"
          name=""
          id=""
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm-Password"
          className="p-3 outline-none"
        />
        <button type="submit" className="p-3 bg-[#a8b233] text-xl">
          Submit
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default Layout()(ResetPassword);
