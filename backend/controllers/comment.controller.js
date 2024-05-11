import { ApiError } from "../middleware/error.middleware.js";
import { Comment } from "../model/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res, next) => {
  const { comment } = req.body;
  const { blogId } = req.params;

  if (!(comment && blogId)) return next(new ApiError("Missing data", 400));

  const createComment = await Comment.create({
    comment,
    blog: blogId,
    user: req.user.id,
  });

  const newComment = await Comment.findById(createComment._id).populate(
    "user",
    "fullname"
  );

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "fullname")
    .sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    newComment,
    comments,
    countComment: comments.length,
  });
});

// Get all the comments on a specific blog post
const getCommentsByBlogId = asyncHandler(async (req, res, next) => {
  const { blogId } = req.params;

  if (!blogId) return next(new ApiError("Invalid Blog Id", 400));

  const comments = await Comment.find({ blog: blogId })
    .populate("user", "fullname")
    .sort({ createdAt: -1 });

  if (!comments) return next(new ApiError("No Comments Found", 404));

  res
    .status(200)
    .json({ success: true, comments, countComment: comments.length });
});

const likeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return next(new ApiError("Comment not found", 404));
  const userIndex = comment.likes.indexOf(req.user.id);

  if (userIndex === -1) {
    comment.numberOfLikes += 1;
    comment.likes.push(req.user.id);
  } else {
    comment.numberOfLikes -= 1;
    comment.likes.splice(userIndex, 1);
  }

  await comment.save();
  return res.status(200).json({ success: true, likeComments: comment });
});

const deleteComments = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  if (!(commentId && userId)) return next(new ApiError("Invalid Id", 400));

  // Check if the user is author

  const comment = await Comment.findById(commentId).populate("user", "_id");

  if (comment.user._id.toString() !== userId.toString())
    return next(new ApiError("you can not delete others comment", 400));

  await comment.deleteOne();

  res.status(200).json({
    success: true,
    message: "deleted successfully",
    deletedCommentId: commentId,
  });
});

export { createComment, getCommentsByBlogId, deleteComments, likeComment };
