import { Router } from "express";
import { reviewController } from "../controllers/review.controller";

const productRouter = Router();

productRouter.get('/:id/reviews', reviewController.getReviews);
productRouter.post('/:id/reviews/summarize', reviewController.summarizeReviews);

export default productRouter;