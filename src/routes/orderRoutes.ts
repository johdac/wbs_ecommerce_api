import { orderCreate, orderGetAll } from "#controllers";
import { validateBody } from "#middleware";
import { orderCreateRequestSchema } from "#schema";
import { Router } from "express";

export const orderRoutes = Router();

orderRoutes
  .route("/")
  .get(orderGetAll)
  .post(validateBody(orderCreateRequestSchema), orderCreate);
