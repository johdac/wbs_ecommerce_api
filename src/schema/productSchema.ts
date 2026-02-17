import { z } from "zod";
import { mongoId, string10k, string128 } from "./rules.ts";

const productBaseSchema = z.strictObject({
  name: string128,
  description: string10k.optional(),
  price: z.number().gte(0),
  category: mongoId,
});

export const productCreateSchema = productBaseSchema;
export type productCreateDto = z.infer<typeof productCreateSchema>;

export const productUpdateRequestSchema = productBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export type productUpdateRequestDto = z.infer<
  typeof productUpdateRequestSchema
>;

export const productQueryParams = z.object({
  categoryId: mongoId.optional(),
});
