import { Request, Response } from "express";
import { MapList } from "../types";
import { Model } from "mongoose";
const mongoose = require("mongoose");

const MapListModel: Model<MapList> = require("../models/MapListModel");

async function mapList(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    const mapList = (
      userId
        ? await MapListModel.find({
            postByUserId: new mongoose.Types.ObjectId(userId as string),
          })
            .select("-createdAt -postByUserId")
            .exec()
        : await MapListModel.find().select("-createdAt -postByUserId").exec()
    ).map((map) => ({
      mapId: map._id,
      title: map.title,
      description: map.description,
      category: map.category,
      thumbnailUrl: map.thumbnailUrl,
      userName: map.postByUserName,
      updatedAt: map.updatedAt,
    }));

    return res.status(200).json({
      message: "List of map",
      data: mapList,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = mapList;
