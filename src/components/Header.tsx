"use client";

import Image from "next/image";
import Link from "next/link";
import { RiAdminLine, RiShoppingBag4Line, RiHeart3Line, RiSearch2Line } from "react-icons/ri";

import { Nav, NavLink } from "@/components/Nav";
import MobileNav from "./MobileNav";
import { Separator } from "@/components/ui/separator";

type HeaderProps = {
   id: string
   name: string
   priceInCents: number
   description: string
   imagePath: string
 };

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
            <Link href="">
               <Image
               src="/assets/furniro-logo.svg"
               alt="Furniro"
               width={185}
               height={41}
               />
            </Link>
            <Nav>
               <NavLink href="/">Home</NavLink>
               <NavLink href="/products">Products</NavLink>
               <NavLink href="/orders">My Orders</NavLink>
               <NavLink href="/contact">Contact</NavLink>
            </Nav>
            <div className="flex justify-end gap-6">
               <Link href="/admin">
               <RiAdminLine className="text-2xl" />
               </Link>
               <Link href="/search">
               <RiSearch2Line className="text-2xl" />
               </Link>
               <Link href="/wishlist">
               <RiHeart3Line className="text-2xl" />
               </Link>
               <Link href="/cart">
               <RiShoppingBag4Line className="text-2xl" />
               </Link>
               <Separator
                  orientation="vertical"
                  className="h-6 bg-black mx-1 xl:hidden"
               />
               <MobileNav />
            </div>
        </div>
      </header>
    </>
   )
 };