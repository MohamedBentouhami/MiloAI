import type { Product } from "../generated/prisma";
import productRepository from "../repositories/product.repository";

const productService = {
    async getProduct(idProduct : number) : Promise<Product | null>{
        return productRepository.getProduct(idProduct);
    }
}

export default productService;