const express = require('express');
const router = express.Router();
const favouriteCarparkController = require('../controllers/favouriteCarparkController');
const authMiddleware = require('../infrastructure/middleware/authentication');

router.get('/carparks/favourites', authMiddleware, favouriteCarparkController.getFavouriteCarpark);
router.post('/carparks/:carparkId/favourites', authMiddleware, favouriteCarparkController.addFavouriteCarpark);
router.delete('/carparks/favourites/:favouriteCarparkId', authMiddleware, favouriteCarparkController.deleteFavouriteCarpark);

module.exports = router;