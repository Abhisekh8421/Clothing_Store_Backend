import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

//Config

const app = express();
const port = process.env.PORT || 3000;

//Database connection
connectDb();
connectCloudinary();

app.use(express.json());
app.use(cors());

//api endpoints

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(port, () => {
  console.log(`Server is started ${port}`);
});
