"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
  file => file.size === 0 || file.type.startsWith("image/")
)

const addSchema = z.object({
  name: z.string().min(1, "Collection name is required"),
  description: z.string().min(1, "Description is required"),
  image: imageSchema.refine(file => file.size > 0, "Required"),
})

/**
 * Uploads an image file to Vercel Blob storage for collections
 * @param file - The image file to upload
 * @param collectionName - Collection name for file naming
 * @returns Promise<string> - The secure URL of the uploaded image
 */
async function uploadCollectionImageToVercelBlob(file: File, collectionName: string): Promise<string> {
  try {
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `furniture-store/collections/${collectionName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${timestamp}.${fileExtension}`;
    
    const blob = await put(fileName, file, {
      access: 'public',
    });
    
    return blob.url;
  } catch (error) {
    console.error('Error uploading collection image to Vercel Blob:', error);
    throw new Error('Failed to upload collection image');
  }
}

export async function addCollection(prevState: unknown, formData: FormData) {
  try {
    // Extract image file separately from form data
    const imageFile = formData.get('image') as File;
    const formEntries = Object.fromEntries(formData.entries());
    
    // Remove image from form data for validation and add it back properly
    delete formEntries.image;
    
    const result = addSchema.safeParse({
      ...formEntries,
      image: imageFile,
    })
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }

    const data = result.data

    // Upload image to Vercel Blob
    console.log('Uploading collection image...');
    const imagePath = await uploadCollectionImageToVercelBlob(data.image, data.name);

    await prisma.collection.create({
      data: {
        name: data.name,
        description: data.description,
        imagePath,
      },
    })

    console.log('Collection created successfully');

    revalidatePath("/")
    revalidatePath("/collections")
    revalidatePath("/admin/collections")

    redirect("/admin/collections")
  } catch (error) {
    console.error('Error creating collection:', error);
    return { _form: ['Failed to create collection. Please try again.'] };
  }
};

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
})

export async function updateCollection(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  try {
    // Extract image file separately from form data
    const imageFile = formData.get('image') as File;
    const formEntries = Object.fromEntries(formData.entries());
    
    // Remove image from form data for validation and add it back properly
    delete formEntries.image;
    
    const result = editSchema.safeParse({
      ...formEntries,
      image: imageFile.size > 0 ? imageFile : undefined,
    })
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const collection = await prisma.collection.findUnique({ where: { id } })

    if (collection == null) return notFound()

    let imagePath = collection.imagePath
    if (data.image != null && data.image.size > 0) {
      // Upload new image to Vercel Blob
      console.log('Uploading new collection image...');
      imagePath = await uploadCollectionImageToVercelBlob(data.image, data.name);
    }

    await prisma.collection.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        imagePath,
      },
    })

    console.log('Collection updated successfully:', id);

    revalidatePath("/")
    revalidatePath("/collections")
    revalidatePath("/admin/collections")

    redirect("/admin/collections")
  } catch (error) {
    console.error('Error updating collection:', error);
    return { _form: ['Failed to update collection. Please try again.'] };
  }
};

export async function deleteCollection(id: string) {
  try {
    const collection = await prisma.collection.delete({ where: { id } })

    if (collection == null) return notFound()

    // Note: Vercel Blob files are automatically managed and don't need manual deletion
    // The blob will remain accessible but no longer referenced
    console.log('Collection deleted successfully:', id);

    revalidatePath("/")
    revalidatePath("/collections")
    revalidatePath("/admin/collections")
  } catch (error) {
    console.error('Error deleting collection:', error);
    throw error;
  }
};
