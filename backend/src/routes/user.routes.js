import { Router } from 'express';
import { getUser, loginUser, registerUser } from '../controllers/userControllers.js';



const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUser );
export default router;
