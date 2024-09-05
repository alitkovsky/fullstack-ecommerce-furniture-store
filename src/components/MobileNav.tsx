"use client";

import React, { useState } from "react";
import { RiMenu4Line, RiMenuLine } from "react-icons/ri";
import { Nav, NavLink } from "@/components/Nav";
import { NavMenuItemType } from "@/interfaces";

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

const MobileNav = () => {
   const [isOpen, setIsOpen] = useState(false);

  return (
   <div className="xl:hidden">
      <div
         className="cursor-pointer outline-none"
         onClick={() => setIsOpen(!isOpen)}
      >
         <RiMenu4Line className="text-2xl transition-all duration-300 text-primary" />
      </div>
      <aside
         className={`${
            isOpen ? "right-0 w-full" : "-right-full w-0"
         } bg-white text-primary fixed flex z-20 top-20 bottom-0 transition-all duration-500 overflow-hidden text-2xl gap-10 border-t border-t-[#D9D9D9] h-screen px-8 justify-center items-center`}
      >
         <div className="container flex flex-col mx-auto text-primary items-center">
            <ul className="flex flex-col gap-y-10">
               {navMenu.map((link, index) => (
                  <li
                     key={index}
                     onClick={() => setIsOpen(false)}
                  >
                     <a
                        href={link.path}
                        className="hover:text-accent focus-visible:bg-secondary focus-visible:text-accent-foreground font-medium relative after:content-[''] after:absolute after:bg-primary after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"
                     >{link.item}</a>
                  </li>
               ))}
            </ul>
         </div>
      </aside>
   </div>
  );
};

export default MobileNav;