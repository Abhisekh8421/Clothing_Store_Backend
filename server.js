import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";

//Config

const app = express();
const port = process.env.PORT || 3000;

//Database connection
connectDb();
connectCloudinary();
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // Allow requests from these origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow credentials (if needed)
  })
);

//api endpoints

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(port, () => {
  console.log(`Server is started ${port}`);
});
