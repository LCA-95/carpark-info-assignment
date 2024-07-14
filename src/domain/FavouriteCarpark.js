class FavouriteCarpark {
  constructor({ id, userId, carParkId, deletedAt, createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.carParkId = carParkId;
    this.deletedAt = deletedAt;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}

module.exports = FavouriteCarpark;
