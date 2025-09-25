// routes/comment.routes.js
import express from "express";
import { createComment, getAllComments } from "../controllers/comment.controller.js";

const routerComent = express.Router();

routerComent.get("/", getAllComments);
routerComent.post("/", createComment);

export default routerComent;
