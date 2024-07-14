/*
  Warnings:

  - A unique constraint covering the columns `[carParkId,userId]` on the table `favouriteCarPark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favouriteCarPark_carParkId_userId_key" ON "favouriteCarPark"("carParkId", "userId");
