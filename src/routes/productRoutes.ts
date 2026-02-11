import { productCreate, productGetAll, productGetSingle } from "#controllers";
import {
  validateBody,
  validateRouteParams,
  validateQueryParams,
} from "#middleware";
import {
  paramObjectIdSchema,
  productCreateSchema,
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
  .get(validateRouteParams(paramObjectIdSchema), productGetSingle);
