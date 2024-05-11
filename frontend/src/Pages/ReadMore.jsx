import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSingleBlog } from "../store/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/loader/Loader";
import { MdDelete } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import {
  createComment,
  deleteComment,
  getCommentByBlogId,
  likeComment,
} from "../store/commentSlice";
import {
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { BiShareAlt } from "react-icons/bi";
import Layout from "../layout/Layout";

const ReadMore = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [likeCommentId, setLikeCommentId] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [hoverShare, setHoverShare] = useState(null);
  const likeClass = like ? "text-red-600" : "";
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const { blog } = useSelector((state) => state.blog);
  const { comments, newComment, likeComments } = useSelector(
    (state) => state.comments
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSingleBlog(blogId));
    dispatch(getCommentByBlogId(blogId));
  }, [dispatch, blogId]);

  const handleCommentFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ blogId, comment }));
    dispatch(getCommentByBlogId(blogId));

    setComment("");
  };

  const handleDelete = (e, commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleCommentHover = (commentId) => {
    setHoveredCommentId(commentId);
  };
  const likeHandler = (commentId) => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    dispatch(likeComment(commentId));
  };

  // useEffect(() => {
  //   const shareBtn = () => {
  //     setHoverShare(false);
  //   };
  //   window.addEventListener("click", shareBtn);
  //   return () => {
  //     window.removeEventListener("click", shareBtn);
  //   };
  // }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="flex flex-col w-full p-3 justify-center item-center  mt-14 text-center">
        <div className="absolute top-20 right-6 md:top-16 ">
          <button
            onClick={() => setHoverShare(!hoverShare)}
            className="   flex justify-center  items-center p-2 bg-pink-500 text-white w-[40px] h-[40px] m-auto  rounded-full">
            <BiShareAlt />
          </button>
          {hoverShare && (
            <div className="absolute space-y-2 mt-1 flex flex-col z-10 ">
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon className="rounded-full w-[40px] h-[40px]" />
              </FacebookShareButton>
              <TelegramShareButton url={window.location.href}>
                <TelegramIcon className="rounded-full w-[40px] h-[40px]" />
              </TelegramShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon className="rounded-full w-[40px] h-[40px]" />
              </WhatsappShareButton>
            </div>
          )}
        </div>
        <div className="w-full mb-3 flex flex-col items-center">
          <img
            src={blog?.cover?.url}
            alt=""
            className="w-full  sm:h-96 sm:object-cover rounded-lg mt-8 md:mt-3"
          />
          <div className="flex flex-col justify-between bg-[#4c5e81] rounded-lg w-3/4  h-[200px] m-auto relative -top-24 shadow-lg ">
            <h1 className="font-bold text-normal sm:text-2xl md:text-3xl  text-gray-950 font-serif mt-3">
              {blog?.title}
            </h1>
            <p className="font-light  italic">
              Author: @{blog?.author.fullname}
            </p>
            <div className="flex flex-col justify-between items-center text-center mb-2">
              <p className=" text-gray-950   text-sm ">
                Date Published: {new Date(blog?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div
            className="text-left font-mono bg-gray-400 p-2 rounded"
            dangerouslySetInnerHTML={{
              __html: blog?.content,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col mb-3 m-3 gap-y-3">
        <form
          className="flex flex-col sm:flex-row text-gray-300 items-center"
          onSubmit={handleCommentFormSubmit}>
          <input
            type="text"
            placeholder="leave comment..."
            required
            className="p-2 rounded-sm mb-3 sm:mb-0 sm:mr-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className={`border-2 border-sky-500 rounded p-2 ${
              !isAuthenticated ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={!isAuthenticated}>
            Comment
          </button>
          {!isAuthenticated && (
            <Link to={"/login"} className=" mt-3 sm:mt-0 sm:ml-5 text-red-500">
              login to comment
            </Link>
          )}
        </form>

        <div className="flex text-gray-300 my-3 items-center space-x-1 ">
          <h1 className=" font-mono font-normal ">Comments </h1>
          <span className="text-sky-500 text-xl">{"["}</span>
          <span className=" ">{comments?.length}</span>
          <span className="text-sky-500 text-xl">{"]"}</span>
        </div>
        <div className="flex flex-col  items-center w-full space-y-2 text-gray-300 rounded h-72 overflow-y-scroll p-4 border-2 border-sky-800">
          {comments?.length > 0 &&
            comments?.map((comment) => (
              <div
                key={comment?._id}
                onMouseEnter={() => handleCommentHover(comment._id)}
                onMouseLeave={() => setHoveredCommentId(null)}
                className="relative w-full items-center space-y-2">
                <p className="  text-sm">{`${comment.user?.fullname}`}</p>
                <div className="flex items-center space-x-1 space-y-2 text-center">
                  <span className="font-thin ">{comment.comment}</span>
                  {user?._id.toString() === comment.user?._id.toString() &&
                    hoveredCommentId === comment._id && (
                      <span className="cursor-pointer hover:text-red-500 ">
                        <MdDelete
                          onClick={(e) => handleDelete(e, comment._id)}
                        />
                      </span>
                    )}
                  {/* <div className="flex flex-row space-x-2 mb-2 mt-2 ">
                      <button
                        onClick={() => likeHandler(comment._id)}
                        className={`text-xl ${likeClass} hover:text-red-600`}>
                        <IoIosHeart />
                      </button>

                      <span className="text-sm">{"2"} likes</span>
                    </div> */}
                </div>

                <div className=" border border-sky-800"></div>
              </div>
            ))}
        </div>
      </div>
    </>
  );

  // return (
  //   <div className=" flex justify-center items-center h-screen  ">
  //     <h1 className="text-3xl text-gray-500 font-bold">Log In to Read More</h1>
  //   </div>
  // );
};

export default Layout()(ReadMore);
