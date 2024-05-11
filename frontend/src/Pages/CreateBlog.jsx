import React, { useState } from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../store/blogSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../layout/Layout";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "indent" }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [], background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ],
};

const CreateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.blog);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("education");
  const [cover, setCover] = useState("");

  const notify = () =>
    toast(error ? error.message : "Blog  created successfully!");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCover(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("summary", summary);
    blogData.append("content", content);
    blogData.append("category", category);
    blogData.append("cover", cover);

    dispatch(createBlog({ blogData }));
    setContent("");
    setTitle("");
    setSummary("");

    setCover("");
    navigate("/my/blogs");
    notify();
  };

  return (
    <div className="flex justify-center items-center  mt-10 ">
      <form
        encType="multipart/form-data"
        className="flex flex-col m-20 text-gray-300  p-5 sm:p-10 sm:m-15 md:m-10  w-full bg-[#3f54704d] rounded shadow-lg"
        onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-sky-800 m-3 p-2 rounded-sm bg-transparent outline-none placeholder:text-gray-300"
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          required
          onChange={(e) => setSummary(e.target.value)}
          className="border-2 border-sky-800
            placeholder:text-gray-300 m-3 p-2 rounded-sm bg-transparent outline-none "
        />
        <label
          htmlFor="file"
          className="flex m-3 justify-center items-center h-10 w-[150px] border-2 border-dashed border-sky-500 rounded cursor-pointer">
          Upload Image
        </label>
        <input
          id="file"
          type="file"
          required
          className="m-3 hidden  outline-none cursor-pointer placeholder:text-gray-300"
          name="cover"
          onChange={handleFileChange}
        />
        <label htmlFor="category" className="m-3">
          Category:
        </label>
        <select
          required
          name="category"
          className="m-3 p-2  border-2 border-sky-800 outline-none bg-[#1e293f] rounded-sm"
          onChange={(e) => setCategory(e.target.value)}>
          <option value="education">Education</option>
          <option value="technology">Technology</option>
          <option value="lifehack">LifeHack</option>
          <option value="health">Health</option>
          <option value="agriculture">Agriculture</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
        </select>
        <Quill
          className="m-3 rounded-sm  "
          modules={modules}
          value={content}
          required={true}
          onChange={(newValue) => setContent(newValue)}
        />
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="inline-flex justify-center items-center me-2 p-0.5 bg-gradient-to-r from-sky-600 via-blue-700 to-purple-600 text-xl rounded-full ">
            <span className="p-2 bg-[#1e293f] rounded-full transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-sky-500 ">
              Create Blog
            </span>
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Layout()(CreateBlog);
