import { Router } from "express";
import {
  userCreate,
  userDelete,
  userGetAll,
  userGetSingle,
  userUpdate,
} from "#controllers";
import { validateBody, validateParams } from "#middleware";
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
  .get(validateParams(paramObjectIdSchema), userGetSingle)
  .put(
    validateParams(paramObjectIdSchema),
    validateBody(userUpdateRequestSchema),
    userUpdate,
  )
  .delete(validateParams(paramObjectIdSchema), userDelete);
