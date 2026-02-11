import { Router } from "express";
import {
  categoryCreate,
  categoryGetAll,
  categoryGetSingle,
  categoryUpdate,
} from "#controllers";
import { validateBody, validateRouteParams } from "#middleware";
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
  .get(validateRouteParams(paramObjectIdSchema), categoryGetSingle)
  .put(
    validateRouteParams(paramObjectIdSchema),
    validateBody(categoryUpdateRequestSchema),
    categoryUpdate,
  );
