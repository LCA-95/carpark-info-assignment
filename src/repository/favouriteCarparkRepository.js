const container = require("../container")();
const FavouriteCarpark = require("../domain/FavouriteCarpark");

const upsertFavouriteCarpark = async (carParkId, userId) => {
  const favourite =
    await container.services.prismaClient.favouriteCarPark.upsert({
      where: {
        carParkId_userId: {
          userId: parseInt(userId),
          carParkId: parseInt(carParkId),
        },
      },
      // Update Flow
      update: {
        deletedAt: null,
        updatedAt: new Date(),
      },
      // Creation Flow
      create: {
        carParkId: parseInt(carParkId),
        userId: parseInt(userId),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  return new FavouriteCarpark(favourite);
};

const deleteFavouriteCarpark = async (favouriteCarparkId) => {
  const favourite =
    await container.services.prismaClient.favouriteCarPark.update({
      where: { id: parseInt(favouriteCarparkId) },
      data: { deletedAt: new Date() },
    });
  return new FavouriteCarpark(favourite);
};

const findFavouriteByCarParkIdAndUserId = async (carParkId, userId) => {
  const favourite =
    await container.services.prismaClient.favouriteCarPark.findFirst({
      where: { carParkId: parseInt(carParkId), userId: parseInt(userId), deletedAt: null },
    });
  return favourite ? new FavouriteCarpark(favourite) : null;
};

const findFavouriteByUserId = async (userId) => {
  const favourites =
    await container.services.prismaClient.favouriteCarPark.findMany({
      where: { userId: parseInt(userId), deletedAt: null },
      include: {
        carPark: true, // Include related car park details (Prisma Method)
      },
    });
  return favourites.map((favourite) => new FavouriteCarpark(favourite));
};

module.exports = {
  upsertFavouriteCarpark,
  deleteFavouriteCarpark,
  findFavouriteByCarParkIdAndUserId,
  findFavouriteByUserId,
};
