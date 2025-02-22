import { Request, Response } from "express";
import { Model, isValidObjectId } from "mongoose";
import { MapDetail, MapList, User } from "../types";

const mongoose = require("mongoose");

const MapListModel: Model<MapList> = require("../models/MapListModel");
const MapDetailModel: Model<MapDetail> = require("../models/MapDetailModel");
const UserModel: Model<User> = require("../models/UserModel");

async function createMap(req: Request, res: Response) {
  try {
    const { title, description, category, thumbnailUrl, places, userId } =
      req.body;

    if (!isValidObjectId(new mongoose.Types.ObjectId(userId))) {
      return res.status(400).json({ message: "It is not validate userId." });
    }

    const user = await UserModel.findById(userId, "userName").exec();

    const newMapList = new MapListModel({
      title,
      description,
      category,
      thumbnailUrl,
      postByUserName: user?.userName,
      postByUserId: userId,
    });

    await newMapList.save();

    const newMap = new MapDetailModel({
      mapId: newMapList._id,
      places,
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
