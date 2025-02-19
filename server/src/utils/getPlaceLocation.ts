const axios = require("axios");

interface GetPlaceLocationProps {
  searchPlace: string;
  lat: string;
  lng: string;
}

async function getPlaceLocation({
  searchPlace,
  lat,
  lng,
}: GetPlaceLocationProps) {
  try {
    const response = await axios.get(
      //   `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      //     address
      //   )}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${
      //     process.env.GOOGLE_MAPS_API_KEY
      //   }`
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${searchPlace}&location=${lat}%2C${lng}&radius=2500&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data = response.data;
    const locationData = data.results;

    return locationData;
  } catch (error) {
    return {
      message: "error fetching location",
      success: false,
    };
  }
}

module.exports = getPlaceLocation;
