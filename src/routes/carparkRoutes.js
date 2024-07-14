const express = require('express');
const router = express.Router();
const carParkController = require('../controllers/carparkController');
const authMiddleware = require('../infrastructure/middleware/authentication');

router.get('/carparks', authMiddleware, carParkController.getCarParks); 

module.exports = router;