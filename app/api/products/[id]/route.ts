import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!process.env.DATABASE_URL) {
            return NextResponse.json(
                { error: "DATABASE_URL is not set" },
                { status: 500 }
            );
        }
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                additionalInfo: true,
                priceInCents: true,
                oldPriceInCents: true,
                discountPercentage: true,
                images: true,
                imagePath: true,
                isNew: true,
                isAvailableForPurchase: true,
                inventory: true,
                category: true,
                collectionIDs: true,
                tag: true,
                sku: true,
                weight: true,
                dimensions: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
