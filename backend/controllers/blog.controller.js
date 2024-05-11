import { ApiError } from "../middleware/error.middleware.js";
import { Blog } from "../model/blog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary, {
  deleteFileFromCloudinary,
} from "../utils/upload.cloudnary.js";

const getAllBlogs = asyncHandler(async (req, res, next) => {
  let query = {};

  if (req.query?.category) {
    query.category = req.query.category;
  }

  if (req.query?.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: "i" } },
      { summary: { $regex: req.query.search, $options: "i" } },
      { content: { $regex: req.query.search, $options: "i" } },
    ];
  }
  const blogs = await Blog.find(query)
    .sort({ updatedAt: -1 })
    .populate("author", "fullname");

  if (!blogs) return next(new ApiError("no blogs found!", 404));
  return res.status(200).json({ success: true, blogs });
});

const getBlogByCategory = asyncHandler(async (req, res, next) => {
  const blog = await Blog.find({ category: req.params.category });

  if (!blog) return next(new ApiError("No Blog Found in this Category", 404));
  return res.status(200).json({ success: true, blog });
});

const createNewBlog = asyncHandler(async (req, res, next) => {
  const { title, summary, content, category } = req.body;

  const coverLocalPath = req.file?.path;
  if (!coverLocalPath) return next(new ApiError("cover image required", 400));
  if (!(title && summary && content))
    return next(new ApiError("all fields required!", 400));

  const uploaded = await uploadOnCloudinary(coverLocalPath);
  if (!uploaded) return next(new ApiError("image could not be uploaded", 400));

  const newBlog = await Blog.create({
    title,
    summary,
    content,
    category,
    cover: {
      public_id: uploaded?.public_id,
      url: uploaded?.secure_url,
    },
    author: req.user.id,
  });
  return res.status(201).json({ success: true, newBlog });
});

const getBlogByUserId = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find({ author: req.user.id }).sort({
    createdAt: -1,
  });
  if (!blogs)
    return next(new ApiError("No Blog yet, create your first blog", 404));
  return res.status(200).json({ success: true, blogs });
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.blogId;
  const { title, summary, content } = req.body;
  if (!blogId) return next(new ApiError("invalid blog id", 400));

  const coverLocalPath = req.file?.path;

  if (!coverLocalPath) return next(new ApiError("cover image required", 400));

  const coverPublicId = await Blog.findById({ _id: blogId }, "cover");
  const deleted = await deleteFileFromCloudinary(coverPublicId.cover.public_id);
  if (!deleted)
    return next(
      new ApiError("could not delete old image from cloudinary", 500)
    );

  const uploaded = await uploadOnCloudinary(coverLocalPath);
  if (!uploaded) return next(new ApiError("image could not be uploaded", 400));

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      title,
      content,
      summary,
      cover: {
        public_id: uploaded?.public_id,
        url: uploaded?.secure_url,
      },
    },
    {
      new: true,
    }
  );
  res
    .status(201)
    .json({ success: true, message: "updated successfully", updatedBlog });
});

const getSingleBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.id;
  if (!blogId) return next(new ApiError("blog Id must required", 400));
  const blog = await Blog.findById(blogId).populate("author", "fullname");

  if (!blog) return next(new ApiError("Blog not found", 404));
  return res.status(200).json({ success: true, blog });
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const blogId = req.params.blogId;
  const coverPublicId = await Blog.findById({ _id: blogId }, "cover");
  await deleteFileFromCloudinary(coverPublicId.cover.public_id);
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return next(new ApiError(`No blog found with this id`, 404));
  }
  await blog.deleteOne();

  res.status(201).json({ success: true, message: "Deleted Successfully!" });
});

export {
  createNewBlog,
  getAllBlogs,
  getBlogByUserId,
  updateBlog,
  getSingleBlog,
  deleteBlog,
  getBlogByCategory,
};
