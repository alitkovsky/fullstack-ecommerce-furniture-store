import { PageHeader } from "../../_components/PageHeader";
import { CollectionForm } from "../_components/CollectionForm";

export default function NewCollectionPage() {
  return (
    <section className="mt-6 relative">
      <div className="container mx-auto space-y-4">
        <PageHeader>Add Collection</PageHeader>
        <CollectionForm />
      </div>
    </section>
  )
};