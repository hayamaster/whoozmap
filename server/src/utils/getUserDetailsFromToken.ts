import { Model } from "mongoose";

interface User {
  userName: string;
  email: string;
  password: string;
}

const jwt = require("jsonwebtoken");
const UserModel: Model<User> = require("../models/UserModel");

const getUserDetailsFromToken = async (token: string) => {
  if (!token) {
    return {
      message: "Token is required",
      logout: true,
    };
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const user = await UserModel.findById(decode.id).select("-password").exec();

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        message: "Token has expired",
        logout: true,
      };
    }

    return {
      message: "An error occurred while processing the token",
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
