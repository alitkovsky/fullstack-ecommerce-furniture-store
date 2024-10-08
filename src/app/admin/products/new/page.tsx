import { PageHeader } from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

export default function NewProductPage() {
  return (
    <section className="mt-6 relative">
      <div className="container mx-auto space-y-4">
        <PageHeader>Add Product</PageHeader>
        <ProductForm />
      </div>
    </section>
  )
};