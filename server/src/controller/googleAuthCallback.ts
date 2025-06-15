import { Request, Response } from "express";
import { Model } from "mongoose";
import { User } from "../types";

const jwt = require("jsonwebtoken");

const UserModel: Model<User> = require("../models/UserModel");

async function googleAuthCallback(req: Request, res: Response) {
  try {
    const googleProfile = req.user as any;

    let user = await UserModel.findOne({ googleId: googleProfile.id });

    if (!user) {
      user = await UserModel.create({
        userName: googleProfile.displayName,
        email: `gg${googleProfile.emails?.[0]?.value}`,
        googleId: googleProfile.id,
      });
    }

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

    res
      .cookie("token", token, cookieOption)
      .status(200)
      .redirect(`${process.env.HOSTING_URL}`);
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = googleAuthCallback;
