import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;
const connectDB = require("./config/connectDB");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.HOSTING_URL);
  next();
});

app.use(
  cors({
    origin: [process.env.HOSTING_URL, process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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
