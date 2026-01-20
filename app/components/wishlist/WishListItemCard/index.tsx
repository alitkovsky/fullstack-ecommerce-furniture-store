import { WishlistItemCardProps } from '@/app/interfaces'
import { useData } from '@/app/context/AppContext'

import Link from "next/link";
import Image from "next/image";


const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ product }) => {
    const { removeFromWishlist } = useData()
    return (
        <div className="bg-[#F9F1E7] px-10 py-4 shadow-md rounded flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Image
                    loading="lazy"
                    className="w-20 h-20 rounded object-cover"
                    src={product.image}
                    alt={product.title + "_image"}
                    width={80}
                    height={80}
                />
                <Link href={`/products/${product.id}`} className="font-semibold">{product.title}</Link>
                <p>{product.price} Rp</p>
            </div>
            <button onClick={() => removeFromWishlist({ product })} aria-label="Remove from wishlist">
                <span className='text-2xl text-neutral-500'>✖</span>
            </button>
        </div>
    )
}

export default WishlistItemCard
