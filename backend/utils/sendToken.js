import jwt from "jsonwebtoken";

export const sendToken = (res, user, code, messsage) => {
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  const options = {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  };
  res
    .cookie("token", token, options)
    .status(code)
    .json({ success: true, messsage, user, token });
};
