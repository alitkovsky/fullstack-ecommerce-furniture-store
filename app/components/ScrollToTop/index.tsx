"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop: React.FC = () => {
    const pathname = usePathname(); // Use usePathname from next/navigation

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]); // Trigger scrollTo when the route changes

    return null; // This component doesn't render anything
};

export default ScrollToTop;
