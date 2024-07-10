const container = require("../container")();
const FavoriteCarpark = require("../domain/FavouriteCarpark");

const upsertFavouriteCarpark = async (carParkId, userId) => {
  const favorite = await container.services.prismaClient.favorite.upsert({
    where: {
      userId,
      carParkId,
    },
    update: {
      deletedAt: null,
      updatedAt: new Date(),
    },
  });
  return new FavoriteCarpark(favorite);
};

const deleteFavoriteCarpark = async (favoriteCarparkId) => {
  const favorite = await container.services.prismaClient.favorite.update({
    where: { id: favoriteCarparkId },
    data: { deletedAt: new Date() },
  });
  return new FavoriteCarpark(favorite);
};

const findFavoriteByCarParkIdAndUserId = async (carParkId, userId) => {
  const favorite = await container.services.prismaClient.favorite.findFirst({
    where: { carParkId, userId },
  });
  return favorite ? new Favorite(favorite) : null;
};

export default {
  upsertFavouriteCarpark,
  deleteFavoriteCarpark,
  findFavoriteByCarParkIdAndUserId,
};
