import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const string64 = z
  .string()
  .min(2, { message: "Title must have at least two characters" })
  .max(64, { message: "Title may only have up to 64 characters" });

export const email = z.email({ message: "Email has wrong format" });

export const number = z.number({ message: "Provided value is not a number" });

export const mongoId = z.string().refine(isValidObjectId, {
  message: "Provided id is not valid",
});
