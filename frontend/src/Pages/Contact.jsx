import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";

const TEMPLATE_ID = import.meta.env.VITE_MAIL_TEMPLATE_ID;
const SERVICE_ID = import.meta.env.VITE_MAIL_SERVICE;
const PUBLIC_KEY = import.meta.env.PUBLIC_KEY;
const Contact = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const sendEmail = async (e) => {
    e.preventDefault();
    await emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        (result) => {
          setError(false);
          setErrorMessage(`SUCCESS ${result.text}`);
        },
        (error) => {
          setError(true);
          setErrorMessage(`FAILED... ${error.text}`);
        }
      );
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen mb-5">
      <div className="w-full  text-center mt-24 md:mt-0 ">
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-400 to-sky-600 text-transparent bg-clip-text">
          Feel Free to Contact
        </h1>
      </div>
      <div className="w-full p-5">
        <div className="flex  justify-center  p-5  bg-[#3f54704d] shadow-2xl rounded md:m-8  ">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col w-full p-2 text-gray-300 space-y-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              className="p-2 bg-transparent border-2 outline-none border-sky-800 rounded"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id=""
              placeholder="Email"
              required
              className="p-2 bg-transparent border-2 outline-none border-sky-800 rounded"
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id=""
              cols="25"
              rows="5"
              placeholder="leave your message"
              required
              className="p-2 bg-transparent border-2 outline-none border-sky-800 rounded"></textarea>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className={`relative w-[80px] inline-flex justify-center items-center bg-gradient-to-r from-sky-600 to-purple-600 text-gray-300 overflow-hidden p-0.5 mt-2 hover:from-purple-600 hover:to-sky-600 ${
                  !isAuthenticated || loading ? " cursor-not-allowed" : ""
                } rounded-sm`}
                disabled={!isAuthenticated || loading}>
                <span className="py-2 px-5 rounded-sm bg-[#1e293f] ">Send</span>
              </button>
            </div>

            {error === false ? errorMessage : errorMessage}
          </form>
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
  );
};

export default Layout()(Contact);
