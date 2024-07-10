// src/app/server.js
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const carparkRoutes = require("../api/routes/carparkRoutes");
const favoriteCarparkRoutes = require("../api/routes/favoriteCarparkRoutes");
const { config } = require("dotenv");

const app = express();
const swaggerDocument = require(path.join(__dirname, "..", "swagger.yaml"));

app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use(config.apiPath, carparkRoutes);
app.use(config.apiPath, favoriteCarparkRoutes);

// Health Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "up" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  //Client Initialization
  const container = require("./src/container")();
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
