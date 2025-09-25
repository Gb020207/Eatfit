import { Tip } from '../models/tip.models.js';
import { User } from '../models/user.models.js';
import { Op } from 'sequelize';

// Devuelve todos los tips (paginable si querés)
export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.findAll({ order: [['id','ASC']] });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tips', error: err.message });
  }
};

// Tip del día: rotativo según fecha
export const getTipOfTheDay = async (req, res) => {
   const tip = req.tip; // lo puso el middleware
  res.json({ tip });
  try {
    const tips = await Tip.findAll({ order: [['id','ASC']] });
    if (!tips.length) return res.status(404).json({ message: 'No hay tips disponibles' });

    const today = new Date();
    const dayIndex = Math.floor(today.setHours(0,0,0,0) / (1000 * 60 * 60 * 24)); // days since epoch
    const idx = dayIndex % tips.length;
    const tip = tips[idx];

    // si el usuario está logueado, devolver también si está en favoritos
    let isFavorite = false;
    if (req.user) {
      const user = await User.findByPk(req.user.id);
      const favs = await user.getTips({ where: { id: tip.id } });
      isFavorite = favs.length > 0;
    }

    res.json({ tip, isFavorite });
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tip del día', error: err.message });
  }
};

// Tip aleatorio
export const getRandomTip = async (req, res) => {
  try {
    const count = await Tip.count();
    if (count === 0) return res.status(404).json({ message: 'No hay tips' });
    const offset = Math.floor(Math.random() * count);
    const tip = await Tip.findOne({ offset });
    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo tip aleatorio', error: err.message });
  }
};

// Favorito toggle: marca o desmarca
export const toggleFavorite = async (req, res) => {
  try {
    const tipId = req.params.id;
    const user = await User.findByPk(req.user.id);
    const tip = await Tip.findByPk(tipId);
    if (!tip) return res.status(404).json({ message: 'Tip no encontrado' });

    const isFav = await user.hasTip(tip);
    if (isFav) {
      await user.removeTip(tip);
      return res.json({ message: 'Tip removido de favoritos' });
    } else {
      await user.addTip(tip);
      return res.json({ message: 'Tip añadido a favoritos' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error marcando favorito', error: err.message });
  }
};

// Obtener favoritos del usuario
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const tips = await user.getTips({ order: [['id','ASC']] });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo favoritos', error: err.message });
  }
};
