import { z } from "zod";
import { string64, email } from "./rules.ts";

const userBaseSchema = z.strictObject({
  firstName: string64,
  lastName: string64,
  email: email,
});

export const userCreateRequestSchema = userBaseSchema;
export type userCreateRequestDto = z.infer<typeof userCreateRequestSchema>;

export const userCreateResponseSchema = userBaseSchema.extend({
  _id: z.string(),
});
export type userCreateResponseDto = z.infer<typeof userCreateResponseSchema>;
