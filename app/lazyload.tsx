import { lazy } from "react";

const AuthPage = lazy(() => import("@/app/auth/page"))
import LoginPage from "@/app/auth/login/page";
import SignupPage from "@/app/auth/signup/page";
const BlogPage = lazy(() => import("@/app/blog/page"))
const CartPage = lazy(() => import("@/app/cart/page"))
const CheckoutPage = lazy(() => import("@/app/checkout/page"))
const ContactPage = lazy(() => import("@/app/contact/page"))
const HomePage = lazy(() => import("@/app/home/page"))
const NotFound = lazy(() => import("@/app/notfound/page"))
const ProductPage = lazy(() => import("@/app/product/page"))
const WishlistPage = lazy(() => import("@/app/wishlist/page"))
const ShopPage = lazy(() => import("@/app/shop/page"))
const LoadingPage = lazy(() => import("@/app/loading/page"))
const SearchPage = lazy(() => import("@/app/search/page"))

export {
    AuthPage,
    LoginPage,
    SignupPage,
    BlogPage,
    CartPage,
    CheckoutPage,
    ContactPage,
    HomePage,
    NotFound,
    ProductPage,
    WishlistPage,
    ShopPage,
    LoadingPage,
    SearchPage
}