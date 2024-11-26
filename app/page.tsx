import {
  CartModal,
  AddToCartModal,
  ScrollToTop
} from "@/app/components"
import { AppProvider } from "@/app/context/AppContext"
import { ToastContainer } from "react-toastify";
import Navbar from "@/app/components/navbar";
import HomePage from "@/app/home/page";
import Footer from "@/app/components/footer"
import { Suspense } from "react"
import { LoadingPage } from "@/app/lazyload"

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
