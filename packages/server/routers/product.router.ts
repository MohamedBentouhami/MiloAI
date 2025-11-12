import { Router } from "express";
import { reviewController } from "../controllers/review.controller";

const productRouter = Router();

productRouter.get('/:id/reviews', reviewController.getReviews);

export default productRouter;