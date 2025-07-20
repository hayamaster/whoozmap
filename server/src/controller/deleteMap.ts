import { Request, Response } from "express";
import { Model, isValidObjectId, Types } from "mongoose";
import { MapDetail, MapList, User } from "../types";

const mongoose = require("mongoose");

const MapListModel: Model<MapList> = require("../models/MapListModel");
const MapDetailModel: Model<MapDetail> = require("../models/MapDetailModel");
const UserModel: Model<User> = require("../models/UserModel");

async function deleteMap(req: Request, res: Response) {
  try {
    const { userId, mapId } = req.body;

    if (!isValidObjectId(userId) || !isValidObjectId(mapId)) {
      return res.status(400).json({ message: "Invalid userId or mapId." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const mapObjectId = new mongoose.Types.ObjectId(mapId);

    const user = await UserModel.findById(userObjectId, "userName").exec();
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // delete map in the map list
    const deleteMapList = await MapListModel.findOneAndDelete({
      _id: mapObjectId,
      postByUserId: userObjectId,
    }).exec();

    if (!deleteMapList) {
      return res
        .status(404)
        .json({ message: "Map not found or not owned by user." });
    }

    // delete map in the map detail
    await MapDetailModel.findOneAndDelete({
      mapId: mapObjectId,
    }).exec();

    return res.status(200).json({
      message: "Map deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = deleteMap;
