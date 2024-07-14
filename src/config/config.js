require("dotenv").config();

module.exports = {
  API_PATH: process.env.API__PATH || `/api/v1`,
  PORT: process.env.PORT || 3000,
  PAGE_NUMBER: 1,
  PAGE_SIZE: 20,
  JWT: {
    SECRET: process.env.JWT_SECRET || "1234567890POIUYTREWQASDFGHJKL",
    BEARER_EXPIRES_IN: "90d",
    REFRESH_EXPIRES_IN: "100d",
    REFRESH: "Refresh",
    BEARER: "Bearer",
  },
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
  BATCH: {
    SOURCE_FILE_DIRECTORY:
      process.env.BATCH__SOURCE_FILE_DIRECTORY || "../../data/pending",
    ERROR_FILE_DIRECTORY:
      process.env.BATCH__ERROR_FILE_DIRECTORY || "../../data/error",
    COMPLETED_FILE_DIRECTORY:
      process.env.BATCH__COMPLETED_FILE_DIRECTORY || "../../data/completed",
    SOURCE_FILE_PREFIX:
      process.env.BATCH__SOURCE_FILE_PREFIX || "hdb-carpark-information-",
  },
};
