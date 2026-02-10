import { z } from "zod";
import { string64, email } from "./rules.ts";

const userBaseSchema = z.strictObject({
  name: string64,
  email: email,
  password: string64,
});

export const userCreateRequestSchema = userBaseSchema;
export type userCreateRequestDto = z.infer<typeof userCreateRequestSchema>;

export const userUpdateRequestSchema = userBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export type userUpdateRequestDto = z.infer<typeof userUpdateRequestSchema>;
