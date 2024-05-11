import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const comparePass = await bcrypt.compare(enteredPassword, this.password);
  return comparePass;
};

UserSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordToken = encryptedToken;
  this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = model("User", UserSchema);
