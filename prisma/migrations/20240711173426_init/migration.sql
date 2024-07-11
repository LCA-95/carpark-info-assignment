/*
  Warnings:

  - You are about to drop the `Carpark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteCarpark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Carpark";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FavoriteCarpark";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "carPark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carParkNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "xCoordinate" REAL NOT NULL,
    "yCoordinate" REAL NOT NULL,
    "carParkType" TEXT NOT NULL,
    "parkingSystemType" TEXT NOT NULL,
    "shortTermParking" TEXT,
    "freeParking" TEXT,
    "isNightParkingAllowed" BOOLEAN NOT NULL,
    "carParkDeckQuantity" INTEGER NOT NULL,
    "gantryHeight" REAL NOT NULL,
    "isBasementCarpark" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "favoriteCarPark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carParkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "favoriteCarPark_carParkId_fkey" FOREIGN KEY ("carParkId") REFERENCES "carPark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favoriteCarPark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "carPark_carParkNo_key" ON "carPark"("carParkNo");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
