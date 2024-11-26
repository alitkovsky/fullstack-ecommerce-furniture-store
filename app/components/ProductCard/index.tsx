"use client";

import Heart from '@/public/assets/icons/producthover/heart.svg';
import Share from '@/public/assets/icons/producthover/share.svg';
import { ProductCardProps } from '@/app/interfaces';
import { useData } from '@/app/context/AppContext';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const {
        addToWishlist,
        isInWishlist,
        removeFromWishlist,
        setToggleCartModal,
        setProductForModal
    } = useData();

    const [isOverlayShown, setIsOverlayShown] = useState<boolean>(false);
    const router = useRouter();
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
        if (isInWishlist({ product })) {
            removeFromWishlist({ product });
        } else {
            addToWishlist({ product });
        }
    };

    const handleShare = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (typeof window !== 'undefined') {
            const shareLink = `${window.location.origin}/products/${product.id}`;
            window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
                'facebook-share-dialog',
                'width=626,height=436'
            );
        }
    };

    const overlayToggle = () => {
        setIsOverlayShown((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsOverlayShown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth > 1024;
            if (isLargeScreen) {
                setIsOverlayShown(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={divRef} onClick={overlayToggle} className="bg-[#F4F5F7] cursor-pointer relative group overflow-hidden">
            <Image
                loading="lazy"
                className="h-80 w-full object-cover object-center"
                src={product.image}
                alt={`${product.title}_image`}
            />
            <div className="p-4">
                <h5 className="text-[#3A3A3A] text-xl lg:text-2xl font-semibold">{product.title}</h5>
                <p className="text-[#898989] font-medium my-1">{product.about}</p>
                <div className="flex gap-4 items-center">
                    <span className="font-semibold text-[#3A3A3A] lg:text-xl">Rp {product.price}</span>
                    {product.oldprice && <span className="text-[#B0B0B0] line-through">Rp {product.oldprice}</span>}
                </div>
            </div>
            {(product.discount || product.isnew) && (
                <span
                    className={`absolute top-5 right-5 w-14 h-14 flex items-center justify-center rounded-full ${
                        product.isnew ? 'bg-emerald-400' : 'bg-red-400'
                    } text-white`}
                >
                    {product.isnew ? 'New' : `-${product.discount}%`}
                </span>
            )}
            <div
                onClick={() => router.push(`/products/${product.id}`)}
                className={`${
                    isOverlayShown ? 'inset-0 bg-opacity-60' : '-left-[300px] bg-opacity-0'
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
                        <button onClick={(event) => handleAddToWishlist(event)} className="flex items-center gap-1">
                            {isInWishlist({ product }) ? <Image loading="lazy" src={Heart} alt="share" /> : '❤'}
                            <span>{isInWishlist({ product }) ? 'Unlike' : 'Like'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;