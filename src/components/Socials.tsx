import Link from "next/link";
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill } from "react-icons/ri";

type Props = {
   containerStyles: string,
}

export default function Socials({ containerStyles }: Props) {
   return (
      <ul className={`${containerStyles}`}>
         <li>
            <Link href="/">
               <RiFacebookFill />
            </Link>
         </li>
         <li>
            <Link href="/">
               <RiTwitterFill />
            </Link>
         </li>
         <li>
            <Link href="/">
               <RiLinkedinFill />
            </Link>
         </li>
         <li>
            <Link href="/">
               <RiInstagramFill />
            </Link>
         </li>
    </ul>
  )
};