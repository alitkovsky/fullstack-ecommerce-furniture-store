"use server";

import { prisma as db } from "@/lib/prisma";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (you'll need to add these to your .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  additionalInfo: z.string().optional(),
  category: z.string().min(1),
  collectionIDs: z.string().transform(val => val ? val.split(',') : []),
  priceInCents: z.coerce.number().int().min(1),
  oldPriceInCents: z.coerce.number().int().optional(),
  discountPercentage: z.coerce.number().int().min(0).max(100).optional(),
  inventory: z.coerce.number().int().min(0).default(0),
  sku: z.string().min(1),
  tags: z.string().transform(val => val ? val.split(',').map(tag => tag.trim()) : []),
  isNew: z.boolean().default(false),
  isAvailableForPurchase: z.boolean().default(true),
  weight: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  images: z.array(imageSchema).min(1, "At least one image is required"),
})

async function uploadImageToCloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        resource_type: "image",
        folder: "furniture-store/products",
        transformation: [
          { width: 800, height: 800, crop: "limit", quality: "auto" }
        ]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    ).end(buffer);
  });
}

export async function addProductEnhanced(prevState: unknown, formData: FormData) {
  // Extract files separately
  const files = formData.getAll('images') as File[];
  const formEntries = Object.fromEntries(formData.entries());
  
  // Remove images from form data for validation
  delete formEntries.images;
  
  const result = addSchema.safeParse({
    ...formEntries,
    images: files,
    isNew: formData.get('isNew') === 'on',
    isAvailableForPurchase: formData.get('isAvailableForPurchase') === 'on',
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      data.images.map(file => uploadImageToCloudinary(file))
    );

    // Create dimensions object if provided
    const dimensions = (data.length && data.width && data.height) ? {
      length: data.length,
      width: data.width,
      height: data.height
    } : undefined;

    await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        additionalInfo: data.additionalInfo,
        category: data.category,
        collectionIDs: data.collectionIDs,
        priceInCents: data.priceInCents,
        oldPriceInCents: data.oldPriceInCents,
        discountPercentage: data.discountPercentage,
        inventory: data.inventory,
        sku: data.sku,
        tag: data.tags,
        isNew: data.isNew,
        isAvailableForPurchase: data.isAvailableForPurchase,
        weight: data.weight,
        dimensions: dimensions,
        images: imageUrls,
        imagePath: imageUrls[0], // Primary image for admin compatibility
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    redirect("/admin/products");
  } catch (error) {
    console.error('Error creating product:', error);
    return { _form: ['Failed to create product. Please try again.'] };
  }
}

export async function updateProductEnhanced(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const product = await db.product.findUnique({ where: { id } });
  
  if (product == null) return notFound();

  const files = formData.getAll('images') as File[];
  const formEntries = Object.fromEntries(formData.entries());
  
  // Handle optional images for updates
  const editSchema = addSchema.extend({
    images: z.array(imageSchema).optional(),
  });

  const result = editSchema.safeParse({
    ...formEntries,
    images: files.length > 0 ? files : undefined,
    isNew: formData.get('isNew') === 'on',
    isAvailableForPurchase: formData.get('isAvailableForPurchase') === 'on',
  });

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    let imageUrls = product.images;
    
    // Upload new images if provided
    if (data.images && data.images.length > 0) {
      imageUrls = await Promise.all(
        data.images.map(file => uploadImageToCloudinary(file))
      );
    }

    // Create dimensions object if provided
    const dimensions = (data.length && data.width && data.height) ? {
      length: data.length,
      width: data.width,
      height: data.height
    } : product.dimensions;

    await db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        additionalInfo: data.additionalInfo,
        category: data.category,
        collectionIDs: data.collectionIDs,
        priceInCents: data.priceInCents,
        oldPriceInCents: data.oldPriceInCents,
        discountPercentage: data.discountPercentage,
        inventory: data.inventory,
        sku: data.sku,
        tag: data.tags,
        isNew: data.isNew,
        isAvailableForPurchase: data.isAvailableForPurchase,
        weight: data.weight,
        dimensions: dimensions,
        images: imageUrls,
        imagePath: imageUrls[0],
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    redirect("/admin/products");
  } catch (error) {
    console.error('Error updating product:', error);
    return { _form: ['Failed to update product. Please try again.'] };
  }
}

// Bulk actions
export async function toggleMultipleProducts(ids: string[], isAvailable: boolean) {
  await db.product.updateMany({
    where: { id: { in: ids } },
    data: { isAvailableForPurchase: isAvailable }
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function deleteMultipleProducts(ids: string[]) {
  // Check if any products have orders
  const productsWithOrders = await db.product.findMany({
    where: { 
      id: { in: ids },
      orders: { some: {} }
    },
    select: { id: true, name: true }
  });

  if (productsWithOrders.length > 0) {
    return { 
      error: `Cannot delete products with existing orders: ${productsWithOrders.map(p => p.name).join(', ')}` 
    };
  }

  await db.product.deleteMany({
    where: { id: { in: ids } }
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

// Seed function to migrate existing data
export async function seedProductsFromStatic() {
  const { default: staticProducts } = await import("@/app/data/products");
  
  const productsData = staticProducts.map((product, index) => ({
    name: product.title,
    description: product.about,
    priceInCents: product.price * 100, // Convert to cents
    oldPriceInCents: product.oldprice ? product.oldprice * 100 : undefined,
    discountPercentage: product.discount,
    images: [product.image.src], // This will need manual cloud upload
    isNew: product.isnew,
    isAvailableForPurchase: true,
    inventory: 10, // Default inventory
    sku: `SKU-${product.id.toString().padStart(3, '0')}`,
    category: "Furniture",
    collectionIDs: ["General"],
    tag: ["furniture"],
  }));

  await db.product.createMany({
    data: productsData,
    skipDuplicates: true,
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}
