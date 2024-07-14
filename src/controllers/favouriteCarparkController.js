const favouriteCarparkRepository = require("../repository/favouriteCarparkRepository");

const getFavouriteCarpark = async (req, res) => {
  try {
    const userId = req.query.userId || req.user.id;
    const favouriteCarparks =
      await favouriteCarparkRepository.findFavouriteByUserId(
        parseInt(userId)
      ); 
    res.json({
      status: "success",
      message: "Favourite Carparks retrieved successfully",
      data: favouriteCarparks,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving car park favourite",
      error: error.message,
    });
  }
};

const addFavouriteCarpark = async (req,res) => {
  const { carparkId } = req.params;
  const userId = req.user.id;
  const existingFavourite =
    await favouriteCarparkRepository.findFavouriteByCarParkIdAndUserId(
      carparkId,
      userId
    );
  // Exist and not soft deleted
  if (existingFavourite) {
    throw new Error("Car park is already in your favourites!");
  } else {
    const favourite = await favouriteCarparkRepository.upsertFavouriteCarpark(
      carparkId,
      userId,
    );
    res.status(200).json({
      status: "success",
      message: "Car park added to favourites successfully",
      data: favourite,
    });
  }
};

const deleteFavouriteCarpark = async (req,res) => { 
  const { favouriteCarparkId } = req.params;

  try {
    const favourite = await favouriteCarparkRepository.deleteFavouriteCarpark(
      parseInt(favouriteCarparkId)
    );
    res.status(200).json({
      status: "success",
      message: "Car park deleted from favourites successfully",
      data: favourite,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error occurred while deleting the car park from favourites",
      error: error.message,
    });
  }
};

module.exports = {
  addFavouriteCarpark,
  deleteFavouriteCarpark,
  getFavouriteCarpark,
};
