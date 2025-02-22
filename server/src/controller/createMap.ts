import { Request, Response } from "express";
import { Model, isValidObjectId } from "mongoose";
import { Map } from "../types";

const mongoose = require("mongoose");

const MapModel: Model<Map> = require("../models/MapModel");

async function createMap(req: Request, res: Response) {
  try {
    const { title, description, category, thumbnailUrl, places, userId } =
      req.body;

    if (!isValidObjectId(new mongoose.Types.ObjectId(userId))) {
      return res.status(400).json({ message: "It is not validate userId." });
    }

    const newMap = new MapModel({
      title,
      description,
      category,
      thumbnailUrl,
      places,
      postByUserId: userId,
    });

    await newMap.save();

    return res.status(200).json({
      message: "Map created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = createMap;
