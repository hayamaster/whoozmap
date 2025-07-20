import { Request, Response } from "express";
import { MapList, MapDetail } from "../types";
import { Model, isValidObjectId } from "mongoose";
const mongoose = require("mongoose");

const MapListModel: Model<MapList> = require("../models/MapListModel");
const MapDetailModel: Model<MapDetail> = require("../models/MapDetailModel");

async function getMapInfo(req: Request, res: Response) {
  try {
    const { userId, mapId } = req.query;

    if (!isValidObjectId(userId) || !isValidObjectId(mapId)) {
      return res.status(400).json({ message: "Invalid userId or mapId." });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const mapObjectId = new mongoose.Types.ObjectId(mapId);

    const mapFromList = await MapListModel.findOne({
      _id: mapObjectId,
      postByUserId: userObjectId,
    }).exec();

    if (!mapFromList) {
      return res
        .status(404)
        .json({ message: "Map not found or not owned by user." });
    }

    const mapFromDetail = await MapDetailModel.findOne({
      mapId: mapObjectId,
    }).exec();

    const mapInfo = {
      mapId: mapFromList._id,
      title: mapFromList.title,
      description: mapFromList.description,
      category: mapFromList.category,
      thumbnailUrl: mapFromList.thumbnailUrl,
      userName: mapFromList.postByUserName,
      updatedAt: mapFromList.updatedAt,
      places: mapFromDetail ? mapFromDetail.places : [],
    };

    return res.status(200).json({
      message: "a map info",
      data: mapInfo,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = getMapInfo;
