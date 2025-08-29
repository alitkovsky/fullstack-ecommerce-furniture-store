import React from "react";
import { PageHeader } from "../../_components/PageHeader";
// Using enhanced form with Vercel Blob storage and comprehensive validation
import { ProductFormEnhanced } from "../_components/ProductFormEnhanced";

export default function NewProductPage() {
  return (
    <section className="p-8 lg:p-20 relative">
      <div className="container mx-auto space-y-4">
        <PageHeader>Add Product</PageHeader>
        <ProductFormEnhanced />
      </div>
    </section>
  )
};