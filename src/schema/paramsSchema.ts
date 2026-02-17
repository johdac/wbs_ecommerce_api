import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const paramObjectIdSchema = z.strictObject({
  id: z.string().refine(isValidObjectId, {
    message: "Invalid MongoDB ObjectId provided",
  }),
});

export type paramObjectIdDto = z.infer<typeof paramObjectIdSchema>;
