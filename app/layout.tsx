import type { Metadata } from "next";
import { AppProvider } from "@/app/context/AppContext";
import { Suspense } from "react";
import { ClerkProvider } from '@clerk/nextjs';

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

import Header from "@/app/components/Header";
import Footer from "@/app/components/footer";
import DemoCredentials from "@/app/components/DemoCredentials";
import DemoBanner from "@/app/components/DemoBanner";
import { LoadingPage } from "@/app/lazyload";

export const metadata: Metadata = {
  title: "Fullstack E-commerce App",
  description: "A fullstack e-commerce app built with Next.js and Prisma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          <body
            className={`${poppins.variable} antialiased`}
          >
              <AppProvider>
                <Suspense fallback={<LoadingPage />}>
                  <Header />
                  <DemoBanner />
                  {children}
                  <ToastContainer />
                  <ScrollToTop />
                  <CartModal />
                  <AddToCartModal />
                  <DemoCredentials />
                  <Footer />
                </Suspense>
              </AppProvider>
          </body>
      </html>
    </ClerkProvider>
  );
};