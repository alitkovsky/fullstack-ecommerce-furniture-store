import { lazy } from "react";

const AuthPage = lazy(() => import("@/app/auth/[[...rest]]/page"))
import Login from "@/app/auth/[[...rest]]/login";
import Signup from "@/app/auth/[[...rest]]/signup";
const BlogPage = lazy(() => import("@/app/blog/page"))
const CartPage = lazy(() => import("@/app/cart/page"))
const CheckoutPage = lazy(() => import("@/app/checkout/page"))
const ContactPage = lazy(() => import("@/app/contact/page"))
const HomePage = lazy(() => import("@/app/home/page"))
const NotFound = lazy(() => import("@/app/notfound/page"))
const ProductPage = lazy(() => import("@/app/products/[id]/page"))
const WishlistPage = lazy(() => import("@/app/wishlist/page"))
const ShopPage = lazy(() => import("@/app/shop/page"))
const LoadingPage = lazy(() => import("@/app/loading/page"))
const SearchPage = lazy(() => import("@/app/search/page"))

export {
    AuthPage,
    Login,
    Signup,
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