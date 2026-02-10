import { Router } from "express";
import { userCreate, userGetAll } from "#controllers";

export const userRoutes = Router();

userRoutes.route("/").get(userGetAll).post(userCreate);
