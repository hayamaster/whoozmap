import { Request, Response } from "express";
import mongoose from "mongoose";

interface ListItem {
  userName: string;
  imageUrl: string;
  title: string;
  likeCount: number;
}

const ListItemModel: mongoose.Model<ListItem> = require("../models/ListItemModel");

async function registerTest(req: Request, res: Response) {
  try {
    const { imageUrl, title, userName, likeCount } = req.body;

    const list = new ListItemModel({
      userName,
      imageUrl,
      title,
      likeCount,
    });
    const listSave = await list.save();

    return res.status(200).json({
      message: "List of item created successfully",
      data: listSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = registerTest;
