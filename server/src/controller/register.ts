import { Request, Response } from "express";
import { Model } from "mongoose";

interface User {
  userName: string;
  email: string;
  password: string;
}

const UserModel: Model<User> = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function register(req: Request, res: Response) {
  try {
    const { userName, email, password } = req.body;

    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
        error: true,
      });
    }

    // password into hash-password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      userName,
      email,
      password: hashPassword,
    };

    const user = new UserModel(payload);
    const userSave = await user.save();

    return res.status(200).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = register;
