import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";

import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import Hero from "@/components/Hero";



const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}, ["/", "getNewestProducts"])

export default function HomePage() {

  return (
    <section>
      <Hero />
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
    </section>
  )
};

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <section className="mt-[80px] xl:mt-[200px] relative z-20">
      <div className="container mx-auto space-y-4">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button variant="outline" asChild>
            <Link href="/products" className="space-x-2">
              <span>View All</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductSuspense productsFetcher={productsFetcher} />
          </Suspense>
        </div>
      </div>
    </section>
  )
};

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product} />
  ))
};