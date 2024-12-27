import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URL}/e-commerce`)
    .then(() => console.log("database is connected"))
    .catch((e) => {
      console.log("database connection failed", e);
    });
};
