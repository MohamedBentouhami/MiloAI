import dayjs from "dayjs";
import { type Review, type Summary } from "../generated/prisma";
import prisma from "./prisma.client";


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
    async getReviewSummary(productId: number): Promise<string | null> {
        const summary = await prisma.summary.findFirst({
            where: {
                AND: {
                    productId,
                    expiredAt: { gt: new Date() }
                }
            }
        })

        return summary ? summary.content : null;

    }
}