/*
  Warnings:

  - You are about to drop the `favoriteCarPark` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "favoriteCarPark";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "favouriteCarPark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carParkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "favouriteCarPark_carParkId_fkey" FOREIGN KEY ("carParkId") REFERENCES "carPark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favouriteCarPark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "favouriteCarPark_carParkId_userId_key" ON "favouriteCarPark"("carParkId", "userId");
