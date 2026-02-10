import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true,
  },
});

export const Category = model("Category", categorySchema);
