import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { CollectionForm } from "../../_components/CollectionForm";

export default async function EditCollectionPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const collection = await db.collection.findUnique({ where: { id } })

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <CollectionForm collection={collection} />
    </>
  )
};