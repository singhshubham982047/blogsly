export const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(",");
    err.message = `Duplicate field value entered in ${error}`;
    err.statusCode = 400;
  }
  if (err.name === "CastError") {
    err.message = `Invalid ${err.path} id`;
    err.statusCode = 400;
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
