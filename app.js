import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import router from './backend/src/routes/user.routes.js';
import routerPlans from './backend/src/routes/plan.routes.js';
import routerPost from './backend/src/routes/post.routes.js';
import routerLog from './backend/src/routes/daily.routes.js';
import routerTip from './backend/src/routes/tip.routes.js';
import { tipExists } from './backend/src/middleware/tipMiddleware.js';
import { connectDB } from './backend/src/config/db.js';

import { User } from './backend/src/models/user.models.js';
import { protect } from './backend/src/middleware/authmiddleware.js';
import routerComent from './backend/src/routes/comment.route.js';
import routerPanel from './backend/src/routes/panel.route.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, './frontend')));

// Rutas backend
app.use("/api/users", router);
app.use("/api/plans", routerPlans);
app.use("/api/post", routerPost);
app.use("/api/log", routerLog);
app.use("/api/tip", routerTip);
app.use("/api/comments", routerComent)
app.use('/api/progreso', routerPanel);
// Ruta raíz → frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

// Ruta protegida: obtener datos del usuario logueado
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); // req.user.id viene del token
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});
app.listen(3000, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));




connectDB();



