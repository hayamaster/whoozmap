import { Request, Response } from "express";
import { Model } from "mongoose";

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

interface User {
  userName: string;
  email: string;
  password: string;
}

const UserModel: Model<User> = require("../models/UserModel");

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    // check password
    const verifyPassword = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !verifyPassword) {
      return res.status(400).json({
        message: "User not found",
        error: true,
      });
    }

    // create token using jwt
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const cookieOption = {
      http: true,
      secure: true,
      httpOnly: true,
      sameSite: "none" as "none",
    };

    return res
      .cookie("token", token, cookieOption)
      .status(200)
      .json({
        message: "Login successfully",
        success: true,
        token,
        data: { _id: user._id, email: user.email, userName: user.userName },
      });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = login;
