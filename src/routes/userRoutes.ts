import { Router } from "express";
import {
  userCreate,
  userDelete,
  userGetAll,
  userGetSingle,
  userUpdate,
} from "#controllers";
import { validateBody, validateRouteParams } from "#middleware";
import {
  paramObjectIdSchema,
  userCreateRequestSchema,
  userUpdateRequestSchema,
} from "#schema";

export const userRoutes = Router();

userRoutes
  .route("/")
  .get(userGetAll)
  .post(validateBody(userCreateRequestSchema), userCreate);

userRoutes
  .route("/:id")
  .get(validateRouteParams(paramObjectIdSchema), userGetSingle)
  .put(
    validateRouteParams(paramObjectIdSchema),
    validateBody(userUpdateRequestSchema),
    userUpdate,
  )
  .delete(validateRouteParams(paramObjectIdSchema), userDelete);
