import { Router } from "express";
import {
  categoryCreate,
  categoryGetAll,
  categoryGetSingle,
  categoryUpdate,
} from "#controllers";
import { validateBody, validateParams } from "#middleware";
import {
  categoryCreateRequestSchema,
  categoryUpdateRequestSchema,
  paramObjectIdSchema,
} from "#schema";

export const categoryRoutes = Router();

categoryRoutes
  .route("/")
  .get(categoryGetAll)
  .post(validateBody(categoryCreateRequestSchema), categoryCreate);

categoryRoutes
  .route("/:id")
  .get(validateParams(paramObjectIdSchema), categoryGetSingle)
  .put(
    validateParams(paramObjectIdSchema),
    validateBody(categoryUpdateRequestSchema),
    categoryUpdate,
  );
