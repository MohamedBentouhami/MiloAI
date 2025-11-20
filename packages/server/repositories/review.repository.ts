import dayjs from "dayjs";
import { PrismaClient, type Review, type Summary } from "../generated/prisma";

const prisma = new PrismaClient();

export const reviewRepository = {
    async getReviews(productId: number, limit?: number): Promise<Review[]> {
        return await prisma.review.findMany({
            where: { productId },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    },
    async storeReviewSummary(productId: number, summary: string): Promise<Summary> {
        const now = new Date();
        const expiredAt = dayjs().add(7, 'days').toDate();
        const data = {
            content: summary,
            expiredAt,
            generatedAt: now,
            productId
        };
        return prisma.summary.upsert({
            where: { productId },
            create: data,
            update: data
        });
    },
    async getReviewSummary(productId: number): Promise<Summary | null> {
        return await prisma.summary.findUnique({
            where: {
                productId
            }
        })

    }
}