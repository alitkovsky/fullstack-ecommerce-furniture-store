import Trash from "@/public/assets/icons/trash.svg";
import { CartPageItemProps } from "@/app/interfaces";
import { useData } from "@/app/context/AppContext";

import Link from "next/link";
import Image from "next/image";

const CartPageItem: React.FC<CartPageItemProps> = ({ cartItem }) => {

    const { removeFromCart } = useData()
    const imageSrc = cartItem?.product?.image || "/assets/img/placeholder.svg";

    return (
        <div className="grid min-w-[750px] w-full grid-cols-8">
            <div className="">
                <div className="bg-[#F9F1E7] overflow-hidden max-w-32 h-32 flex items-center rounded-xl">
                    <Image
                        loading="lazy"
                        className="w-full h-full object-cover"
                        src={imageSrc}
                        alt={cartItem?.product?.title + "_img"}
                        width={128}
                        height={128}
                    />
                </div>
            </div>
            <div className="text-[#9F9F9F] flex items-center justify-center">
                <Link href={`/products/${cartItem.product.id}`}>{cartItem?.product?.title}</Link>
            </div>
            <div className="text-[#9F9F9F] flex items-center justify-center">
                <p>{cartItem?.features?.size}</p>
            </div>
            <div className="text-[#9F9F9F] gap-1 flex items-center justify-center">
                <span className={`${cartItem?.features?.color === "ochre" ? "bg-ochre" : cartItem?.features?.color === "black" ? "bg-black" : "bg-[#816DFA]"} w-6 h-6 rounded-full`}></span>
                <p>{cartItem?.features?.color}</p>
            </div>
            <div className="text-[#9F9F9F] flex items-center justify-center">
                <p>Rs. {cartItem?.product?.price}</p>
            </div>
            <div className="flex items-center justify-center">
                <span className="border border-[#9F9F9F] flex items-center justify-center rounded w-10 h-10 p-4">{cartItem.features.quantity}</span>
            </div>
            <div className="flex items-center justify-center">
                <p>Rs. {cartItem?.product?.price * cartItem?.features?.quantity}</p>
            </div>
            <div className="text-ochre text-2xl flex items-center justify-center">
                <button onClick={() => removeFromCart(cartItem.id)} aria-label="Remove from cart">
                    <Image src={Trash} alt="trash" />
                </button>
            </div>
        </div>
    )
};

export default CartPageItem;
