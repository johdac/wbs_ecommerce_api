import { Order, Product, User } from "#models";
import { type RequestHandler } from "express";
import type { OrderCreateRequestDto } from "#schema";

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
  const userId = req.body.userId;
  if (!(await User.exists({ _id: userId })))
    throw new Error("Cannot find user for this order", {
      cause: { status: 400 },
    });

  // Make sure products of order items exist
  const orderLineItems = req.body.products;
  for (const orderLineItem of orderLineItems) {
    if (!(await Product.exists({ _id: orderLineItem.productId })))
      throw new Error(
        "Cannot find all products of this order in the database",
        {
          cause: { status: 400 },
        },
      );
  }
  const order = await Order.create(req.body);
  res.json(order);
};

// export const userGetSingle: RequestHandler<paramObjectIdDto> = async (
//   req,
//   res,
// ) => {
//   const data = await User.findById(req.params.id);
//   if (!data)
//     throw new Error("This page cannot be found", { cause: { status: 404 } });
//   res.json(data);
// };

// export const userUpdate: RequestHandler<
//   paramObjectIdDto,
//   any,
//   userUpdateRequestDto
// > = async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user)
//     throw new Error("Update not possible. User does not exist.", {
//       cause: { status: 404 },
//     });

//   if (req.body.name) user.name = req.body.name;
//   if (req.body.email) user.email = req.body.email;
//   await user.save();
//   res.json(user);
// };

// export const userDelete: RequestHandler = async (req, res) => {
//   const deleted = await User.deleteOne({ _id: req.params.id });
//   if (deleted.deletedCount > 0) res.sendStatus(204);
//   else
//     throw new Error("No such user", {
//       cause: { status: 404 },
//     });
// };
