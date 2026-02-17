import {
  orderCreate,
  orderDelete,
  orderGetAll,
  orderGetSingle,
  orderUpdate,
} from "#controllers";
import { validateBody, validateRouteParams } from "#middleware";
import {
  orderCreateRequestSchema,
  orderUpdateRequestSchema,
  paramObjectIdSchema,
} from "#schema";
import { Router } from "express";

export const orderRoutes = Router();

orderRoutes
  .route("/")
  .get(orderGetAll)
  .post(validateBody(orderCreateRequestSchema), orderCreate);

orderRoutes
  .route("/:id")
  .get(validateRouteParams(paramObjectIdSchema), orderGetSingle)
  .put(
    validateRouteParams(paramObjectIdSchema),
    validateBody(orderUpdateRequestSchema),
    orderUpdate,
  )
  .delete(validateRouteParams(paramObjectIdSchema), orderDelete);
