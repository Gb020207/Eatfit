import express from 'express';
import { getAllTips, getTipOfTheDay, getRandomTip, toggleFavorite, getFavorites } from '../controllers/tip.controllers.js';
import { protect } from '../middleware/authmiddleware.js';

const routerTip = express.Router();

routerTip.get('/', getAllTips);
routerTip.get('/today', protect, getTipOfTheDay);       // devuelve tip y si es favorito (si está auth)
routerTip.get('/random', getRandomTip);
routerTip.post('/:id/favorite', protect, toggleFavorite);
routerTip.get('/favorites', protect, getFavorites);

export default routerTip;
