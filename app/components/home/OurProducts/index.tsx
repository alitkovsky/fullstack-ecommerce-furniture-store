"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ProductCard from "@/app/components/ProductCard/new";
import { DatabaseProduct } from "@/app/interfaces";

const OurProducts: React.FC = () => {
    const [products, setProducts] = useState<DatabaseProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('OurProducts: Fetching products...');
                setLoading(true);
                const response = await fetch("/api/products");
                console.log('OurProducts: Response status:', response.status);

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                console.log('OurProducts: Products received:', data);
                setProducts(data);
            } catch (error) {
                console.error("OurProducts: Error fetching products:", error);
                setError(error instanceof Error ? error.message : 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const navigateToShop = () => {
        router.push(`/shop`);
    };

    console.log('OurProducts: Render - loading:', loading, 'products:', products.length, 'error:', error);

    if (loading) {
        return (
            <div className="p-8 lg:p-20">
                <h2 className="font-bold text-[#3A3A3A] text-3xl lg:text-4xl text-center">Our Products</h2>
                <div className="text-center py-8">
                    <p>Loading products...</p>
                    <p className="text-sm text-gray-500">Check browser console for debug info</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 lg:p-20">
                <h2 className="font-bold text-[#3A3A3A] text-3xl lg:text-4xl text-center">Our Products</h2>
                <div className="text-center py-8 text-red-600">
                    <p>Error: {error}</p>
                    <p className="text-sm text-gray-500">Check browser console for debug info</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 lg:p-20">
            <h2 className="font-bold text-[#3A3A3A] text-3xl lg:text-4xl text-center">Our Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="w-full flex justify-center">
                <button
                    onClick={navigateToShop}
                    className="text-ochre border-2 border-ochre hover:bg-ochre hover:text-white duration-300 py-3 px-20 font-semibold"
                >
                    Show More
                </button>
            </div>
        </div>
    )
};

export default OurProducts;