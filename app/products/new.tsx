"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useData } from "@/app/context/AppContext";

import ProductFeaturesComponent from "@/app/components/ProductFeaturesComponent/new";
import ProductReviews from "@/app/components/ProductReviews";
import RelatedProducts from "@/app/components/RelatedProducts";

import Arrow from "@/public/assets/icons/arrow-to-right.svg";
import Stars from "@/public/assets/img/product-single/stars.png";
import Facebook from "@/public/assets/icons/social-media/facebook.svg";
import Linkedin from "@/public/assets/icons/social-media/linkedin.svg";
import Twitter from "@/public/assets/icons/social-media/twitter.svg";

const ProductPage: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<number>(1);

    const { setProductForModal } = useData();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError("Failed to fetch the product. Please try again.");
                console.error(error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        if (product)
            setProductForModal(product)
    }, [product, setProductForModal])

    if (error) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">Error</h1>
                <p className="mt-4">{error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="bg-[#F9F1E7] text-[#9F9F9F] w-full p-8 lg:py-10 lg:px-20 flex gap-2 lg:gap-6">
                <Link className="flex items-center" href="/">
                    Home
                </Link>
                <Image loading="lazy" src={Arrow} alt="arrow" />
                <Link className="flex items-center" href="/shop">
                    Shop
                </Link>
                <Image loading="lazy" src={Arrow} alt="arrow" />
                <span className="w-[2px] bg-[#9F9F9F]"></span>
                <span className="text-black">{product.name}</span>
            </div>
            <div className="p-8 lg:px-20 lg:py-10 flex flex-col lg:flex-row gap-10 sm:gap-20">
                <div className="flex flex-col sm:flex-row w-full lg:w-1/2 gap-4 sm:gap-10">
                    <div className="grid grid-cols-4 sm:flex sm:flex-col gap-2 sm:gap-6 w-full sm:w-2/12">
                        {product.images?.map((image: string, index: number) => (
                            <Image
                                key={index}
                                className="bg-[#F9F1E7] object-cover h-16 sm:h-24 w-full sm:w-24 rounded-lg sm:rounded-xl"
                                src={image || "/assets/img/placeholder.svg"}
                                alt={product.name + "image"}
                                width={300}
                                height={300}
                                loading="lazy"
                            />
                        ))}
                    </div>
                    <Image
                        className="bg-[#F9F1E7] order-first sm:order-last w-full sm:w-9/12 object-cover rounded-lg sm:rounded-xl h-[50vh] sm:h-[70vh]"
                        src={product.image[0] || "/assets/img/placeholder.svg"}
                        alt={product.name + "image"}
                        width={300}
                        height={300}
                        loading="lazy"
                    />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <h3 className="text-[42px]">{product.name}</h3>
                    <p className="text-[#9F9F9F] text-2xl">Rp {product.priceInCents}</p>
                    <div className="flex gap-3">
                        <Image loading="lazy" src={Stars} alt="stars" />
                        <span className="w-[1px] bg-[#9F9F9F]"></span>
                        <span className="text-sm text-[#9F9F9F]">5 Customer Review</span>
                    </div>
                    <p className="w-10/12">{product.description}</p>
                    {/* <ProductFeaturesComponent product={product} isPage={true} /> */}
                    <span className="h-[1px] bg-[#D9D9D9] my-8"></span>
                    <div className="text-[#9F9F9F] flex flex-col gap-4">
                        <div className="flex gap-3">
                            <span className="w-20">SKU</span>
                            <span>:</span>
                            <span>{product.sku}</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Category</span>
                            <span>:</span>
                            <span>{product.category}</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Tags</span>
                            <span>:</span>
                            <ul className="flex gap-2">
                            {product.tags.map((tag: string, index: number) => {
                                <li key={index}>{tag}</li>
                            })}
                            </ul>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Share</span>
                            <span>:</span>
                            <div className="text-black flex gap-4 text-2xl">
                                <Link href="#">
                                    <Image src={Facebook} alt="facebook" />
                                </Link>
                                <Link href="#">
                                    <Image src={Linkedin} alt="linkedin" />
                                </Link>
                                <Link href="#">
                                    <Image src={Twitter} alt="twitter" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="border-y flex flex-col gap-12 border-y-[#D9D9D9] text-[#9F9F9F] p-8 lg:py-14 lg:px-20">
                <div className="text-xl md:text-2xl flex-wrap flex w-full gap-4 justify-center md:gap-10">
                    <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'text-black font-medium' : ''} duration-300`}>Description</button>
                    <button onClick={() => setActiveTab(2)} className={`${activeTab === 2 ? 'text-black font-medium' : ''} duration-300`}>Additional Information</button>
                    <button onClick={() => setActiveTab(3)} className={`${activeTab === 3 ? 'text-black font-medium' : ''} duration-300`}>Reviews [5]</button>
                </div>
                <div className="md:px-10">
                    {activeTab === 1 && <div className="flex flex-col gap-6">
                        <p>{product.description}</p>
                    </div>}
                    {activeTab === 2 && <div className="flex flex-col gap-6">
                        <p>{product.additionalInfo}</p>
                    </div>}
                    {activeTab === 3 && <div className="flex flex-col gap-6">
                        <ProductReviews />
                    </div>}
                </div>
            </div> */}
            {/* <div className="p-8 lg:px-20 lg:py-10">
                <h4 className="text-4xl font-medium text-center">Related Products</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                    <RelatedProducts />
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-ochre border-2 border-ochre hover:bg-ochre hover:text-white duration-300 py-3 px-20 font-semibold'>Show More</button>
                </div>
            </div> */}
        </>
    );
};

export default ProductPage;