import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
