import { Category } from "#models";
import { type RequestHandler } from "express";
import type {
  CategoryCreateRequestDto,
  categoryGetSingleRequestParamsDto,
} from "#schema";

export const categoryGetAll: RequestHandler = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const categoryCreate: RequestHandler<
  {},
  any,
  CategoryCreateRequestDto
> = async (req, res) => {
  const categoryName = req.body.name;
  if (await Category.exists({ name: categoryName })) {
    console.log("throwing");
    throw new Error("Category already exists", { cause: { status: 409 } });
  }
  const data = await Category.create(req.body);
  res.json(data);
};

export const categoryGetSingle: RequestHandler<
  categoryGetSingleRequestParamsDto
> = async (req, res) => {
  const data = await Category.findById(req.params.id);
  if (!data)
    throw new Error("This page cannot be found", { cause: { status: 404 } });
  res.json(data);
};
