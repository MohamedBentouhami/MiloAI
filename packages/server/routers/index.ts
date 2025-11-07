import { Router } from "express";
import chatRouter from "./chat.router";
import productRouter from "./product.router";

export const apiRouter = Router();

apiRouter.use('/chat', chatRouter)
apiRouter.use('/products', productRouter)