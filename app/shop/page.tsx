"use client";

import { useEffect, useState } from "react";

import FilterBar from "@/app/components/shop/FilterBar"
import Pagination from "@/app/components/Pagination";
import ProductCard from "@/app/components/ProductCard/new";
import PageHeading from "@/app/components/PageHeading";
import UpperFooter from "@/app/components/upperfooter";
import { DatabaseProduct } from "@/app/interfaces";

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<DatabaseProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <PageHeading mainhead="Shop" />
            <FilterBar />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-8 lg:p-20">
                {products.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
            <Pagination />
            <div className="mb-20"></div>
            <UpperFooter />
        </>
    );
};

export default ShopPage;