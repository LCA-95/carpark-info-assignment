const container = require("../container")();
const primaClient = container.services.prismaClient;
const { BOOLEAN_MAPPER } = require("../config/enum");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const BATCH_CONFIG = container.config.BATCH;
const PENDING_DIRECTORY = path.resolve(
  __dirname,
  BATCH_CONFIG.SOURCE_FILE_DIRECTORY
);
const COMPLETED_DIRECTORY = path.resolve(
  __dirname,
  BATCH_CONFIG.COMPLETED_FILE_DIRECTORY
);
const ERROR_DIRECTORY = path.resolve(
  __dirname,
  BATCH_CONFIG.ERROR_FILE_DIRECTORY
);
const FILE_PREFIX = BATCH_CONFIG.SOURCE_FILE_PREFIX;
async function processFile(filePath) {
  const carParks = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const massagedRow = {
          carParkNo: row.car_park_no,
          address: row.address,
          xCoordinate: parseFloat(row.x_coord),
          yCoordinate: parseFloat(row.y_coord),
          carParkType: row.car_park_type,
          parkingSystemType: row.type_of_parking_system,
          isNightParkingAllowed: BOOLEAN_MAPPER[row.night_parking],
          isBasementCarpark: BOOLEAN_MAPPER[row.car_park_basement],
          // Storing to null if is NO for better filtering
          shortTermParking:
            row.short_term_parking === "NO" ? null : row.short_term_parking,
          freeParking: row.free_parking === "NO" ? null : row.free_parking,
          carParkDeckQuantity: parseInt(row.car_park_decks),
          gantryHeight: parseFloat(row.gantry_height),
        };

        carParks.push(massagedRow);
      })
      .on("end", async () => {
        console.log("CSV file successfully processed");
        try {
          // Use Prisma to upsert the car parks
          await primaClient.$transaction(
            carParks.map((carPark) =>
              primaClient.carPark.upsert({
                where: { carParkNo: carPark.carParkNo },
                update: carPark,
                create: carPark,
              })
            )
          );
          console.log("Car parks have been successfully ingested");
          resolve();
        } catch (error) {
          console.error("An error occurred while ingesting car parks:", error);
          reject(error);
        } finally {
          await primaClient.$disconnect();
        }
      })
      .on("error", (error) => {
        console.error("An error occurred while reading the file:", error);
        reject(error);
      });
  });
}

function moveFile(filePath, targetDir) {
  const fileName = path.basename(filePath);
  const targetPath = path.join(targetDir, fileName);
  fs.renameSync(filePath, targetPath);
}

function watchDirectory() {
  fs.watch(PENDING_DIRECTORY, async (eventType, filename) => {
    console.log("WATCHING!", filename);
    if (filename.startsWith(FILE_PREFIX) && filename.endsWith(".csv")) {
      const filePath = path.join(PENDING_DIRECTORY, filename);
      console.log("FOUND! ", filePath);
      if (fs.existsSync(filePath)) {
        try {
          await processFile(filePath);
          moveFile(filePath, COMPLETED_DIRECTORY);
        } catch (error) {
          console.log("ERROR During Ingestion! ", error);
          moveFile(filePath, ERROR_DIRECTORY);
        }
      }
    }
  });

  console.log(`Watching for files in ${PENDING_DIRECTORY}...`);
}

watchDirectory();
