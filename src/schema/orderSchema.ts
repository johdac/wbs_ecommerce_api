import { z } from "zod";
import { mongoId } from "./rules.ts";

const orderBaseSchema = z.strictObject({
  userId: mongoId,
  products: z
    .array(
      z.object({
        productId: mongoId,
        quantity: z
          .number()
          .int()
          .min(1, { message: "Quantity must be at least 1" }),
      }),
    )
    .min(1, { message: "At least one product is required" }),
});

export const orderCreateRequestSchema = orderBaseSchema;
export type OrderCreateRequestDto = z.infer<typeof orderCreateRequestSchema>;

export const orderUpdateRequestSchema = orderBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export type orderUpdateRequestDto = z.infer<typeof orderUpdateRequestSchema>;
