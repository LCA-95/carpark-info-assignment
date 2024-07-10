const carparkRepository = require("../repository/carparkRepository");
const config = require("../config");
const getCarParks = async (req, res) => {
  const {
    isFreeParking,
    isNightParkingAllowed,
    gantryHeight,
    page = config.pageNumber,
    limit = config.pageSize,
  } = req.query;

  const filterCriteria = {};

  // If want to check isFreeParking Allowed, just check if is column contains value as carpark without freeparking will not store anything even the data source is showing "NO"
  if (isFreeParking) {
    filterCriteria.freeParking = { not: null };
  }

  if (isNightParkingAllowed) {
    filterCriteria.isNightParkingAllowed = isNightParkingAllowed;
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
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving car parks",
      error: error.message,
    });
  }
};

export default {
  getCarParks,
};
