import { User } from "#models";
import { type RequestHandler } from "express";
import type { userCreateRequestDto } from "#schema";

export const userGetAll: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const userCreate: RequestHandler<{}, any, userCreateRequestDto> = async (
  req,
  res,
) => {
  const email = req.body.email;
  if (await User.exists({ email }))
    throw new Error("E-Mail already exists", { cause: { status: 409 } });
  const data = await User.create(req.body);
  res.json(data);
};
