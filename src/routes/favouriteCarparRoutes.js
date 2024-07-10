const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/favoriteController');
const favoriteController = new FavoriteController();
const authMiddleware = require('../../../middlewares/authMiddleware');

router.post('/carparks/:carparkId/favorite', authMiddleware, favoriteController.addFavorite(req));
router.delete('/favorites/:id', authMiddleware, favoriteController.removeFavorite(req));

module.exports = router;