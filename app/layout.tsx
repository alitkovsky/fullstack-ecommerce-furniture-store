import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins"
})

import {
  CartModal,
  AddToCartModal,
  ScrollToTop
} from "@/app/components"
import { ToastContainer } from "react-toastify";

import { AppProvider } from "@/app/context/AppContext";
import Navbar from "./components/navbar";
import Footer from "@/app/components/footer"
import { Suspense } from "react"
import { LoadingPage } from "@/app/lazyload"

export const metadata: Metadata = {
  title: "Fullstack E-commerce App",
  description: "A fullstack e-commerce app built with Next.js and Prisma",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
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
            <Navbar />
            {children}
            <ToastContainer />
            <ScrollToTop />
            <CartModal />
            <AddToCartModal />
            <Footer />
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
};