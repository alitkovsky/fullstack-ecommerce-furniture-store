"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import Icon from "@/public/assets/website-icon/icon.svg";

interface AdminNavItem {
  item: string;
  path: string;
}

const AdminNavbar: React.FC = () => {
  const pathname = usePathname();

  const adminNavMenu: AdminNavItem[] = [
    {
      item: "Dashboard",
      path: "/admin"
    },
    {
      item: "Products",
      path: "/admin/products"
    },
    {
      item: "Orders",
      path: "/admin/orders"
    },
    {
      item: "Collections",
      path: "/admin/collections"
    }
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-4 px-8 lg:px-20 w-full">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Image loading="lazy" src={Icon} alt="icon" />
          </Link>
          <span className="text-gray-500 text-sm">Admin Panel</span>
        </div>
        
        <div className="hidden lg:flex gap-8">
          {adminNavMenu.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`relative py-2 px-4 rounded-md transition-colors duration-200 ${
                isActive(link.path)
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-50"
          >
            View Site
          </Link>
          
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
      
      {/* Mobile menu - simplified for admin */}
      <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {adminNavMenu.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`px-3 py-2 rounded-md text-sm ${
                isActive(link.path)
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {link.item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
