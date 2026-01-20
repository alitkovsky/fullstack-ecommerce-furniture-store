import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        if (!process.env.DATABASE_URL) {
            return NextResponse.json(
                { error: "DATABASE_URL is not set" },
                { status: 500 }
            );
        }
        const products = await prisma.product.findMany({
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
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
