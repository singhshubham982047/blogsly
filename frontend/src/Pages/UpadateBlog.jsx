import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getSingleBlog, updateBlog } from "../store/blogSlice";
import toast, { Toaster } from "react-hot-toast";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

const UpadateBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleBlog(blogId));
  }, [dispatch, blogId]);

  const { blog, error } = useSelector((state) => state.blog);

  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [cover, setCover] = useState("");
  const [coverPreview, setCoverPreview] = useState(cover || blog?.cover?.url);

  const [summary, setSummary] = useState(blog?.summary || "");

  const notify = () => toast(error ? error.message : "Updated successfully!");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCover(selectedFile);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("summary", summary);
    blogData.append("content", content);
    blogData.append("cover", cover);
    dispatch(updateBlog({ blogId, blogData }));
    setContent("");
    setTitle("");
    setSummary("");
    setCover("");
    notify();
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blogId));
    navigate("/my/blogs");
  };

  return (
    <div className="flex justify-center items-center mt-8 m-3">
      <form
        encType="multipart/form-data"
        className="flex flex-col m-20 text-gray-300  p-5 sm:p-10 sm:m-15 md:m-10 w-full bg-[#3f54704d] rounded"
        onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-sky-800 m-3 p-2 rounded-sm bg-transparent outline-none "
        />
        <label htmlFor="summary">Summary:</label>
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          required
          onChange={(e) => setSummary(e.target.value)}
          className="border-2 border-sky-800 m-3 p-2 rounded-sm bg-transparent outline-none "
        />
        <img
          src={coverPreview}
          alt="cover"
          className="m-3 h-[300px] object-cover border-2 border-sky-800 rounded-sm"
        />
        <label
          htmlFor="file"
          className="flex m-3 justify-center items-center h-10 w-[150px] border-2 border-dashed border-sky-500 rounded cursor-pointer">
          Upload Image
        </label>
        <input
          id="file"
          type="file"
          className="m-3 hidden"
          name="cover"
          required
          onChange={handleFileChange}
        />
        <label htmlFor="content">Content:</label>
        <Quill
          className="m-3 p-2 "
          modules={modules}
          value={content}
          required={true}
          onChange={(newValue) => setContent(newValue)}
        />
        <div className="flex justify-center items-center flex-col sm:flex-row">
          <button
            type="submit"
            className="p-0.5  m-3 me-2 inline-flex justify-center items-center bg-gradient-to-r from-sky-500 via-purple-500 to-blue-500  text-xl rounded-full">
            <span className="p-2 bg-[#1e293f] rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-sky-500 ">
              Update Post
            </span>
          </button>
          <button
            onClick={handleDelete}
            className="p-0.5  m-3 me-2 inline-flex justify-center items-center bg-gradient-to-r from-sky-500 via-purple-500 to-blue-500  text-xl rounded-full">
            <span className="p-2 bg-[#1e293f] rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-sky-500 ">
              Delete Post
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Layout()(UpadateBlog);
