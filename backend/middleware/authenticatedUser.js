import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "./error.middleware.js";

export const userAuthentication = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    // console.log(req);
    if (!token) next(new ApiError("Unauthorised", 401));
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verifiedToken;
    next();
  } catch (error) {
    next(new ApiError("Invalid Access Token", 403));
  }
});

export const adminAuthentication = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies["admin-token"];
    if (!token) next(new ApiError("Unauthorised", 401));
    const secretKey = jwt.verify(token, process.env.SECRET_KEY);
    const adminSecretKey = process.env.ADMIN_SECRET_KEY;
    const isMatched = secretKey === adminSecretKey;
    if (!isMatched) return next(new ApiError("Invalid Admin Key", 401));

    next();
  } catch (error) {
    next(new ApiError("Invalid Access Token", 403));
  }
});
