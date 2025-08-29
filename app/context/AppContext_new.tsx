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
    const [wishlist, setWishlist] = useState<WishlistItemType[]>(() => {
        if (typeof window === "undefined") return [];
        const storedWishlist = localStorage.getItem("furniroWishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });
    const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
        if (typeof window === "undefined") return [];
        const storedCart = localStorage.getItem("furniroCart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [toggleCartModal, setToggleCartModal] = useState<boolean>(false);
    const [productForModal, setProductForModal] = useState<ProductType | undefined>();
    const [productFeatures, setProductFeatures] = useState<ProductFeatures>(initialFeatures);

    const debounce = (func: Function, delay: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // Debounced localStorage update
    const updateLocalStorage = debounce(() => {
        localStorage.setItem("furniroCart", JSON.stringify(cartItems));
        localStorage.setItem("furniroWishlist", JSON.stringify(wishlist));
    }, 300);

    useEffect(() => {
        updateLocalStorage();
    }, [cartItems, wishlist]);

    const addToWishlist = ({ product }: { product: ProductType }) => {
        if (!wishlist.some((p) => p.product.id === product.id)) {
            setWishlist((prev) => [...prev, { product }]);
            toast.success(`${product.title} was successfully added to wishlist!`);
        }
    };

    const addToCart = ({ cartProduct }: { cartProduct: CartItemType }) => {
        const existingItem = cartItems.find(
            (item) =>
                item.product.id === cartProduct.product.id &&
                item.features.color === cartProduct.features.color &&
                item.features.size === cartProduct.features.size
        );

        if (existingItem) {
            setCartItems((prev) =>
                prev.map((item) =>
                    item === existingItem
                        ? { ...item, features: { ...item.features, quantity: item.features.quantity + cartProduct.features.quantity } }
                        : item
                )
            );
        } else {
            setCartItems((prev) => [...prev, cartProduct]);
        }

        toast.success(
            `${cartProduct.product.title} (${cartProduct.features.color}/${cartProduct.features.size}) was successfully added to cart!`
        );
    };

    const removeFromWishlist = ({ product }: { product: ProductType }) => {
        setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
        toast.info(`${product.title} was successfully removed from wishlist!`);
    };

    const removeFromCart = (cartItemId: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
        toast.info(`Product was successfully removed from cart!`);
    };

    const isInWishlist = ({ product }: { product: ProductType }) => wishlist.some((p) => p.product.id === product.id);

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
    if (!context) throw new Error("useData must be used within an AppProvider");
    return context;
};