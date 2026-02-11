import {
  productCreate,
  productDelete,
  productGetAll,
  productGetSingle,
  productUpdate,
} from "#controllers";
import {
  validateBody,
  validateRouteParams,
  validateQueryParams,
} from "#middleware";
import {
  paramObjectIdSchema,
  productCreateSchema,
  productUpdateRequestSchema,
  productQueryParams,
} from "#schema";
import { Router } from "express";

export const productRoutes = Router();

productRoutes
  .route("/")
  .get(validateQueryParams(productQueryParams), productGetAll)
  .post(validateBody(productCreateSchema), productCreate);

productRoutes
  .route("/:id")
  .get(validateRouteParams(paramObjectIdSchema), productGetSingle)
  .put(
    validateRouteParams(paramObjectIdSchema),
    validateBody(productUpdateRequestSchema),
    productUpdate,
  )
  .delete(validateRouteParams(paramObjectIdSchema), productDelete);
