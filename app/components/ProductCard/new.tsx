"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/app/context/AppContext";

import Heart from "@/public/assets/icons/producthover/heart.svg";
import Share from "@/public/assets/icons/producthover/share.svg";
import { ProductCardProps } from "@/app/interfaces";
import { formatCurrency } from "@/lib/formatters";

// Enhanced ProductCard for database-driven products with proper price formatting

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
    const {
        addToWishlist,
        isInWishlist,
        removeFromWishlist,
        setToggleCartModal,
        setProductForModal
    } = useData();

    const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setToggleCartModal(true);
        setProductForModal(product);
    };

    const handleAddToWishlist = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!isInWishlist({ product })) {
            addToWishlist({ product });
        } else {
            removeFromWishlist({ product });
        }
    };

    const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (typeof window !== "undefined") {
            const shareLink = `${window.location.origin}/products/${product.id}`;
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
                "facebook-share-dialog",
                "width=626,height=436"
            );
        }
    };

    const overlayToggle = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsOverlayShown((prev) => !prev);
    };

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (divRef.current && !divRef.current.contains(event.target as Node)) {
    //             setIsOverlayShown(false);
    //         }
    //     };
    //     document.addEventListener("click", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    // useEffect(() => {
    //     const handleResize = () => {
    //         const isLargeScreen = window.innerWidth > 1024;
    //         if (isLargeScreen) {
    //             setIsOverlayShown(false); // Ensure overlay closes on large screens
    //         }
    //     };
    //     window.addEventListener("resize", handleResize);
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    return (
            <Link href={`/products/${product.id}`}>
                <div
                    ref={divRef}
                    onClick={overlayToggle}
                    className="bg-[#F4F5F7] cursor-pointer relative group overflow-hidden">
                    <Image
                        loading="lazy"
                        className="h-80 w-full object-cover object-center"
                        src={product.images[0] || "/assets/img/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                    />
                    <div className="p-4">
                        <h5 className="text-[#3A3A3A] text-xl lg:text-2xl font-semibold">{product.name}</h5>
                        <p className="text-[#898989] font-medium my-1">{product.description}</p>
                        <div className="flex gap-4 items-center">
                            <span className="font-semibold text-[#3A3A3A] lg:text-xl">{formatCurrency(product.priceInCents / 100)}</span>
                            {product.oldPriceInCents && product.oldPriceInCents > 0 && (
                                <span className="text-[#B0B0B0] line-through">
                                    {formatCurrency(product.oldPriceInCents / 100)}
                                </span>
                            )}
                        </div>
                    </div>
                    {(product.discountPercentage || product.isNew) && (
                        <span
                            className={`absolute top-5 right-5 w-14 h-14 flex items-center justify-center rounded-full ${
                                product.isNew ? "bg-emerald-400" : "bg-red-400"
                            } text-white`}
                        >
                            {product.isNew ? "New" : `-${product.discountPercentage}%`}
                        </span>
                    )}
                    <div
                        className={`${
                            isOverlayShown ? "inset-0 bg-opacity-60" : "-left-[300px] bg-opacity-0"
                        } absolute flex justify-center items-center lg:group-hover:inset-0 bg-black lg:group-hover:bg-opacity-60 duration-300 p-6`}
                    >
                        <div className="flex items-center duration-300 gap-6 flex-col w-full font-semibold">
                            <button
                                onClick={(event) => handleAddToCart(event)}
                                className="text-ochre text-center w-2/3 bg-white py-3 hover:text-white hover:bg-ochre duration-300"
                            >
                                Add to cart
                            </button>
                            <div className="flex justify-center gap-10 text-white w-full">
                                <button onClick={(event) => handleShare(event)} className="flex items-center gap-1">
                                    <Image loading="lazy" src={Share} alt="share" />
                                    <span>Share</span>
                                </button>
                                <button
                                onClick={(event) => handleAddToWishlist(event)}
                                className="flex items-center gap-1"
                            >
                                {isInWishlist({ product }) ? (
                                    <Image loading="lazy" src={Heart} alt="share" />
                                ) : (
                                    "❤"
                                )}
                                <span>
                                    {isInWishlist({ product }) ? "Unlike" : "Like"}
                                </span>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
    );
};

export default ProductCard;