"use client";

import Image from "next/image";
import Link from "next/link";
import { RiAdminLine, RiShoppingBag4Line, RiHeart3Line, RiSearch2Line } from "react-icons/ri";

import { Nav, NavLink } from "@/components/Nav";
import MobileNav from "./MobileNav";
import { Separator } from "@/components/ui/separator";
import { NavMenuItemType } from "@/interfaces";

import Logo from "/public/assets/furniro-logo.svg";
import User from "/public/assets/icons/user.svg";
import Cart from "/public/assets/icons/cart.svg";
import Wishlist from "/public/assets/icons/fav.svg";
import Search from "/public/assets/icons/search.svg";
import Menu from "/public/assets/icons/burger-menu.svg";

type HeaderProps = {
   id: string
   name: string
   priceInCents: number
   description: string
   imagePath: string
 };

 const navMenu: NavMenuItemType[] = [
   {
       item: 'Home',
       path: '/'
   },
   {
       item: 'Shop',
       path: '/shop'
   },
   {
       item: 'About',
       path: '/about'
   },
   {
       item: 'Contact',
       path: '/contact'
   },
]

 export default function Header({
   id,
   name,
   priceInCents,
   description,
   imagePath,
 }: HeaderProps) {

   return (
      <>
      <header className="sticky top-0 h-[100px] z-30 bg-white">
         <div className="container mx-auto flex justify-between h-full items-center">
            <Link href="/">
               <Image
                  src={Logo}
                  alt="Furniro"
                  width={185}
                  height={41}
                  loading="lazy"
               />
            </Link>
            <Nav>
               {navMenu.map((link, index) => (
                  <NavLink key={index} href={link.path}>{link.item}</NavLink>
               ))}
            </Nav>
            <div className="flex justify-end gap-10">
               <Link href="/admin">
                  <Image
                     src={User}
                     alt="User"
                     width={28}
                     height={28}
                     loading="lazy"
                  />
               </Link>
               <Link href="/search">
                  <Image
                     src={Search}
                     alt="Search"
                     width={28}
                     height={28}
                     loading="lazy"
                  />
               </Link>
               <Link href="/wishlist">
                  <Image
                     src={Wishlist}
                     alt="Wishlist"
                     width={28}
                     height={28}
                     loading="lazy"
                  />
                  {/* {wishlist.length > 0 && <span className='absolute bg-ochre text-xs text-white rounded-full w-6 h-6 flex items-center justify-center -top-2 -right-3'>
                            {wishlist.length < 10 ? wishlist.length : '9+'}
                  </span>} */}
               </Link>
               <Link href="/cart">
                  <Image
                     src={Cart}
                     alt="Cart"
                     width={28}
                     height={28}
                     loading="lazy"
                  />
               </Link>
               <Separator
                  orientation="vertical"
                  className="h-6 bg-primary mx-1 xl:hidden"
               />
               <MobileNav />
            </div>
        </div>
      </header>
    </>
   )
 };