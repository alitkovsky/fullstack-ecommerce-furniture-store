import Link from "next/link";
import Image from "next/image";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
   return (
      <footer className="footer border-t-[1px] border-[#D9D9D9]">
         <div className="container mx-auto px-0 p-12">
            <div className="grid sm:grid-flow-col sm:auto-cols-min md:grid-flow-col md:auto-cols-auto lg:grid-flow-col lg:auto-cols-auto xl:grid-flow-col xl:auto-cols-auto gap-12 p-8">
               <div className="footer__item text-left items-start xl:text-left">
                  <Link
                     href={"/"}
                     className="flex justify-start mb-14"
                  >
                     <Image
                        src="/assets/furniro-logo-small.svg"
                        width={85}
                        height={36}
                        alt="Furniro"
                     />
                  </Link>
                  <p className="mb-8 text-[16px] text-secondary-light font-primary">
                     400 University Drive Suite 200 Coral Gables,<br/> FL 33134 USA
                  </p>
                  <Socials
                     containerStyles="text-primary flex gap-4 justify-start"
                  />
               </div>
               <div className="footer__item font-medium font-primary">
                     <h3 className="h3 mb-14 text-secondary-light">
                        Links
                     </h3>
                     <ul className="flex flex-col gap-12">
                        <li>
                           <Link
                              href={"/"}
                              className={"w-fit relative after:content-[''] after:absolute after:bg-primary after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                           >
                              Home
                           </Link>
                        </li>
                        <li>
                           <Link
                              href={"/"}
                              className={"w-fit relative after:content-[''] after:absolute after:bg-primary after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                           >
                              Shop
                           </Link>
                        </li>
                        <li>
                           <Link
                              href={"/"}
                              className={"w-fit relative after:content-[''] after:absolute after:bg-primary after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                           >
                              About
                           </Link>
                        </li>
                        <li>
                           <Link
                              href={"/"}
                              className={"w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                           >
                              Contact
                           </Link>
                        </li>
                     </ul>
               </div>
               <div className="footer__item font-medium font-primary">
                  <h3 className="h3 mb-14 text-secondary-light">
                     Help
                  </h3>
                  <ul className="flex flex-col gap-12">
                     <li>
                        <Link
                           href={"/"}
                           className={"w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                        >
                           Payment Options
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/"}
                           className={"w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                        >
                           Returns
                        </Link>
                     </li>
                     <li>
                        <Link
                           href={"/"}
                           className={"w-fit relative after:content-[''] after:absolute after:bg-black after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]"}
                        >
                           Privacy Policies
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className="footer__item xl:mx-0 font-medium font-primary">
                  <h3 className="h3 mb-11 text-secondary-light">Newsletter</h3>
                  <div className="flex flex-wrap text-[16px]">
                        <Input type="email" name="email" id="email" placeholder="Enter Your Email Address" className="max-w-44 h-8 border-white rounded-none border-b-primary font-primary mr-1" />
                        <Button type="submit" variant="newsletter" size="newsletter">Subscribe</Button>
                  </div>
               </div>
               {/* <div className="flex-1 flex flex-col xl:flex-row text-center xl:text-left gap-12 xl:gap-[100px] xl:justify-end font-medium">

               </div> */}
            </div>
         </div>
         <div className="container mx-auto">
            <p className="footer__copyright text-lg py-9 bg-beige border-t font-primary">
               2023 furino. All rights reverved
            </p>
         </div>
      </footer>
  )
};