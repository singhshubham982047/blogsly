import { Router } from "express";
import {
  forgotPassword,
  loadUser,
  logOutUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/user.controller.js";
import { userAuthentication } from "../middleware/authenticatedUser.js";

const route = Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.post("/forgot-password", forgotPassword);
route.get("/logout", logOutUser);
route.get("/me", userAuthentication, loadUser);
route.patch("/reset-password/:token", resetPassword);
export default route;
