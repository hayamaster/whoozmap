import { Request, Response } from "express";
import { GoogleMapsPlaceType } from "../types";

const getPlaceLocation = require("../utils/getPlaceLocation");

async function searchPlaceLocation(req: Request, res: Response) {
  try {
    const { searchPlace, lat, lng } = req.params;
    const locationData = await getPlaceLocation({ searchPlace, lat, lng });

    return res.status(200).json({
      message: "Location fetched successfully",
      data: locationData.map((data: GoogleMapsPlaceType) => {
        return {
          placeId: data.place_id,
          name: data.name,
          icon: data.icon,
          lat: data.geometry.location.lat,
          lng: data.geometry.location.lng,
          location: data.vicinity,
        };
      }),
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
