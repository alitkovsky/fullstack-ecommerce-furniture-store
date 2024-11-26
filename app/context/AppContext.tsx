"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppContextType, WishlistItemType, ProductType, CartItemType, ProductFeatures } from '@/app/interfaces';
import { toast } from 'react-toastify';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // const initializeWishlistFromLocalStorage = (): WishlistItemType[] => {
    //     const storedWishlist = localStorage.getItem('furniroWishlist');
    //     return storedWishlist ? JSON.parse(storedWishlist) : [];
    // };

    const initializeWishlistFromLocalStorage = (): WishlistItemType[] => {
        if (typeof window === "undefined") {
            // If running on the server, return an empty array
            return [];
        }

        const storedWishlist = localStorage.getItem("furniroWishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    };

    const initializeCartFromLocalStorage = (): CartItemType[] => {
        if (typeof window === "undefined") {
            // If running on the server, return an empty array
            return [];
        }

        const storedCart = localStorage.getItem('furniroCart');
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const initialFeatures = {
        color: 'blue',
        size: 'S',
        quantity: 1
    }

    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const [wishlist, setWishlist] = useState<WishlistItemType[]>(initializeWishlistFromLocalStorage())
    const [cartItems, setCartItems] = useState<CartItemType[]>(initializeCartFromLocalStorage())
    const [toggleCartModal, setToggleCartModal] = useState<boolean>(false)
    const [productForModal, setProductForModal] = useState<ProductType | undefined>()
    const [productFeatures, setProductFeatures] = useState<ProductFeatures>(initialFeatures)

    const addToWishlist = ({ product }: { product: ProductType }) => {
        if (!wishlist.some(p => p.product.id === product.id)) {
            setWishlist((prev) => {
                const updatedWishlist = [...prev, { product }] as WishlistItemType[]
                return updatedWishlist
            });
        }
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

    const addToCart = ({ cartProduct }: { cartProduct: CartItemType }) => {
        if (!cartItems.some(p => (p.product.id === cartProduct.product.id &&
            p.features.color === cartProduct.features.color &&
            p.features.size === cartProduct.features.size))) {
            setCartItems((prev) => {
                const updatedCartItems = [...prev, cartProduct] as CartItemType[]
                return updatedCartItems
            })

        } else {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.product.id === cartProduct.product.id &&
                        item.features.color === cartProduct.features.color &&
                        item.features.size === cartProduct.features.size
                        ? { ...item, features: { ...item.features, quantity: item.features.quantity + productFeatures.quantity } } :
                        item))
        }
        toast.success(`${cartProduct.product.title}(${cartProduct.features.color}/${cartProduct.features.size}) was successfully added to cart!`, {
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

    const removeFromWishlist = ({ product }: { product: ProductType }) => {
        if (wishlist.some(p => p.product.id === product.id)) {
            setWishlist(prev => {
                const updatedWishlist = prev.filter(item => item.product.id !== product.id)
                return updatedWishlist;
            });
        }
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
    };

    const removeFromCart = (cartItemId: number) => {
        if (cartItems.some(p => p.id === cartItemId)) {
            setCartItems(prev => {
                const updatedCartItems = prev.filter(item => item.id !== cartItemId)
                return updatedCartItems;
            });
        }
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
    };

    const isInWishlist = ({ product }: { product: ProductType }) => {
        return !wishlist.some(p => p.product.id === product.id)
    }

    useEffect(() => {
        localStorage.setItem('furniroCart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem('furniroWishlist', JSON.stringify(wishlist));
    }, [wishlist])

    const states: AppContextType =
    {
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
    }

    return <AppContext.Provider value={states}>{children}</AppContext.Provider>;

};
export const useData = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useData must be used within an AppProvider');
    }
    return context;
};
