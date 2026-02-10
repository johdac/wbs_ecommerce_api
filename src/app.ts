import "#db";
import express from "express";
import { errorHandler } from "#middleware";
import { User } from "#models";

const app = express();
const port = process.env.BE_PORT;

app.use(express.json());

app.route("/").get((req, res) => {
  res.json("Hello World");
});

app.route("/users").post(async (req, res) => {
  const data = await User.create(req.body);
  res.json(data);
});

app.route("/error").get((req, res) => {
  throw new Error("Error text", { cause: { status: 400 } });
});

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
