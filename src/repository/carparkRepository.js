const container = require("../container")();
const CarPark = require("./CarPark");

const getCarparks = async (
  criteria,
  page,
  limit
) => {
  const carParks = await container.services.prismaClient.carPark.findMany({
    where: { ...criteria },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalCount = await container.services.prismaClient.carPark.count({
    where: { ...criteria },
  });

  return {
    data: carParks.map((carPark) => new CarPark(carPark)),
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export default {
  getCarparks,
};
