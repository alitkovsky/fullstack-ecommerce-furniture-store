import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { Collection } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";

import { CollectionCard, CollectionCardSkeleton } from "@/components/CollectionCard";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import Hero from "@/components/Hero";
import Inspiration from "@/components/Inspiration";
import HomeGrid from "@/components/HomeGrid";

const getMostPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 8,
    })
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  })
}, ["/", "getNewestProducts"]);

const getCollections = cache(() => {
  return db.collection.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  })
}, ["/", "getCollections"]);

export default function HomePage() {

  return (
    <>
      <Hero />
      <CollectionGridSection
        title="Browse The Range"
        collectionsFetcher={getCollections}
      />
      <ProductGridSection
        title="Our products"
        productsFetcher={getMostPopularProducts}
      />
      <Inspiration />
      <HomeGrid />
    </>
  )
};

type CollectionGridSectionProps = {
  title: string
  collectionsFetcher: () => Promise<Collection[]>
};

function CollectionGridSection({
  collectionsFetcher,
  title,
}: CollectionGridSectionProps) {
  return (
    <section className="mt-[60px] w-full xl:mt-[60px] relative">
      <div className="container mx-auto w-full space-y-4">
        <div className="flex flex-col justify-center items-center mb-[60px]">
          <h2 className="text-3xl font-bold capitalize">{title}</h2>
          <h3 className="font-normal text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 justify-center">
          <Suspense
            fallback={
              <>
                <CollectionCardSkeleton />
                <CollectionCardSkeleton />
                <CollectionCardSkeleton />
              </>
            }
          >
            <CollectionSuspense collectionsFetcher={collectionsFetcher} />
          </Suspense>
        </div>
      </div>
    </section>
  )
};

async function CollectionSuspense({
  collectionsFetcher,
}: {
  collectionsFetcher: () => Promise<Collection[]>
}) {
  return (await collectionsFetcher()).map(collection => (
    <CollectionCard key={collection.id} {...collection} />
  ))
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
    <section className="mt-[60px] w-full xl:mt-[60px] relative z-20">
      <div className="container mx-auto w-full space-y-4">
        <div className="flex justify-center mb-[30px]">
          <h2 className="text-3xl font-bold capitalize">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductSuspense productsFetcher={productsFetcher} />
          </Suspense>
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="outline" asChild>
            <Link href="/products" className="space-x-2">
              <span>View All</span>
            </Link>
          </Button>
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