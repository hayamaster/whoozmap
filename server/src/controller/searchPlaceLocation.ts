import { Request, Response } from "express";
import { GoogleMapsPlaceType } from "../types";

const getPlaceLocation = require("../utils/getPlaceLocation");

async function searchPlaceLocation(req: Request, res: Response) {
  try {
    const { searchPlace, lat, lng } = req.query;
    const locationData = await getPlaceLocation({ searchPlace, lat, lng });

    return res.status(200).json({
      message: "Location fetched successfully",
      data: locationData.map((data: GoogleMapsPlaceType) => {
        return {
          placeId: data.place_id,
          name: data.name,
          // 만약 사진이 없으면 아이콘을 사용
          icon: data.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${data.photos[0].photo_reference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
            : data.icon,
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
