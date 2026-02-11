import { Product, Category } from "#models";
import type { paramObjectIdDto } from "#schema";
import type { productCreateDto } from "#schema/productSchema";
import type { RequestHandler } from "express";

export const productGetAll: RequestHandler = async (req, res) => {
  const { categoryId } = req.query;
  let products;
  if (categoryId) products = await Product.find({ category: categoryId });
  else products = await Product.find();
  res.json(products);
};

export const productCreate: RequestHandler<{}, any, productCreateDto> = async (
  req,
  res,
) => {
  const intended_category = req.body.category;
  if (!(await Category.exists({ _id: intended_category })))
    throw new Error("Linked category does not exist", {
      cause: { status: 400 },
    });
  const data = await Product.create(req.body);
  res.json(data);
};

export const productGetSingle: RequestHandler<paramObjectIdDto> = async (
  req,
  res,
) => {
  const data = await Product.findById(req.params.id);
  if (!data)
    throw new Error("This page cannot be found", {
      cause: { status: 404 },
    });
  res.json(data);
};
