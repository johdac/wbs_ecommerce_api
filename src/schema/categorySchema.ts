import { z } from "zod";
import { mongoId, number, string64 } from "./rules.ts";

const categoryBaseSchema = z.strictObject({
  name: string64,
});

export const categoryCreateRequestSchema = categoryBaseSchema;
export type CategoryCreateRequestDto = z.infer<
  typeof categoryCreateRequestSchema
>;

export const categoryGetSingleRequestParamsSchema = z.strictObject({
  id: mongoId,
});
export type categoryGetSingleRequestParamsDto = z.infer<
  typeof categoryGetSingleRequestParamsSchema
>;
