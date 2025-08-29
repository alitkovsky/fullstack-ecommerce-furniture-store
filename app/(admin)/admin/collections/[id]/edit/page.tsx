import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../_components/PageHeader";
import { CollectionForm } from "../../_components/CollectionForm";
import React from "react";

export default async function EditCollectionPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const collection = await prisma.collection.findUnique({ where: { id } })

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <CollectionForm collection={collection} />
    </>
  )
};