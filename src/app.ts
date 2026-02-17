import "#db";
import express from "express";
import cors from "cors";
import { errorHandler } from "#middleware";
import { categoryRoutes, userRoutes } from "#routes";
import { productRoutes } from "#routes";
import { orderRoutes } from "#routes";
import swaggerUiDist from "swagger-ui-dist";

const app = express();
const port = process.env.BE_PORT;

const pathToSwaggerUi = swaggerUiDist.absolutePath();

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
app.use(express.static(pathToSwaggerUi));
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/docs", express.static(pathToSwaggerUi));

app.use("*splat", (req, res) => {
  throw new Error("Not found", { cause: { status: 404 } });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
  console.log("Swagger UI running on http://localhost:3000/docs");
});
