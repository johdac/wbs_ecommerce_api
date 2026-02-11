import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "productId is required"],
        },
        quantity: {
          type: Number,
          required: [true, "quantity is required"],
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "total is required"],
    },
  },
  { timestamps: true },
);

export const Order = model("Order", orderSchema);
