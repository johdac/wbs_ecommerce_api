import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const string64 = z
  .string()
  .min(2, { message: "Text must have at least two characters" })
  .max(64, { message: "Text may only have up to 64 characters" });

export const string128 = z
  .string()
  .min(2, { message: "Text must have at least two characters" })
  .max(128, { message: "Text may only have up to 128 characters" });

export const string10k = z
  .string()
  .min(2, { message: "Text must have at least two characters" })
  .max(10000, { message: "Text may only have up to 10.000 characters" });

export const email = z.email({ message: "Email has wrong format" });

export const number = z.number({ message: "Provided value is not a number" });

export const mongoId = z.string().refine(isValidObjectId, {
  message: "Provided id is not valid",
});
