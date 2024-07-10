-- CreateTable
CREATE TABLE "Carpark" (
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
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavoriteCarpark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carParkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "FavoriteCarpark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FavoriteCarpark_carParkId_fkey" FOREIGN KEY ("carParkId") REFERENCES "Carpark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Carpark_carParkNo_key" ON "Carpark"("carParkNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
