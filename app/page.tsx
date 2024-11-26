import {
  CartModal,
  AddToCartModal,
  ScrollToTop
} from "@/app/components"
import { AppProvider } from "@/app/context/AppContext"
import { ToastContainer } from "react-toastify";
import Navbar from "@/app/layout/Navbar";
import HomePage from "@/app/pages/HomePage";
import Footer from "@/app/layout/Footer"
import { Suspense } from "react"
import { LoadingPage } from "@/app/pages"

export default function Home() {
  return (
    <>
      <AppProvider>
        <Suspense fallback={<LoadingPage />}>
          <Navbar />
          <HomePage />
          <Footer />
          <ToastContainer />
          <ScrollToTop />
          <CartModal />
          <AddToCartModal />
        </Suspense>
      </AppProvider>
    </>
  );
}
