import { Schema, model } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cover: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference to the User model
    },
  },
  { timestamps: true }
);

export const Blog = model("Blog", blogSchema);
