import { Request, Response } from "express";

const getPlaceLocation = require("../utils/getPlaceLocation");

async function searchPlaceLocation(req: Request, res: Response) {
  try {
    const { searchPlace } = req.params;
    const locationData = await getPlaceLocation(searchPlace);

    return res.status(200).json({
      message: "Location fetched successfully",
      data: locationData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message || error,
      error: true,
    });
  }
}

module.exports = searchPlaceLocation;
