const axios = require("axios");

async function getPlaceLocation(address: string) {
  try {
    const response = await axios.get(
      //   `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      //     address
      //   )}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${
      //     process.env.GOOGLE_MAPS_API_KEY
      //   }`
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${address}&location=-33.8670522%2C151.1957362&radius=1500&key=${process.env.GOOGLE_MAPS_API_KEY}`
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
