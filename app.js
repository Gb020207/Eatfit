import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import express from 'express';
import router from './backend/src/routes/user.routes.js';
import routerPlans from './backend/src/routes/plan.routes.js';
import routerPost from './backend/src/routes/post.routes.js';
import routerLog from './backend/src/routes/daily.routes.js';
import routerTip from './backend/src/routes/tip.routes.js';
import { connectDB } from './backend/src/config/db.js';
import { seedTips } from './backend/src/scripts/seedTips.js';
import "dotenv/config";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, './frontend')));

// Rutas backend
app.use("/api/users", router);
app.use("/api/plans", routerPlans);
app.use("/api/post", routerPost);
app.use("/api/log", routerLog);
app.use("/api/tips", routerTip);

// Ruta raíz → frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

app.listen(4000, () =>  console.log(`Servidor escuchando en el puerto 4000`));



connectDB();
seedTips(); // Ejecutar el script de seeders al iniciar el servidor



