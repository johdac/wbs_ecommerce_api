import { Order, Product, User } from "#models";
import { type RequestHandler } from "express";
import type {
  OrderCreateRequestDto,
  orderUpdateRequestDto,
  paramObjectIdDto,
} from "#schema";

const checkUserId = async (userId: string) => {
  if (!(await User.exists({ _id: userId })))
    throw new Error("Linked user does not exist", {
      cause: { status: 400 },
    });
};

const checkProductIds = async (products: OrderCreateRequestDto["products"]) => {
  for (const product of products) {
    if (!(await Product.exists({ _id: product.productId })))
      throw new Error(
        "Cannot find all products of this order in the database",
        {
          cause: { status: 400 },
        },
      );
  }
};

const calcOrderTotal = async (
  products: OrderCreateRequestDto["products"],
): Promise<number> => {
  // Get product ids as array
  const productIds = products.map((p) => p.productId);
  // with $in we can make one db query for all product ids
  const productData = await Product.find({ _id: { $in: productIds } });
  // Create a map for fast lookup
  const priceMap = new Map(productData.map((p) => [p._id.toString(), p.price]));
  // Sum up
  let total = 0;
  for (const p of products) {
    const price = priceMap.get(p.productId);
    if (price === undefined) {
      throw new Error("Product within order is missing a price", {
        cause: { status: 400 },
      });
    }
    total += price * p.quantity;
  }
  return total;
};

export const orderGetAll: RequestHandler = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export const orderCreate: RequestHandler<
  {},
  any,
  OrderCreateRequestDto
> = async (req, res) => {
  // Make sure user of order exists
  await checkUserId(req.body.userId);
  // Make sure products of order items exist
  await checkProductIds(req.body.products);
  const total = await calcOrderTotal(req.body.products);
  const orderData = {
    ...req.body,
    total,
  };
  const order = await Order.create(orderData);
  res.json(order);
};

export const orderGetSingle: RequestHandler<paramObjectIdDto> = async (
  req,
  res,
) => {
  const data = await Order.findById(req.params.id);
  if (!data)
    throw new Error("This page cannot be found", { cause: { status: 404 } });
  res.json(data);
};

export const orderUpdate: RequestHandler<
  paramObjectIdDto,
  any,
  orderUpdateRequestDto
> = async (req, res) => {
  const orderUpdates: any = {};
  if (req.body.userId) {
    await checkUserId(req.body.userId);
    orderUpdates.userId = req.body.userId;
  }

  if (req.body.products) {
    await checkProductIds(req.body.products);
    orderUpdates.products = req.body.products;
    const total = await calcOrderTotal(req.body.products);
    orderUpdates.total = total;
  }

  const newOrder = await Order.findByIdAndUpdate(req.params.id, orderUpdates, {
    new: true, // returns the new order instead of the changed original
    runValidators: true, // would normally not happen with findByIdAndUpdate
  });

  if (!newOrder) throw new Error("Order not found", { cause: { status: 404 } });
  res.json(newOrder);
};

export const orderDelete: RequestHandler = async (req, res) => {
  const deleted = await Order.deleteOne({ _id: req.params.id });
  if (deleted.deletedCount > 0) res.sendStatus(204);
  else
    throw new Error("No such order", {
      cause: { status: 404 },
    });
};
