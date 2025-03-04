import { Mongoose } from "mongoose";

const mongoose: Mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connect to DB");
    });

    connection.on("error", (error: Error) => {
      console.log("Something is wrong in mongoDB ", error);
    });
  } catch (error) {
    console.log("Something is wrong ", error);
  }
}

module.exports = connectDB;
