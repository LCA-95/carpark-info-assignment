const carparkRepository = require("../repository/carparkRepository");
const config = require("../config/config");
const getCarParks = async (req, res) => {
  try {
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
      filterCriteria.gantryHeight = { gte: parseFloat(gantryHeight) };
    }
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
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving car parks",
      error: err.message,
    });
  }
};

module.exports = {
  getCarParks,
};
