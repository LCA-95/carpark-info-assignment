// Sample Google Map API Service ()
/*
const axios = require("axios");
module.exports = ({ CONFIG, logger }) => {
  const apiKey = CONFIG.GOOGLE.MAP_API_KEY;
  const googleMapHttpClient = axios.create({
    baseURL: CONFIG.GOOGLE.MAP_API_BASE_URL,
  });
  return {
    async getPlaceDetailsById({ placeId, selectFields }) {
      try {
        const url = `/place/details/json?place_id=${placeId}&fields=${selectFields}&key=${apiKey}`;
        const results = await googleMapHttpClient.get(url);
        return results.data; //Google API Return Data in data field
      } catch (err) {
        console.error(err);
        logger.error(
          `An error occured while calling google map get place detail by id api... ${err}`
        );
        throw err;
      }
    },
    async getTravelDistance({ originLatLng, destinationLatLng, travelMode }) {
      try {
        //Reference: Using Google Distance Matrix API:  https://developers.google.com/maps/documentation/distance-matrix/overview
        const url = `/distancematrix/json?origins=${originLatLng}&destinations=${destinationLatLng}&mode=${travelMode}&key=${apiKey}`;
        const results = await googleMapHttpClient.get(url);
        console.log(JSON.stringify(results.data));
        return results.data.rows[0].elements;
      } catch (err) {
        console.error(err);
        logger.error(
          `An error occured while calling google distance api.. ${err}`
        );
        throw err;
      }
    },
  };
};
*/
