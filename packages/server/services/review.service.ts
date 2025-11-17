import { type Review } from "../generated/prisma";
import { reviewRepository } from "../repositories/review.repository";
import { llmClient } from "../llm/client";

export const reviewService = {
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },
    async summarizeReview(productId: number): Promise<string> {
        const reviews: Review[] = await reviewRepository.getReviews(productId);
        const joinedReviews = reviews.map(r => r.content).join('\n\n');
        const prompt = `
            Summarize the following customers reviews into a short paragraph highlighting kry themes, both positive and negative :
            ${joinedReviews}
            `;

        return llmClient.generateText({ model: "openai/gpt-oss-20b:free", prompt });

    }
}



