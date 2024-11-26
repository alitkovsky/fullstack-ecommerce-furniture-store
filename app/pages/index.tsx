import { lazy } from "react";

const AuthPage = lazy(() => import("@/app/pages/Authentification/AuthPage"))
import Login from "@/app/pages/Authentification/Login";
import Signup from "@/app/pages/Authentification/Signup";
const BlogPage = lazy(() => import("@/app/pages/BlogPage"))
const CartPage = lazy(() => import("@/app/pages/CartPage"))
const CheckoutPage = lazy(() => import("@/app/pages/CheckoutPage"))
const ContactPage = lazy(() => import("@/app/pages/ContactPage"))
const HomePage = lazy(() => import("@/app/pages/HomePage"))
const NotFound = lazy(() => import("@/app/pages/NotFound"))
const ProductPage = lazy(() => import("@/app/pages/ProductPage"))
const WishlistPage = lazy(() => import("@/app/pages/WishlistPage"))
const ShopPage = lazy(() => import("@/app/pages/ShopPage"))
const LoadingPage = lazy(() => import("@/app/pages/LoadingPage"))
const SearchPage = lazy(() => import("@/app/pages/SearchPage"))

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