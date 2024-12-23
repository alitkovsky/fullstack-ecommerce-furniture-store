"use client";

import {
    PageHeading,
    WishlistItemCard
} from "@/app/components";
import { useData } from "@/app/context/AppContext";

const WishlistPage: React.FC = () => {
    const { wishlist } = useData()
    return (
        <>
            <PageHeading mainhead='Wishlist' />
            <div className="p-8 lg:p-20 flex flex-col gap-6 min-h-[40vh]">
                {
                    wishlist.length > 0 ?
                        wishlist.map(i => <WishlistItemCard key={i.product.id} product={i.product} />) :
                        <p className="text-center text-2xl font-medium opacity-70">There is no products in your Wishlist</p>
                }

            </div>
        </>
    )
}

export default WishlistPage
