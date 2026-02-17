import { User } from "#models";
import { type RequestHandler } from "express";
import type {
  paramObjectIdDto,
  userCreateRequestDto,
  userUpdateRequestDto,
} from "#schema";

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
  const newUser = await User.create(req.body);
  const { password, ...safeUser } = newUser.toObject();
  res.json(safeUser);
};

export const userGetSingle: RequestHandler<paramObjectIdDto> = async (
  req,
  res,
) => {
  const data = await User.findById(req.params.id);
  if (!data)
    throw new Error("This page cannot be found", { cause: { status: 404 } });
  res.json(data);
};

export const userUpdate: RequestHandler<
  paramObjectIdDto,
  any,
  userUpdateRequestDto
> = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    throw new Error("Update not possible. User does not exist.", {
      cause: { status: 404 },
    });

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  await user.save();
  res.json(user);
};

export const userDelete: RequestHandler = async (req, res) => {
  const deleted = await User.deleteOne({ _id: req.params.id });
  if (deleted.deletedCount > 0) res.sendStatus(204);
  else
    throw new Error("No such user", {
      cause: { status: 404 },
    });
};
