import { Router } from "express";
import {
  categoryCreate,
  categoryGetAll,
  categoryGetSingle,
} from "#controllers";
import { validateBody, validateParams } from "#middleware";
import {
  categoryCreateRequestSchema,
  categoryGetSingleRequestParamsSchema,
} from "#schema";

export const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(categoryGetAll)
  .post(validateBody(categoryCreateRequestSchema), categoryCreate);

categoryRoutes
  .route("/:id")
  .get(validateParams(categoryGetSingleRequestParamsSchema), categoryGetSingle);
