/**
 * Enhanced Admin Product Actions with Vercel Blob Storage
 * 
 * This file provides comprehensive CRUD operations for furniture products with:
 * - Vercel Blob storage for image uploads
 * - Enhanced validation with Zod schemas
 * - Bulk operations for admin efficiency
 * - Proper error handling and user feedback
 * 
 * Created as part of the e-commerce modernization project
 */

"use server";

import { prisma as db } from "@/lib/prisma";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

// Validation schemas for form data
const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image" }
);

const addSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  additionalInfo: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  collectionIDs: z.string().transform(val => val ? val.split(',').map(s => s.trim()).filter(Boolean) : []),
  priceInCents: z.coerce.number().int().min(1, "Price must be greater than 0"),
  oldPriceInCents: z.coerce.number().int().optional().transform(val => val === 0 ? undefined : val),
  discountPercentage: z.coerce.number().int().min(0).max(100).optional(),
  inventory: z.coerce.number().int().min(0).default(0),
  sku: z.string().min(1, "SKU is required"),
  tags: z.string().transform(val => val ? val.split(',').map(tag => tag.trim()).filter(Boolean) : []),
  isNew: z.boolean().default(false),
  isAvailableForPurchase: z.boolean().default(true),
  weight: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  images: z.array(imageSchema).min(1, "At least one image is required"),
});

/**
 * Uploads an image file to Vercel Blob storage
 * @param file - The image file to upload
 * @param productName - Product name for file naming
 * @returns Promise<string> - The secure URL of the uploaded image
 */
async function uploadImageToVercelBlob(file: File, productName: string): Promise<string> {
  try {
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `furniture-store/products/${productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${timestamp}.${fileExtension}`;
    
    const blob = await put(fileName, file, {
      access: 'public',
    });
    
    return blob.url;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Creates a new product with image uploads
 * This is a Server Action that handles form submission from the admin panel
 */
export async function addProductEnhanced(prevState: unknown, formData: FormData) {
  try {
    // Extract files separately from form data
    const files = formData.getAll('images') as File[];
    const formEntries = Object.fromEntries(formData.entries());
    
    // Remove images from form data for validation
    delete formEntries.images;
    
    // Validate form data
    const result = addSchema.safeParse({
      ...formEntries,
      images: files,
      isNew: formData.get('isNew') === 'on',
      isAvailableForPurchase: formData.get('isAvailableForPurchase') === 'on',
    });

    if (result.success === false) {
      console.log('Validation errors:', result.error.formErrors.fieldErrors);
      return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    // Check if SKU already exists
    const existingSku = await db.product.findUnique({
      where: { sku: data.sku }
    });

    if (existingSku) {
      return { sku: ['SKU already exists'] };
    }

    // Upload images to Vercel Blob
    console.log('Uploading', data.images.length, 'images...');
    const imageUrls = await Promise.all(
      data.images.map(file => uploadImageToVercelBlob(file, data.name))
    );

    // Create dimensions object if provided
    const dimensions = (data.length && data.width && data.height) ? {
      length: data.length,
      width: data.width,
      height: data.height
    } : undefined;

    // Create product in database
    const product = await db.product.create({
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

    console.log('Product created successfully:', product.id);

    // Revalidate relevant pages
    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    redirect("/admin/products");
  } catch (error) {
    console.error('Error creating product:', error);
    return { _form: ['Failed to create product. Please try again.'] };
  }
}

/**
 * Updates an existing product with optional image uploads
 */
export async function updateProductEnhanced(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  try {
    // Find existing product
    const product = await db.product.findUnique({ where: { id } });
    
    if (product == null) return notFound();

    const files = formData.getAll('images') as File[];
    const formEntries = Object.fromEntries(formData.entries());
    
    // Handle optional images for updates
    const editSchema = addSchema.extend({
      images: z.array(imageSchema).optional(),
      sku: z.string().min(1, "SKU is required").refine(async (sku) => {
        if (sku === product.sku) return true; // Allow same SKU for current product
        const existing = await db.product.findUnique({ where: { sku } });
        return !existing;
      }, "SKU already exists"),
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

    let imageUrls = product.images;
    
    // Upload new images if provided
    if (data.images && data.images.length > 0) {
      console.log('Uploading', data.images.length, 'new images...');
      imageUrls = await Promise.all(
        data.images.map(file => uploadImageToVercelBlob(file, data.name))
      );
    }

    // Create dimensions object if provided
    const dimensions = (data.length && data.width && data.height) ? {
      length: data.length,
      width: data.width,
      height: data.height
    } : product.dimensions;

    // Update product in database
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

    console.log('Product updated successfully:', id);

    // Revalidate relevant pages
    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    redirect("/admin/products");
  } catch (error) {
    console.error('Error updating product:', error);
    return { _form: ['Failed to update product. Please try again.'] };
  }
}

/**
 * Toggle availability status for a single product
 */
export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  try {
    await db.product.update({ 
      where: { id }, 
      data: { isAvailableForPurchase } 
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
  } catch (error) {
    console.error('Error toggling product availability:', error);
    throw error;
  }
}

/**
 * Delete a single product (with order history check)
 */
export async function deleteProduct(id: string) {
  try {
    // Check if product has any orders
    const productWithOrders = await db.product.findUnique({
      where: { id },
      include: { orderItems: true }
    });

    if (!productWithOrders) return notFound();

    if (productWithOrders.orderItems.length > 0) {
      throw new Error('Cannot delete product with existing orders');
    }

    await db.product.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

/**
 * Bulk operations for admin efficiency
 */
export async function toggleMultipleProducts(ids: string[], isAvailable: boolean) {
  try {
    await db.product.updateMany({
      where: { id: { in: ids } },
      data: { isAvailableForPurchase: isAvailable }
    });

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
  } catch (error) {
    console.error('Error toggling multiple products:', error);
    throw error;
  }
}

export async function deleteMultipleProducts(ids: string[]) {
  try {
    // Check if any products have orders
    const productsWithOrders = await db.product.findMany({
      where: { 
        id: { in: ids },
        orderItems: { some: {} }
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
  } catch (error) {
    console.error('Error deleting multiple products:', error);
    throw error;
  }
}

/**
 * Seed function to migrate existing static data to database
 * This helps transition from the old static data system
 */
export async function seedProductsFromStatic() {
  try {
    // Import static products data
    const { default: staticProducts } = await import("@/app/data/products");
    
    const productsData = staticProducts.map((product, index) => ({
      name: product.title,
      description: product.about,
      priceInCents: product.price * 100, // Convert to cents
      oldPriceInCents: product.oldprice ? product.oldprice * 100 : undefined,
      discountPercentage: product.discount,
      images: ["/assets/img/products/placeholder.jpg"], // Placeholder - requires manual image upload
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

    console.log(`Seeded ${productsData.length} products from static data`);

    revalidatePath("/");
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    
    return { success: `Successfully migrated ${productsData.length} products` };
  } catch (error) {
    console.error('Error seeding products:', error);
    return { error: 'Failed to migrate products' };
  }
}
