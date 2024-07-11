/*
  Warnings:

  - A unique constraint covering the columns `[carParkId,userId]` on the table `favoriteCarPark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favoriteCarPark_carParkId_userId_key" ON "favoriteCarPark"("carParkId", "userId");
