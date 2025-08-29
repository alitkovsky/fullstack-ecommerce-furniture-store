"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AppContextType, WishlistItemType, ProductType, CartItemType, ProductFeatures } from "@/app/interfaces";
import { toast } from "react-toastify";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const initialFeatures = {
        color: "blue",
        size: "S",
        quantity: 1,
    };

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const [toggleCartModal, setToggleCartModal] = useState<boolean>(false);
    const [productForModal, setProductForModal] = useState<ProductType | undefined>();
    const [productFeatures, setProductFeatures] = useState<ProductFeatures>(initialFeatures);

    // Load data from localStorage after the component mounts
    useEffect(() => {
        const storedWishlist = localStorage.getItem("furniroWishlist");
        const storedCart = localStorage.getItem("furniroCart");

        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }

        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Sync wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("furniroWishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // Sync cart items to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("furniroCart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToWishlist = ({ product }: { product: ProductType }) => {
        if (!wishlist.some((p) => p.product.id === product.id)) {
            const updatedWishlist = [...wishlist, { product }] as WishlistItemType[];
            setWishlist(updatedWishlist);

            toast.success(`${product.title} was successfully added to wishlist!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const removeFromWishlist = ({ product }: { product: ProductType }) => {
        if (wishlist.some((p) => p.product.id === product.id)) {
            const updatedWishlist = wishlist.filter((item) => item.product.id !== product.id);
            setWishlist(updatedWishlist);

            toast.info(`${product.title} was successfully removed from wishlist!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const addToCart = ({ cartProduct }: { cartProduct: CartItemType }) => {
        if (
            !cartItems.some(
                (p) =>
                    p.product.id === cartProduct.product.id &&
                    p.features.color === cartProduct.features.color &&
                    p.features.size === cartProduct.features.size
            )
        ) {
            const updatedCartItems = [...cartItems, cartProduct] as CartItemType[];
            setCartItems(updatedCartItems);

            toast.success(`${cartProduct.product.title} was successfully added to cart!`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.product.id === cartProduct.product.id &&
                    item.features.color === cartProduct.features.color &&
                    item.features.size === cartProduct.features.size
                        ? { ...item, features: { ...item.features, quantity: item.features.quantity + productFeatures.quantity } }
                        : item
                )
            );
        }
    };

    const removeFromCart = (cartItemId: number) => {
        if (cartItems.some((p) => p.id === cartItemId)) {
            const updatedCartItems = cartItems.filter((item) => item.id !== cartItemId);
            setCartItems(updatedCartItems);

            toast.info(`Product was successfully removed from cart!`, {
                position: isCartOpen ? "bottom-left" : "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const isInWishlist = ({ product }: { product: ProductType }) => {
        return wishlist.some((p) => p.product.id === product.id);
    };

    const states: AppContextType = {
        isCartOpen,
        setIsCartOpen,
        isNavOpen,
        setIsNavOpen,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        toggleCartModal,
        setToggleCartModal,
        productForModal,
        setProductForModal,
        productFeatures,
        setProductFeatures,
        initialFeatures,
    };

    return <AppContext.Provider value={states}>{children}</AppContext.Provider>;
};

export const useData = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useData must be used within an AppProvider");
    }
    return context;
};
