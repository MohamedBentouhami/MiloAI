import { type Review, type Summary } from "../generated/prisma";
import { reviewRepository } from "../repositories/review.repository";
import { llmClient } from "../llm/client";
import { readFileSync } from "fs";
import { join } from "path";

const template = readFileSync(join(__dirname, "../prompts/test.txt"), "utf8");


export const reviewService = {
    async getReviews(productId: number): Promise<Review[]> {        
        return reviewRepository.getReviews(productId);
    },
    async summarizeReview(productId: number): Promise<string> {
        const existingSummary = await reviewRepository.getReviewSummary(productId);
        if (existingSummary) {
            return existingSummary;
        }
        
        const reviews: Review[] = await reviewRepository.getReviews(productId);
        const joinedReviews = reviews.map(r => r.content).join('\n\n');
        const prompt = template.replace('{{reviews}}', joinedReviews);

        const summary = await llmClient.generateText({ model: "openai/gpt-oss-20b:free", prompt });
        await reviewRepository.storeReviewSummary(productId, summary);
        return summary;
    },
    async getReviewSummary(productId: number) {
        return reviewRepository.getReviewSummary(productId);
    }

}



