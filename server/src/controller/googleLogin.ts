import { Request, Response } from "express";
import { Model } from "mongoose";
import { User } from "../types";

const jwt = require("jsonwebtoken");

const UserModel: Model<User> = require("../models/UserModel");

async function googleLogin(req: Request, res: Response) {
  try {
    const { googleId, email, userName } = req.body;
    let user = await UserModel.findOne({ googleId });

    if (!user) {
      user = await UserModel.create({
        userName,
        email,
        googleId,
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

module.exports = googleLogin;
