import express from "express";
import cors from "cors";
import "dotenv/config";

//Config

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(port, () => {
  console.log(`Server is started ${port}`);
});
