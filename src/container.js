//Variable
const logger = console;
const { PrismaClient } = require("@prisma/client");
const config = require("./config/config");
let container;

/* Sample to setup related integration client
//AWS Related 
const AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: CONFIG.AWS.AWS_ACCESS_KEY_ID,
    secretAccessKey: CONFIG.AWS.AWS_SECRET_ACCESS_KEY,
    region: CONFIG.AWS.REGION
});
const s3BucketClient = new AWS.S3();
const awsService = require("./services/awsService")({
    CONFIG,
    logger,
    s3BucketClient,
});
*/

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: config.DATABASE_URL,
    },
  },
});

module.exports = () => {
  logger.log("Container Initialization Start...");
  if (container) {
    logger.log("Container Initialized Previously");
    return container;
  }

  container = {
    config,
    logger,
    services: {
      // Database Service Related
      prismaClient,

      //Sample
      // Intergration Services Related
      //googleMapService
      //azureService
      //awsService
    },
  };

  return container;
};
