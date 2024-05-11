import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
