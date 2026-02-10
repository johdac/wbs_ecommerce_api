import { z } from "zod";
import { mongoId, string64 } from "./rules.ts";

const categoryBaseSchema = z.strictObject({
  name: string64,
});

export const categoryCreateRequestSchema = categoryBaseSchema;
export type CategoryCreateRequestDto = z.infer<
  typeof categoryCreateRequestSchema
>;

export const categoryUpdateRequestSchema = categoryBaseSchema;
export type categoryUpdateRequestDto = z.infer<
  typeof categoryUpdateRequestSchema
>;
