/**
 * Vercel Blob Storage Utility
 * 
 * This utility handles image uploads and management for Vercel Blob storage
 */

import { put, del, list } from '@vercel/blob';

export interface UploadResult {
  url: string;
  downloadUrl: string;
  pathname: string;
  size: number;
}

/**
 * Upload a file to Vercel Blob storage
 */
export async function uploadImageToBlob(
  file: File | Buffer,
  filename: string,
  contentType?: string
): Promise<UploadResult> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
    }

    const blob = await put(filename, file, {
      access: 'public',
      token,
      contentType: contentType || 'image/jpeg',
    });

    return {
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      size: blob.size,
    };
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete a file from Vercel Blob storage
 */
export async function deleteImageFromBlob(url: string): Promise<void> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
    }

    await del(url, { token });
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error);
    throw new Error(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * List all files in Vercel Blob storage
 */
export async function listBlobImages(): Promise<any[]> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
    }

    const { blobs } = await list({ token });
    return blobs;
  } catch (error) {
    console.error('Error listing Vercel Blob files:', error);
    throw new Error(`Failed to list images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Upload local image file to Blob storage
 */
export async function uploadLocalImageToBlob(
  localPath: string,
  filename: string
): Promise<UploadResult> {
  try {
    const fs = require('fs');
    const path = require('path');
    
    if (!fs.existsSync(localPath)) {
      throw new Error(`Local file does not exist: ${localPath}`);
    }

    const fileBuffer = fs.readFileSync(localPath);
    const extension = path.extname(localPath).toLowerCase();
    
    let contentType = 'image/jpeg';
    if (extension === '.png') contentType = 'image/png';
    if (extension === '.svg') contentType = 'image/svg+xml';
    if (extension === '.webp') contentType = 'image/webp';

    return await uploadImageToBlob(fileBuffer, filename, contentType);
  } catch (error) {
    console.error('Error uploading local image:', error);
    throw error;
  }
}

/**
 * Generate a unique filename for Blob storage
 */
export function generateBlobFilename(originalName: string, productId?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop() || 'jpg';
  
  const prefix = productId ? `product-${productId}` : 'product';
  return `${prefix}-${timestamp}-${random}.${extension}`;
}
