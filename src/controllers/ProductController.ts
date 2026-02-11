import { Product, Category } from "#models";
import type {
  paramObjectIdDto,
  productCreateDto,
  productUpdateRequestDto,
} from "#schema";
import type { RequestHandler } from "express";
import { Types } from "mongoose";

const checkCategory = async (categoryId: string) => {
  if (!(await Category.exists({ _id: categoryId })))
    throw new Error("Linked category does not exist", {
      cause: { status: 400 },
    });
};

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
  await checkCategory(req.body.category);
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

export const productUpdate: RequestHandler<
  paramObjectIdDto,
  any,
  productUpdateRequestDto
> = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    throw new Error("Update not possible. Product does not exist.", {
      cause: { status: 404 },
    });

  if (req.body.name) product.name = req.body.name;
  if (req.body.description) product.description = req.body.description;
  if (req.body.price) product.price = req.body.price;
  if (req.body.category) {
    await checkCategory(req.body.category);
    product.category = new Types.ObjectId(req.body.category);
  }
  await product.save();
  res.json(product);
};

export const productDelete: RequestHandler = async (req, res) => {
  const deleted = await Product.deleteOne({ _id: req.params.id });
  if (deleted.deletedCount > 0) res.sendStatus(204);
  else
    throw new Error("No such product", {
      cause: { status: 404 },
    });
};
