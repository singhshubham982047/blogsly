import express from "express";
import cluster from "node:cluster";
import os from "node:os";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDb from "./db/connectDb.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: "./.env" });

const totalcpu = os.cpus().length;

ConnectDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (cluster.isPrimary) {
  for (let i = 0; i < totalcpu; i++) {
    cluster.fork();
  }
} else {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/user", userRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/comment", commentRoute);
  // Error Handling MiddleWare

  app.use(errorMiddleware);

  app.listen(process.env.PORT || 5000, () => console.log("i'm Listning"));
}
