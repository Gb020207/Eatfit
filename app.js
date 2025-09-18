import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import router from './src/routes/user.routes.js';
import routerPlans from './src/routes/plan.routes.js';
import routerPost from './src/routes/post.routes.js';
import routerLog from './src/routes/daily.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);


app.use("/api/users", router);
app.use("/api/plans", routerPlans);
app.use("/api/post", routerPost);
app.use("/api/log", routerLog);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
  });
});



