const container = require("../container")();
const FavouriteCarpark = require("../domain/FavouriteCarpark");

const upsertFavouriteCarpark = async (carParkId, userId) => {
  const favourite = await container.services.prismaClient.favourite.upsert({
    where: {
      userId,
      carParkId,
    },
    update: {
      deletedAt: null,
      updatedAt: new Date(),
    },
  });
  return new FavouriteCarpark(favourite);
};

const deleteFavouriteCarpark = async (favouriteCarparkId) => {
  const favourite = await container.services.prismaClient.favourite.update({
    where: { id: favouriteCarparkId },
    data: { deletedAt: new Date() },
  });
  return new FavouriteCarpark(favourite);
};

const findFavouriteByCarParkIdAndUserId = async (carParkId, userId) => {
  const favourite = await container.services.prismaClient.favourite.findFirst({
    where: { carParkId, userId },
  });
  return favourite ? new FavouriteCarpark(favourite) : null;
};

module.exports = {
  upsertFavouriteCarpark,
  deleteFavouriteCarpark,
  findFavouriteByCarParkIdAndUserId,
};
