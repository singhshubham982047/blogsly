import { ApiError } from "../middleware/error.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { User } from "../model/user.model.js";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";

const loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new ApiError("No user found with that ID", 404));
  return res.status(200).json({ success: true, user });
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  if (!(fullname && username && password && email))
    return next(new ApiError("All fields are  required", 400));

  const newUser = await User.findOne({ username });
  if (newUser) return next(new ApiError("Username Already Exist", 400));

  const user = await User.create({
    fullname,
    username,
    email,
    password,
  });

  sendToken(res, user, 201, "User created");
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password))
    return next(new ApiError("All fields are required", 400));

  const user = await User.findOne({ username });

  if (!user) return next(new ApiError("Invalid Username or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch) return next(new ApiError("Invalid Username or Password", 401));

  sendToken(res, user, 200, `Welcome ${user.fullname}`);
});

const logOutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logged out Successfully!" });
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new ApiError("email is required", 400));

  const user = await User.findOne({ email });

  if (!user) return next(new ApiError("Invalid Email", 404));

  const resetToken = user.createResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://localhost:5173/user/reset-password/${resetToken}`;
  const message = `we have recieved a password reset request. use the below link to reset the password.\n If you are not request to reset the password just ignore it\n\n ${resetUrl} link expire with in 10 minutes.`;

  try {
    await sendMail({
      email: user.email,
      subject: "Password reset request recieved",
      message,
    });

    return res.status(200).json({
      success: true,
      message: "password reset link send to the user email",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    return next(new ApiError(`Email could not be sent ${error}`, 500));
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!token) return next(new ApiError("invalid credentials", 400));

  const encryptedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: encryptedToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!user) return next(new ApiError("token is invalid or expire", 400));

  if (!(newPassword && confirmPassword))
    return next(
      new ApiError("please provide new password and confirm password", 400)
    );

  if (newPassword !== confirmPassword)
    return next(new ApiError("Passwords do not match", 400));

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  // sendToken(res, user, 200, "User password has been updated successfully");
  res
    .status(200)
    .json({ success: true, message: "User Password Reset Successfully" });
});

export {
  registerUser,
  loginUser,
  logOutUser,
  loadUser,
  forgotPassword,
  resetPassword,
};
