import "#db";
import express from "express";
import cors from "cors";
import { errorHandler } from "#middleware";
import { categoryRoutes, userRoutes } from "#routes";
import { productRoutes } from "#routes";

const app = express();
const port = process.env.BE_PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.route("/").get((req, res) => {
  res.json("Hello World");
});

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`),
);
