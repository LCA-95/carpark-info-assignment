const favouriteCarparkRepository = require("../repository/favouriteCarparkRepository");

const addFavouriteCarpark = async (req) => {
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
    const favourite = await favouriteCarparkRepository.upsertFavouriteCarpark({
      where: { carParkId, userId },
    });
    res.status(200).json({
      status: "success",
      message: "Car park added to favourites successfully",
      data: favourite,
    });
  }
};

const deleteFavouriteCarpark = async (req) => {
  const { id } = req.params;

  try {
    const favourite = await favouriteCarparkRepository.deleteFavouriteCarpark(
      Number(id)
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
};
