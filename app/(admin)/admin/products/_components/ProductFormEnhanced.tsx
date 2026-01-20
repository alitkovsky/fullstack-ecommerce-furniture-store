"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProductEnhanced, updateProductEnhanced } from "../../_actions/products_vercel_blob";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";

type ActionErrors = {
  _form?: string[];
  [key: string]: string[] | undefined;
};

export function ProductFormEnhanced({ product }: { product?: Product | null }) {
  const [error, action] = useActionState<ActionErrors, FormData>(
    product == null ? addProductEnhanced : updateProductEnhanced.bind(null, product.id),
    {}
  )
  
  const [priceInCents, setPriceInCents] = useState<number>(
    product?.priceInCents || 0
  );
  
  const [oldPriceInCents, setOldPriceInCents] = useState<number>(
    product?.oldPriceInCents || 0
  );

  const [previewUrls, setPreviewUrls] = useState<string[]>(product?.images || []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <form action={action} className="space-y-8">
        {error._form && (
          <div className="text-destructive bg-red-50 p-4 rounded-md">
            {error._form}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={product?.name || ""}
                placeholder="e.g., Stylish Cafe Chair"
              />
              {error.name && <div className="text-destructive text-sm">{error.name}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input
                type="text"
                id="sku"
                name="sku"
                required
                defaultValue={product?.sku || ""}
                placeholder="e.g., SKU-001"
              />
              {error.sku && <div className="text-destructive text-sm">{error.sku}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select name="category" defaultValue={product?.category || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chairs">Chairs</SelectItem>
                  <SelectItem value="Tables">Tables</SelectItem>
                  <SelectItem value="Sofas">Sofas</SelectItem>
                  <SelectItem value="Beds">Beds</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                  <SelectItem value="Lighting">Lighting</SelectItem>
                  <SelectItem value="Decor">Decor</SelectItem>
                </SelectContent>
              </Select>
              {error.category && <div className="text-destructive text-sm">{error.category}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="collectionIDs">Collections</Label>
              <Input
                type="text"
                id="collectionIDs"
                name="collectionIDs"
                defaultValue={product?.collectionIDs?.join(', ') || ""}
                placeholder="e.g., Dining, Living Room"
              />
              <div className="text-sm text-muted-foreground">
                Separate multiple collections with commas
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                type="text"
                id="tags"
                name="tags"
                defaultValue={product?.tag?.join(', ') || ""}
                placeholder="e.g., modern, comfortable, wooden"
              />
              <div className="text-sm text-muted-foreground">
                Separate multiple tags with commas
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pricing & Inventory</h3>
            
            <div className="space-y-2">
              <Label htmlFor="priceInCents">Price (in cents) *</Label>
              <Input
                type="number"
                id="priceInCents"
                name="priceInCents"
                required
                value={priceInCents}
                onChange={e => setPriceInCents(Number(e.target.value) || 0)}
                placeholder="2500"
              />
              <div className="text-muted-foreground">
                {formatCurrency((priceInCents || 0) / 100)}
              </div>
              {error.priceInCents && (
                <div className="text-destructive text-sm">{error.priceInCents}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="oldPriceInCents">Original Price (optional)</Label>
              <Input
                type="number"
                id="oldPriceInCents"
                name="oldPriceInCents"
                value={oldPriceInCents}
                onChange={e => setOldPriceInCents(Number(e.target.value) || 0)}
                placeholder="3500"
              />
              {oldPriceInCents > 0 && (
                <div className="text-muted-foreground">
                  Original: {formatCurrency(oldPriceInCents / 100)}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercentage">Discount %</Label>
              <Input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                min="0"
                max="100"
                defaultValue={product?.discountPercentage || ""}
                placeholder="30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inventory">Inventory Count *</Label>
              <Input
                type="number"
                id="inventory"
                name="inventory"
                min="0"
                defaultValue={product?.inventory || 0}
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                id="weight"
                name="weight"
                defaultValue={product?.weight || ""}
                placeholder="5.2"
              />
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dimensions (cm)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <Input
                type="number"
                step="0.1"
                id="length"
                name="length"
                defaultValue={product?.dimensions?.length || ""}
                placeholder="80.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                type="number"
                step="0.1"
                id="width"
                name="width"
                defaultValue={product?.dimensions?.width || ""}
                placeholder="60.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                type="number"
                step="0.1"
                id="height"
                name="height"
                defaultValue={product?.dimensions?.height || ""}
                placeholder="45.0"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={product?.description}
            placeholder="Describe the product features, style, and benefits..."
            rows={4}
          />
          {error.description && (
            <div className="text-destructive text-sm">{error.description}</div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information</Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            defaultValue={product?.additionalInfo || ""}
            placeholder="Care instructions, warranty, assembly information..."
            rows={3}
          />
        </div>

        {/* Images */}
        <div className="space-y-4">
          <Label htmlFor="images">Product Images *</Label>
          <Input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required={product == null}
          />
          {error.images && <div className="text-destructive text-sm">{error.images}</div>}
          
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="aspect-square relative">
                  <Image
                    src={url}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Status</h3>
          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNew"
                name="isNew"
                defaultChecked={product?.isNew || false}
                className="h-4 w-4"
              />
              <Label htmlFor="isNew">Mark as New Product</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAvailableForPurchase"
                name="isAvailableForPurchase"
                defaultChecked={product?.isAvailableForPurchase ?? true}
                className="h-4 w-4"
              />
              <Label htmlFor="isAvailableForPurchase">Available for Purchase</Label>
            </div>
          </div>
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? "Saving..." : "Save Product"}
    </Button>
  )
}
