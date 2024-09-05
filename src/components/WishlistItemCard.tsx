import { WishlistItemCardProps } from '@/interfaces'
import { useData } from '@/context/AppContext'
import { Link } from 'react-router-dom'
import Image from "next/image"

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({ product }) => {
    console.log(product)

    const { removeFromWishlist } = useData()
    return (
        <div className="bg-[#F9F1E7] px-10 py-4 shadow-md rounded flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Image loading="lazy" className="w-20 h-20 rounded object-cover" src={product.image} alt={product.title + "_image"} />
                <Link to={`/products/${product.id}`} className="font-semibold">{product.title}</Link>
                <p>{product.price} Rp</p>
            </div>
            <button onClick={() => removeFromWishlist({ product })}>
                <span className='text-2xl text-neutral-500'>✖</span>
            </button>
        </div>
    )
}

export default WishlistItemCard;
