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
  total: z.number().min(0, { message: "The total must be a positive number" }),
});

export const orderCreateRequestSchema = orderBaseSchema;
export type OrderCreateRequestDto = z.infer<typeof orderCreateRequestSchema>;
