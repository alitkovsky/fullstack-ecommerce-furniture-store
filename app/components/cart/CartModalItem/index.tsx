import { useData } from "@/app/context/AppContext";
import { CartModalItemProps } from "@/app/interfaces";

import Link from "next/link";
import Image from "next/image";

const CartModalItem: React.FC<CartModalItemProps> = ({ p }) => {
    const { removeFromCart, setIsCartOpen } = useData()

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Image loading="lazy" className='bg-[#B88E2F38] rounded-lg w-24 h-24 object-cover' src={p?.product?.image} alt={p?.product?.title + "_img"} />
                <div className="flex flex-col gap-2">
                    <Link onClick={() => setIsCartOpen(false)} href={`/products/${p?.product?.id}`}>{p?.product?.title} <span className="text-gray-400">({p.features.color}/{p.features.size})</span></Link>
                    <div className="text-xs flex items-center gap-3">
                        <span className='text-[16px]'>{p.features.quantity}</span>
                        <span>X</span>
                        <span className='text-ochre'>Rs. {p?.product?.price}</span>
                    </div>
                </div>
            </div>
            <button onClick={() => removeFromCart(p.id)} className='text-[#9F9F9F] text-2xl'>
                ✖
            </button>
        </div>
    )
};

export default CartModalItem;
