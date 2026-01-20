import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface ProductInput {
  name: string;
  description: string;
  additionalInfo?: string;
  priceInCents: number;
  oldPriceInCents?: number;
  discountPercentage?: number;
  images: string[];
  isNew?: boolean;
  sku: string;
  tag: string[];
}

interface RequestBody {
  products: ProductInput[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { products } = req.body as RequestBody;

  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  try {
    const result = await prisma.product.createMany({
      data: products.map((product) => ({
        name: product.name,
        description: product.description,
        additionalInfo: product.additionalInfo,
        priceInCents: product.priceInCents,
        oldPriceInCents: product.oldPriceInCents,
        discountPercentage: product.discountPercentage,
        images: product.images,
        isNew: product.isNew,
        sku: product.sku,
        tag: product.tag,
      })),
    });

    return res.status(200).json({ message: "Products added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while adding products" });
  }
};
