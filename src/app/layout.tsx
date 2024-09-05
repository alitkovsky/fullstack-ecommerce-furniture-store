import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "Fullstack E-commerce App",
  description: "A fullstack e-commerce app built with Next.js and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          poppins.variable
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
};