import { productCreate, productGetAll, productGetSingle } from "#controllers";
import { validateBody, validateParams } from "#middleware";
import { paramObjectIdSchema, productCreateSchema } from "#schema";
import { Router } from "express";

export const productRoutes = Router();

productRoutes
  .route("/")
  .get(productGetAll)
  .post(validateBody(productCreateSchema), productCreate);

productRoutes
  .route("/:id")
  .get(validateParams(paramObjectIdSchema), productGetSingle);
