"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Icon from "@/public/assets/website-icon/icon.svg";
import User from "@/public/assets/icons/user.svg";
import Cart from "@/public/assets/icons/cart.svg";
import Fav from "@/public/assets/icons/fav.svg";
import Search from "@/public/assets/icons/search.svg";
import Menu from "@/public/assets/icons/burger-menu.svg";
import { useData } from "@/app/context/AppContext";
import { NavMenuItemType } from "@/app/interfaces";

const Navbar: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { setIsCartOpen, wishlist, cartItems } = useData();


    const navMenu: NavMenuItemType[] = [
        {
            item: "Home",
            path: "/"
        },
        {
            item: "Shop",
            path: "/shop",
        },
        {
            item: "Blog",
            path: "/blog"
        },
        {
            item: "Contact",
            path: "/contact"
        },
    ]

    useEffect(() => {
        const handleResize = () => {
            const isLargeScreen = window.innerWidth > 1024;
            // Only update state if necessary to prevent infinite loops
            if (isLargeScreen && isNavOpen) {
                setIsNavOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isNavOpen]); // Add `isNavOpen` as a dependency

    useEffect(() => {
        if (isNavOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isNavOpen])

    return (
        <nav className="bg-white overflow-hidden py-6 font-medium px-8 lg:px-20 w-full">
            <div className="flex w-full justify-between items-center">
                <div className="">
                    <Link href="/">
                        <Image loading="lazy" src={Icon} alt="icon" />
                    </Link>
                </div>
                <div className="hidden lg:flex gap-10 xl:gap-20">
                    {navMenu.map((link, index) => (
                        <Link className="relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" key={index} href={link.path}>{link.item}</Link>
                    ))}
                </div>
                <div className="hidden lg:flex gap-10">
                    {/* <Link href="/auth">
                        <Image loading="lazy" src={User} alt="user" />
                    </Link> */}
                    <SignedIn>
                        {/* Mount the UserButton component */}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        {/* Signed out users get sign in button */}
                        <SignInButton>
                            <Image loading="lazy" src={User} alt="user" />
                        </SignInButton>
                    </SignedOut>
                    <Link href="/search">
                        <Image loading="lazy" src={Search} alt="search" />
                    </Link>
                    <Link className="relative" href="/wishlist">
                        <Image loading="lazy" src={Fav} alt="fav" />
                        {wishlist.length > 0 && <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                            {wishlist.length < 10 ? wishlist.length : "9+"}
                        </span>}
                    </Link>
                    <button className="focus:outline-none relative" onClick={() => setIsCartOpen((prev: boolean) => !prev)}>
                        <Image loading="lazy" src={Cart} alt="cart" />
                        {
                            cartItems.length > 0 &&
                            <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                                {cartItems.length < 10 ? cartItems.length : "9+"}
                            </span>
                        }
                    </button>
                </div>
                <button className="lg:hidden text-3xl" onClick={() => setIsNavOpen(prev => !prev)}>
                    {
                        isNavOpen ? "✖" :
                            <Image className="w-9" src={Menu} alt="menu" />
                    }
                </button>
            </div>
            <div className={`${isNavOpen ? "translate-x-0 w-full" : "translate-x-[-100%] w-0"} overflow-hidden fixed flex flex-col left-0 justify-center items-center text-2xl gap-10 z-30 top-20 border-t border-t-[#D9D9D9] h-screen duration-500 bg-white px-8`}>
                {navMenu.map((link, index) => (
                    <Link onClick={() => setIsNavOpen(false)} className="border-b border-b-black pb-3 w-10/12 text-center border-opacity-20" key={index} href={link.path}>{link.item}</Link>
                ))}
                <div className="flex mt-10 gap-10 bg-[#F9F1E7] py-4 w-full justify-center rounded-full">
                    {/* <Link onClick={() => setIsNavOpen(false)} href="/auth">
                        <Image loading="lazy" src={User} alt="user" />
                    </Link> */}
                    <SignedIn>
                        {/* Mount the UserButton component */}
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        {/* Signed out users get sign in button */}
                        <SignInButton>
                            <Image loading="lazy" src={User} alt="user" />
                        </SignInButton>
                    </SignedOut>
                    <Link href="/search">
                        <Image loading="lazy" src={Search} alt="search" />
                    </Link>
                    <Link className="relative" onClick={() => setIsNavOpen(false)} href="/wishlist">
                        <Image loading="lazy" src={Fav} alt="fav" />
                        {
                            wishlist.length > 0 &&
                            <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                                {wishlist.length < 10 ? wishlist.length : "9+"}
                            </span>
                        }
                    </Link>
                    <button className="focus:outline-none relative" onClick={() => setIsCartOpen((prev: boolean) => !prev)}>
                        <Image loading="lazy" src={Cart} alt="cart" />
                        {
                            cartItems.length > 0 &&
                            <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                                {cartItems.length < 10 ? cartItems.length : "9+"}
                            </span>
                        }
                    </button>
                </div>
            </div>
        </nav >
    )
};

export default Navbar;