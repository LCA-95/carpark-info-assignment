const express = require('express');
const router = express.Router();
const CarParkController = require('../controllers/carparkController');
const carParkController = new CarParkController();
const authMiddleware = require('../../../middlewares/authMiddleware');

router.get('/carparks', authMiddleware, carParkController.getCarParks); 

module.exports = router;