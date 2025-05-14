import { Request, Response } from "express";
import { MapDetail } from "../types";
import { Model } from "mongoose";

const MapDetailModel: Model<MapDetail> = require("../models/MapDetailModel");

async function mapDetail(req: Request, res: Response) {
  try {
    const { mapId } = req.query;
    const map = await MapDetailModel.findOne({ mapId })
      .select("-createdAt -updatedAt")
      .exec();

    if (!map) {
      return res.status(404).json({
        message: "Map not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Map detail",
      data: map,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = mapDetail;
