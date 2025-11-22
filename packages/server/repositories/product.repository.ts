import type { Product } from "../generated/prisma";
import prisma from "./prisma.client";


const productRepository = {
    async getProduct(productId : number): Promise<Product | null>{
        return prisma.product.findUnique({
            where : {
                id : productId
            }
        })
    }
}

export default productRepository;