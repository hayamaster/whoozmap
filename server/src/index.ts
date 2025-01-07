import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./config/connectDB");
const router = require("./routes");

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running at " + PORT,
  });
});

app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
});
