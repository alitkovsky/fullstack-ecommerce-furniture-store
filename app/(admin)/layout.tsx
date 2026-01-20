import type { Metadata } from "next";
import React from "react";
import { AppProvider } from "@/app/context/AppContext";
import { Suspense } from "react";
import { ClerkProvider } from '@clerk/nextjs';
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";

import "@/app/globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins"
});

import CartModal from "@/app/components/CartModal";
import AddToCartModal from "@/app/components/AddToCartModal";
import ScrollToTop from "@/app/components/ScrollToTop";
import ClerkLoadBanner from "@/app/components/ClerkLoadBanner";

import { LoadingPage } from "./admin/lazyload";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard - Fullstack E-commerce App",
  description: "Admin dashboard for managing the e-commerce store",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is admin - this runs on the server where Prisma works
  const userIsAdmin = await isAdmin();

  if (!userIsAdmin) {
    console.log('❌ User is not admin - redirecting to unauthorized');
    redirect('/unauthorized');
  }

  console.log('✅ User has admin access - rendering admin layout');

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="/assets/icon.svg"
            type="image/<generated>"
            sizes="<generated>"
            />
          <link
            rel="apple-touch-icon"
            href="/assets/apple-icon.jpg"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body className={`${poppins.variable} antialiased`}>
          <AppProvider>
            <Suspense fallback={<LoadingPage />}>
              <ClerkLoadBanner />
              <main className="min-h-screen">
                {children}
              </main>
              <ToastContainer />
              <ScrollToTop />
              <CartModal />
              <AddToCartModal />
            </Suspense>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};
