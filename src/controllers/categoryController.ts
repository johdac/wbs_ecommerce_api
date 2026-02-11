import { Category } from "#models";
import { type RequestHandler } from "express";
import type {
  CategoryCreateRequestDto,
  categoryUpdateRequestDto,
  paramObjectIdDto,
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

export const categoryGetSingle: RequestHandler<paramObjectIdDto> = async (
  req,
  res,
) => {
  const data = await Category.findById(req.params.id);
  if (!data)
    throw new Error("This page cannot be found", { cause: { status: 404 } });
  res.json(data);
};

export const categoryUpdate: RequestHandler<
  paramObjectIdDto,
  any,
  categoryUpdateRequestDto
> = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    throw new Error("Update not possible. Category does not exist.", {
      cause: { status: 404 },
    });

  category.name = req.body.name;
  await category.save();
  res.json(category);
};

export const categoryDelete: RequestHandler = async (req, res) => {
  const deleted = await Category.deleteOne({ _id: req.params.id });
  if (deleted.deletedCount > 0) res.sendStatus(204);
  else
    throw new Error("No such category", {
      cause: { status: 404 },
    });
};
