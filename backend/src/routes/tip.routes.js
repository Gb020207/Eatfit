import express from 'express';
import { getAllTips, getTipOfTheDay, getRandomTip, toggleFavorite, getFavorites } from '../controllers/tip.controllers.js';
import { protect } from '../middleware/authmiddleware.js';
import { tipExists } from '../middleware/tipMiddleware.js';

const routerTip = express.Router();


// routerTip.get('/today', tipExists, getTipOfTheDay); // usamos el middlewar
routerTip.get('/', getAllTips);
routerTip.get('/today', protect, getTipOfTheDay,tipExists);       // devuelve tip y si es favorito (si está auth)
routerTip.get('/random', getRandomTip);
routerTip.post('/:id/favorite', protect, toggleFavorite);
routerTip.get('/favorites', protect, getFavorites);

export default routerTip;
