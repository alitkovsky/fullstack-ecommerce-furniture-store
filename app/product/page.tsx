"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Arrow from '@/public/assets/icons/arrow-to-right.svg'
import Sofa from '@/public/assets/img/product-single/sofa.png'
import Stars from '@/public/assets/img/product-single/stars.png'
import Facebook from '@/public/assets/icons/social-media/facebook.svg'
import Linkedin from '@/public/assets/icons/social-media/linkedin.svg'
import Twitter from '@/public/assets/icons/social-media/twitter.svg'
import { useEffect, useState } from "react";
import Product1 from '@/public/assets/img/products/product1.png'
import Product2 from '@/public/assets/img/products/product2.png'
import Product3 from '@/public/assets/img/products/product3.png'
import { ProductType } from "@/app/interfaces";
import products from "@/app/data/products";
import { useData } from "@/app/context/AppContext";
import { ProductCard, ProductFeaturesComponent } from "@/app/components";

const ProductPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(1)

    const relatedProducts: ProductType[] = [
        {
            id: 1,
            title: 'Syltherine',
            about: 'Stylish cafe chair',
            oldprice: 3500,
            price: 2500,
            discount: 30,
            image: Product1,
            isnew: false
        },
        {
            id: 2,
            title: 'Grifo',
            about: 'Night lamp',
            price: 1500,
            image: Product2,
            isnew: false
        },
        {
            id: 3,
            title: 'Muggo',
            about: 'Small mug',
            price: 1500,
            image: Product3,
            isnew: true
        },
        {
            id: 4,
            title: 'Grifo',
            about: 'Night lamp',
            price: 1500,
            image: Product2,
            isnew: false
        },
    ]

    const router = useRouter();
    const { productId } = router.query; // Use router.query to get dynamic params

    const thisProduct = products.find((prod) => prod.id === Number(productId));

    const { setProductForModal } = useData();

    useEffect(() => {
        if (thisProduct) setProductForModal(thisProduct);
    }, [thisProduct, setProductForModal]);

    return (
        <>
            <div className="bg-[#F9F1E7] text-[#9F9F9F] w-full p-8 lg:py-10 lg:px-20 flex gap-2 lg:gap-6">
                <Link className="flex items-center" href='/'>Home</Link>
                <Image loading="lazy" src={Arrow} alt="arrow" />
                <Link className="flex items-center" href='/shop'>Shop</Link>
                <Image loading="lazy" src={Arrow} alt="arrow" />
                <span className="w-[2px] bg-[#9F9F9F]"></span>
                <span className="text-black">Asgaard sofa</span>
            </div>
            <div className="p-8 lg:px-20 lg:py-10 flex flex-col lg:flex-row gap-10 sm:gap-20">
                <div className="flex flex-col sm:flex-row w-full lg:w-1/2 gap-4 sm:gap-10">
                    <div className="grid grid-cols-4 sm:flex sm:flex-col gap-2 sm:gap-6 w-full sm:w-2/12">
                        <Image loading="lazy" className="bg-[#F9F1E7] object-cover h-16 sm:h-24 w-full sm:w-24 rounded-lg sm:rounded-xl" src={Sofa} alt="sofa" />
                        <Image loading="lazy" className="bg-[#F9F1E7] object-cover h-16 sm:h-24 w-full sm:w-24 rounded-lg sm:rounded-xl" src={Sofa} alt="sofa" />
                        <Image loading="lazy" className="bg-[#F9F1E7] object-cover h-16 sm:h-24 w-full sm:w-24 rounded-lg sm:rounded-xl" src={Sofa} alt="sofa" />
                        <Image loading="lazy" className="bg-[#F9F1E7] object-cover h-16 sm:h-24 w-full sm:w-24 rounded-lg sm:rounded-xl" src={Sofa} alt="sofa" />
                    </div>
                    <Image loading="lazy" className="bg-[#F9F1E7] order-first sm:order-last w-full sm:w-9/12 object-cover rounded-lg sm:rounded-xl h-[50vh] sm:h-[70vh]" src={thisProduct?.image || Sofa} alt={thisProduct?.title + "_image"} />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <h3 className="text-[42px]">{thisProduct?.title}</h3>
                    <p className="text-[#9F9F9F] text-2xl">{thisProduct?.price}</p>
                    <div className="flex gap-3">
                        <Image loading="lazy" src={Stars} alt="stars" />
                        <span className="w-[1px] bg-[#9F9F9F]"></span>
                        <span className="text-sm text-[#9F9F9F]">5 Customer Review</span>
                    </div>
                    <p className="w-10/12">Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.</p>
                    <ProductFeaturesComponent isPage={true} />
                    <span className="h-[1px] bg-[#D9D9D9] my-8"></span>
                    <div className="text-[#9F9F9F] flex flex-col gap-4">
                        <div className="flex gap-3">
                            <span className="w-20">SKU</span>
                            <span>:</span>
                            <span>SS001</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Category</span>
                            <span>:</span>
                            <span>Sofas</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Tags</span>
                            <span>:</span>
                            <span>Sofa, Chair, Home, Shop</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="w-20">Share</span>
                            <span>:</span>
                            <div className="text-black flex gap-4 text-2xl">
                                <a href="#">
                                    <Image src={Facebook} alt="facebook" />
                                </a>
                                <a href="#">
                                    <Image src={Linkedin} alt="linkedin" />
                                </a>
                                <a href="#">
                                    <Image src={Twitter} alt="twitter" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-y flex flex-col gap-12 border-y-[#D9D9D9] text-[#9F9F9F] p-8 lg:py-14 lg:px-20">
                <div className="text-xl md:text-2xl flex-wrap flex w-full gap-4 justify-center md:gap-10">
                    <button onClick={() => setActiveTab(1)} className={`${activeTab === 1 ? 'text-black font-medium' : ''} duration-300`}>Description</button>
                    <button onClick={() => setActiveTab(2)} className={`${activeTab === 2 ? 'text-black font-medium' : ''} duration-300`}>Additional Information</button>
                    <button onClick={() => setActiveTab(3)} className={`${activeTab === 3 ? 'text-black font-medium' : ''} duration-300`}>Reviews [5]</button>
                </div>
                <div className="md:px-10">
                    {activeTab === 1 && <div className="flex flex-col gap-6">
                        <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                        <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
                    </div>}
                    {activeTab === 2 && <div className="flex flex-col gap-6">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, unde.</p>
                        <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                        <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
                    </div>}
                    {activeTab === 3 && <div className="flex flex-col gap-6">
                        <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                        <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, ad odio dolor quos eius quasi consequuntur repellendus. Porro, accusantium, magnam totam, aut accusamus voluptas ipsam saepe libero eligendi numquam nisi.</p>
                    </div>}
                </div>
            </div>
            <div className="p-8 lg:px-20 lg:py-10">
                <h4 className="text-4xl font-medium text-center">Related Products</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-10">
                    {relatedProducts.map((product, index) => (<ProductCard key={index} product={product} />))}
                </div>
                <div className="w-full flex justify-center">
                    <button className='text-ochre border-2 border-ochre hover:bg-ochre hover:text-white duration-300 py-3 px-20 font-semibold'>Show More</button>
                </div>
            </div>
        </>
    )
}

export default ProductPage;