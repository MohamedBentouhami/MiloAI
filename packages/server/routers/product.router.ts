import { Router } from "express";

const productRouter = Router();

productRouter.get('/:id/reviews');

export default productRouter;