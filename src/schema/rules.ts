import { z } from "zod";

export const string64 = z
  .string()
  .min(2, { message: "Title must have at least two characters" })
  .max(64, { message: "Title may only have up to 64 characters" });

export const email = z.email({ message: "Email has wrong format" });
