const express = require('express');
const router = express.Router();
const favouriteCarparkController = require('../controllers/favouriteCarparkController');
const authMiddleware = require('../infrastructure/middleware/authentication');

router.post('/carparks/:carparkId/favourite', authMiddleware, favouriteCarparkController.addFavouriteCarpark);
router.delete('/favourites/:id', authMiddleware, favouriteCarparkController.deleteFavouriteCarpark);

module.exports = router;