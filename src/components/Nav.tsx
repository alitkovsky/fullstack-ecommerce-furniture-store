"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="hidden xl:flex gap-10 font-primary transition-all duration-300 ">
      {children}
    </nav>
  )
};

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "hover:text-accent focus-visible:bg-secondary focus-visible:text-accent-foreground font-medium relative after:content-[''] after:absolute after:bg-primary after:h-[3px] after:w-0 hover:after:w-full after:duration-300 after:left-0 after:-bottom-[3px]",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  )
};