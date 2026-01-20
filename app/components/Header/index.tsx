"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useData } from "@/app/context/AppContext";
import Link from "next/link";
import Image from "next/image";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { 
  mainNavMenu, 
  adminNavMenu, 
  isAdminRoute
} from "@/app/config/navigation";

import Icon from "@/public/assets/website-icon/icon.svg";
import User from "@/public/assets/icons/user.svg";
import Cart from "@/public/assets/icons/cart.svg";
import Fav from "@/public/assets/icons/fav.svg";
import Search from "@/public/assets/icons/search.svg";
import Menu from "@/public/assets/icons/burger-menu.svg";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();
  const { setIsCartOpen, wishlist, cartItems } = useData();
  
  const isAdmin = isAdminRoute(pathname);

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
  }, [isNavOpen]);

  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isNavOpen]);

  // Admin Navigation Component
  const AdminNavigation = () => (
    <nav className="bg-white overflow-hidden py-6 font-medium px-8 lg:px-20 w-full">
      <div className="flex w-full justify-between items-center">
        <div className="">
          <Link href="/">
            <Image loading="lazy" src={Icon} alt="icon" />
          </Link>
        </div>
        <div className="hidden lg:flex gap-10 xl:gap-20">
          {adminNavMenu.map((link, index) => (
            <Link
              className="relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"
              key={index}
              href={link.path}
            >
              {link.item}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex gap-10">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <span aria-label="Sign in">
                <Image loading="lazy" src={User} alt="Login" />
              </span>
            </SignInButton>
          </SignedOut>
          <Link href="/" className="text-sm bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200">
            View Site
          </Link>
        </div>
        <button
          className="lg:hidden text-3xl"
          onClick={() => setIsNavOpen(prev => !prev)}
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
        >
          {isNavOpen ? "✖" : <Image className="w-9" src={Menu} alt="menu" />}
        </button>
      </div>
      <div className={`${isNavOpen ? "translate-x-0 w-full" : "translate-x-[-100%] w-0"} overflow-hidden fixed flex flex-col left-0 justify-center items-center text-2xl gap-10 z-30 top-20 border-t border-t-[#D9D9D9] h-screen duration-500 bg-white px-8`}>
        {adminNavMenu.map((link, index) => (
          <Link 
            onClick={() => setIsNavOpen(false)} 
            className="border-b border-b-black pb-3 w-10/12 text-center border-opacity-20" 
            key={index} 
            href={link.path}
          >
            {link.item}
          </Link>
        ))}
        <div className="flex mt-10 gap-10 bg-[#F9F1E7] py-4 w-full justify-center rounded-full">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <span aria-label="Sign in">
                <Image loading="lazy" src={User} alt="user" />
              </span>
            </SignInButton>
          </SignedOut>
          <Link href="/" className="text-sm">
            View Site
          </Link>
        </div>
      </div>
    </nav>
  );

  // Main Site Navigation Component
  const MainNavigation = () => (
    <nav className="bg-white overflow-hidden py-6 font-medium px-8 lg:px-20 w-full">
      <div className="flex w-full justify-between items-center">
        <div className="">
          <Link href="/">
            <Image loading="lazy" src={Icon} alt="icon" />
          </Link>
        </div>
        <div className="hidden lg:flex gap-10 xl:gap-20">
          {mainNavMenu.map((link, index) => (
            <Link 
              className="relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]" 
              key={index} 
              href={link.path}
            >
              {link.item}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex gap-10">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Image loading="lazy" src={User} alt="user" />
            </SignInButton>
          </SignedOut>
          <Link href="/search" aria-label="Search">
            <Image loading="lazy" src={Search} alt="search" />
          </Link>
          <Link className="relative" href="/wishlist" aria-label="Wishlist">
            <Image loading="lazy" src={Fav} alt="fav" />
            {wishlist.length > 0 && (
              <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                {wishlist.length < 10 ? wishlist.length : "9+"}
              </span>
            )}
          </Link>
          <button
            className="focus:outline-hidden relative" 
            onClick={() => setIsCartOpen((prev: boolean) => !prev)}
            aria-label="Open cart"
          >
            <Image loading="lazy" src={Cart} alt="cart" />
            {cartItems.length > 0 && (
              <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                {cartItems.length < 10 ? cartItems.length : "9+"}
              </span>
            )}
          </button>
        </div>
        <button
          className="lg:hidden text-3xl" 
          onClick={() => setIsNavOpen(prev => !prev)}
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
        >
          {isNavOpen ? "✖" : <Image className="w-9" src={Menu} alt="menu" />}
        </button>
      </div>
      <div className={`${isNavOpen ? "translate-x-0 w-full" : "translate-x-[-100%] w-0"} overflow-hidden fixed flex flex-col left-0 justify-center items-center text-2xl gap-10 z-30 top-20 border-t border-t-[#D9D9D9] h-screen duration-500 bg-white px-8`}>
        {mainNavMenu.map((link, index) => (
          <Link 
            onClick={() => setIsNavOpen(false)} 
            className="border-b border-b-black pb-3 w-10/12 text-center border-opacity-20" 
            key={index} 
            href={link.path}
          >
            {link.item}
          </Link>
        ))}
        <div className="flex mt-10 gap-10 bg-[#F9F1E7] py-4 w-full justify-center rounded-full">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <span aria-label="Sign in">
                <Image loading="lazy" src={User} alt="user" />
              </span>
            </SignInButton>
          </SignedOut>
          <Link href="/admin" className="flex items-center" title="Admin login" aria-label="Admin login">
            <Image loading="lazy" src={User} alt="admin login" />
          </Link>
          <Link href="/search" aria-label="Search">
            <Image loading="lazy" src={Search} alt="search" />
          </Link>
          <Link className="relative" onClick={() => setIsNavOpen(false)} href="/wishlist" aria-label="Wishlist">
            <Image loading="lazy" src={Fav} alt="fav" />
            {wishlist.length > 0 && (
              <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                {wishlist.length < 10 ? wishlist.length : "9+"}
              </span>
            )}
          </Link>
          <button
            className="focus:outline-hidden relative" 
            onClick={() => setIsCartOpen((prev: boolean) => !prev)}
            aria-label="Open cart"
          >
            <Image loading="lazy" src={Cart} alt="cart" />
            {cartItems.length > 0 && (
              <span className="absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3">
                {cartItems.length < 10 ? cartItems.length : "9+"}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  // Return the appropriate navigation based on the route
  return isAdmin ? <AdminNavigation /> : <MainNavigation />;
};

export default Header;
