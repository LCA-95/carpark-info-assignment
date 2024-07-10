class FavoriteCarpark {
  constructor({ id, userId, carparkId, deletedAt, createdAt, updatedAt }) {
    this.id = id;
    this.userId = userId;
    this.carparkId = carparkId;
    this.deletedAt = deletedAt;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}

module.exports = FavoriteCarpark;
