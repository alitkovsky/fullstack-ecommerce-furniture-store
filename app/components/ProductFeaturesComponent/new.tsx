'use client';

import { useEffect, useState } from "react";
import { useData } from "@/app/context/AppContext";
import { ProductFeaturesComponentProps } from "@/app/interfaces";


const ProductFeaturesComponent: React.FC<ProductFeaturesComponentProps> = ({ isPage }) => {
    const {
        toggleCartModal,
        setToggleCartModal,
        productForModal,
        addToCart,
        cartItems,
        setProductFeatures,
        productFeatures,
        initialFeatures
    } = useData();

    const [quantity, setQuantity] = useState<number>(1);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const handleFeatures = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget
        setProductFeatures((prevFeatures) => ({
            ...prevFeatures,
            [isPage ? name.replace("_page", "") : name]: value,
        }));
    }

    useEffect(() => {
        setProductFeatures((prevFeatures) => ({
            ...prevFeatures,
            quantity,
        }));
    }, [quantity, setProductFeatures]);

    useEffect(() => {
        setProductFeatures(initialFeatures);
        setQuantity(1);
    }, [initialFeatures, setProductFeatures, toggleCartModal]);

    const plusCount = () => setQuantity((prev) => prev + 1);
    const minusCount = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {

        if (productForModal && productFeatures) {
            addToCart({ cartProduct: {
                id: cartItems.length,
                product: productForModal,
                features: productFeatures
            } })
        }
        setProductFeatures(initialFeatures)
        setQuantity(1)
        setToggleCartModal(false)
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <span className="text-black text-sm">Size</span>
                <div className="flex gap-4 text-xs">
                    <div className="">
                        <input
                            onChange={handleFeatures}
                            className="peer sr-only"
                            checked={productFeatures?.size === 'S'}
                            type="radio"
                            value='S'
                            name={isPage ? "size_page" : "size"}
                            id="S"
                        />
                        <label className="bg-[#F9F1E7] cursor-pointer h-8 w-8 flex items-center justify-center rounded peer-checked:bg-ochre peer-checked:text-white duration-300" htmlFor="S">S</label>
                    </div>
                    <div className="">
                        <input
                            onChange={handleFeatures}
                            className="peer sr-only"
                            checked={productFeatures?.size === 'M'}
                            type="radio"
                            value='M'
                            name={isPage ? "size_page" : "size"}
                            id="M"
                        />
                        <label className="bg-[#F9F1E7] cursor-pointer h-8 w-8 flex items-center justify-center rounded peer-checked:bg-ochre peer-checked:text-white duration-300" htmlFor="M">M</label>
                    </div>
                    <div className="">
                        <input
                            onChange={handleFeatures}
                            className="peer sr-only"
                            checked={productFeatures?.size === 'L'}
                            type="radio"
                            value='L'
                            name={isPage ? "size_page" : "size"}
                            id="L"
                        />
                        <label className="bg-[#F9F1E7] cursor-pointer h-8 w-8 flex items-center justify-center rounded peer-checked:bg-ochre peer-checked:text-white duration-300" htmlFor="L">L</label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-black text-sm">Color</span>
                <div className="flex gap-4 items-center">
                    <div className="">
                        <input
                            onChange={handleFeatures}
                            className="peer sr-only"
                            checked={productFeatures?.color === 'blue'}
                            value='blue'
                            type="radio"
                            name={isPage ? "color_page" : "color"}
                            id="blue"
                        />
                        <label className="bg-[#816DFA] cursor-pointer block h-8 w-8 rounded-full peer-checked:border-4 peer-checked:border-gray-400 peer-checked:shadow-md duration-300" htmlFor="blue"></label>
                    </div>
                    <div className="">
                        <input
                            onChange={handleFeatures}
                            className="peer sr-only"
                            checked={productFeatures?.color === 'black'}
                            value='black'
                            type="radio"
                            name={isPage ? "color_page" : "color"}
                            id="black"
                        />
                        <label className="bg-black cursor-pointer block h-8 w-8 rounded-full peer-checked:border-4 peer-checked:border-gray-400 peer-checked:shadow-md duration-300" htmlFor="black"></label>
                    </div>
                    <div className="">
                        <input
                            onChange={handleFeatures}
                            className="peer sr-only"
                            checked={productFeatures?.color === 'ochre'}
                            value='ochre'
                            type="radio"
                            name={isPage ? "color_page" : "color"}
                            id="ochre"
                        />
                        <label className="bg-ochre cursor-pointer block h-8 w-8 rounded-full peer-checked:border-4 peer-checked:border-gray-400 peer-checked:shadow-md duration-300" htmlFor="ochre"></label>
                    </div>
                </div>
            </div>
            <div className="flex flex-row w-full gap-4">
                <div className="rounded-lg flex justify-between items-center p-3 border border-[#9F9F9F]">
                    <button onClick={minusCount} className="hover:bg-gray-300 duration-300 rounded-full w-5 h-5 flex items-center justify-center">-</button>
                    <span onChange={handleFeatures}>{quantity}</span>
                    <button onClick={plusCount} className="hover:bg-gray-300 duration-300 rounded-full w-5 h-5 flex items-center justify-center">+</button>
                </div>
                <button disabled={isDisabled} onClick={handleAddToCart} className="rounded-lg disabled:opacity-50 disabled:bg-black disabled:text-white text-xl p-3 border border-black hover:bg-black hover:text-white duration-300">Add To Cart</button>
            </div>
        </div>
    )
};

export default ProductFeaturesComponent;
