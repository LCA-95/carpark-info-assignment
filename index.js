// src/app/server.js
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const path = require("path");
const carparkRoutes = require("./src/routes/carparkRoutes");
const favouriteCarparkRoutes = require("./src/routes/favouriteCarparkRoutes");
const config = require("./src/config/config");

const app = express();

app.use(bodyParser.json());

const swaggerDocument = yaml.load(path.join(__dirname, "/src/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use(config.API_PATH, carparkRoutes);
app.use(config.API_PATH, favouriteCarparkRoutes);

// Health Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "up" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Client Initialization
  const container = require("./src/container")();
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
