import { Router } from "express";
import {
  createNewBlog,
  deleteBlog,
  getAllBlogs,
  getBlogByCategory,
  getBlogByUserId,
  getSingleBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { uploadSingle } from "../middleware/multer.js";
import { userAuthentication } from "../middleware/authenticatedUser.js";

const route = Router();
route.get("/", getAllBlogs);

route.get("/my-blogs", userAuthentication, getBlogByUserId);
route.post("/create", userAuthentication, uploadSingle, createNewBlog);
route.get("/my-blog/:id", getSingleBlog);
route.put("/update/:blogId", userAuthentication, uploadSingle, updateBlog);
route.delete("/delete/:blogId", userAuthentication, deleteBlog);

route.get("/:category", getBlogByCategory);
export default route;
