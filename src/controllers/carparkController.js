const carparkRepository = require("../repository/carparkRepository");
const config = require("../config/config");
const getCarParks = async (req, res) => {
  let {
    isFreeParking,
    isNightParkingAllowed,
    gantryHeight,
    page = config.PAGE_NUMBER,
    limit = config.PAGE_SIZE,
  } = req.query;

  const filterCriteria = {};
  isFreeParking = isFreeParking ? JSON.parse(isFreeParking) : null;

  // If want to check isFreeParking Allowed, just check if is column contains value as carpark without freeparking will not store anything even the data source is showing "NO"
  if (isFreeParking) {
    filterCriteria.freeParking = { not: null };
  } else if (isFreeParking === false) {
    filterCriteria.freeParking = null;
  }

  if (isNightParkingAllowed) {
    filterCriteria.isNightParkingAllowed = JSON.parse(isNightParkingAllowed);
  }

  if (gantryHeight) {
    filterCriteria.gantryHeight = { lte: parseFloat(gantryHeight) };
  }

  try {
    const filteredCarparks = await carparkRepository.getCarparks(
      filterCriteria,
      parseInt(page),
      parseInt(limit)
    );
    res.json({
      status: "success",
      message: "Car parks retrieved successfully",
      data: filteredCarparks.data,
      pagination: filteredCarparks.pagination,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving car parks",
      error: error.message,
    });
  }
};

module.exports = {
  getCarParks,
};
