import express from 'express';
import { createPost, getPosts } from '../controllers/post.controllers.js';
import { protect } from '../middleware/authmiddleware.js';
import { checkContent } from '../middleware/post.middleware.js';

const routerPost = express.Router();

// Crear post protegido y moderado
routerPost.post('/', protect, checkContent, createPost);

// Obtener todos los posts
routerPost.get('/', protect, getPosts);

export default routerPost;
