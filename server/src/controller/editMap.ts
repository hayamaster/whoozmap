import { Request, Response } from "express";
import { Model, isValidObjectId, Types } from "mongoose";
import { MapDetail, MapList, User } from "../types";

const mongoose = require("mongoose");

const MapListModel: Model<MapList> = require("../models/MapListModel");
const MapDetailModel: Model<MapDetail> = require("../models/MapDetailModel");
const UserModel: Model<User> = require("../models/UserModel");

async function editMap(req: Request, res: Response) {
  try {
    const {
      mapId,
      title,
      description,
      category,
      thumbnailUrl,
      places,
      userId,
    } = req.body;

    // ObjectId 유효성 체크
    if (!isValidObjectId(mapId) || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid mapId or userId." });
    }

    // 해당 유저가 해당 맵의 소유자인지 확인 (권한 체크)
    const map = await MapListModel.findOne({
      _id: new mongoose.Types.ObjectId(mapId),
      postByUserId: new mongoose.Types.ObjectId(userId),
    });

    if (!map) {
      return res
        .status(404)
        .json({ message: "Map not found or not owned by this user." });
    }

    // MapList 정보 수정
    await MapListModel.findByIdAndUpdate(mapId, {
      $set: {
        title,
        description,
        category,
        thumbnailUrl,
      },
    });

    // MapDetail 내용 수정
    await MapDetailModel.findOneAndUpdate(
      { mapId: new mongoose.Types.ObjectId(mapId) },
      {
        $set: { places },
      }
    );

    return res.status(200).json({
      message: "Map updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = editMap;
