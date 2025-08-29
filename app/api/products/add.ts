import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { products: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; result?: Prisma.BatchPayload; }): any; new(): any; }; }; }) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { products } = req.body;

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