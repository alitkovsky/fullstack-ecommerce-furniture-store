import { prisma } from "@/lib/prisma";

/**
 * Fetch all products from the database.
 * This function can be imported and used throughout the app.
 */
export async function getProducts() {
    return await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            priceInCents: true,
            oldPriceInCents: true,
            discountPercentage: true,
            images: true,
            isNew: true,
        },
    });
};