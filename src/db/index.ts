import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: "project9_ecommerce_api",
  });
  console.log("\x1b[35mMongoDB connected via Mongoose\x1b[0m");
} catch (err) {
  console.error(err);
}
