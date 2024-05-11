import { Router } from "express";
import {
  createComment,
  deleteComments,
  getCommentsByBlogId,
  likeComment,
} from "../controllers/comment.controller.js";
import { userAuthentication } from "../middleware/authenticatedUser.js";

const router = Router();

router.get("/:blogId", getCommentsByBlogId);
router.use(userAuthentication);

router.post("/create/:blogId", createComment);
// router.put("/like/:commentId", likeComment);
router.delete("/delete/:commentId", deleteComments);

export default router;
