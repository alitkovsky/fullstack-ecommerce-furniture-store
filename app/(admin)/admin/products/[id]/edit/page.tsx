import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";
import React from "react";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findUnique({ where: { id } })

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  )
};