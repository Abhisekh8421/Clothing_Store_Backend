import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME,
    })
    .then(() => console.log("database is connected"))
    .catch((e) => {
      console.log("database connection failed", e);
    });
};
