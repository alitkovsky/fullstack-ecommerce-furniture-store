"use client";

import React, { useState } from "react";
import { RiMenu4Line, RiMenuLine } from "react-icons/ri";
import { Nav, NavLink } from "@/components/Nav";

const MobileNav = () => {
   const [isOpen, setIsOpen] = useState(false);

  return (
   <div className="xl:hidden">
      <div
         className="cursor-pointer outline-none"
         onClick={() => setIsOpen(!isOpen)}
      >
         <RiMenu4Line className="text-2xl transition-all duration-300 text-black" />
      </div>
      <aside
         className={`${
            isOpen ? "right-0" : "-right-full"
         } bg-white fixed z-20 w-full t-10 top-[90px] bottom-0 transition-all duration-500`}
      >
         <div className="container flex flex-col justify-between mx-auto">
            <Nav>
               <NavLink href="/">Home</NavLink>
               <NavLink href="/products">Products</NavLink>
               <NavLink href="/orders">My Orders</NavLink>
               <NavLink href="/contact">Contact</NavLink>
            </Nav>
         </div>
      </aside>
   </div>
  );
};

export default MobileNav;