const favoriteCarparkRepository = require("./favoriteCarparkRepository");

const addFavouriteCarpark = async (req) => {
  const { carparkId } = req.params;
  const userId = req.user.id;
  const existingFavorite =
    await favoriteCarparkRepository.findFavoriteByCarParkIdAndUserId(
        carparkId,
      userId
    );

  // Exist and not soft deleted
  if (existingFavorite) {
    throw new Error("Car park is already in your favorites!");
  } else {
    const favorite = await favoriteCarparkRepository.upsertFavouriteCarpark({
      where: { carParkId, userId },
    });
    res.status(200).json({
      status: "success",
      message: "Car park added to favorites successfully",
      data: favorite,
    });
  }
};

const deleteFavoriteCarpark = async (req) => {
  const { id } = req.params;

  try {
    const favorite = await favoriteCarparkRepository.deleteFavoriteCarpark(
      Number(id)
    );
    res.status(200).json({
      status: "success",
      message: "Car park deleted from favorites successfully",
      data: favorite,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "An error occurred while deleting the car park from favorites",
      error: error.message,
    });
  }
};

export default {
  addFavouriteCarpark,
  deleteFavoriteCarpark,
};
