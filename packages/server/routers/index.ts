import { Router } from "express";
import chatRouter from "./chat.router";

export const apiRouter = Router();

apiRouter.use('/chat', chatRouter)