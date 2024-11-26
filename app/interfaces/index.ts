import { StaticImageData } from "next/image";
import { Dispatch, SetStateAction } from "react";

export interface SignupProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
} // signup.tsx

export interface LoginProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>; // Assuming setIsLogin is a state-setting function
} //login.tsx

export interface ProductType {
    id: number,
    title: string,
    about: string,
    oldprice?: number,
    price: number,
    discount?: number,
    image: StaticImageData,
    isnew: boolean
} // productcard.tsx ; shoppage.tsx ; productpage.tsx ; ourproducts.tsx

export interface ProductCardProps {
    product: ProductType;
} // productcard.tsx

export interface NavMenuItemType {
    item: string;
    path: string;
} // navbar.tsx

export interface CartModalItemProps {
    p: CartItemType;
}

export interface CartPageItemProps {
    cartItem: CartItemType
}

export interface ProductFeaturesComponentProps {
    isPage: boolean
}

export interface AppContextType {
    isCartOpen: boolean;
    setIsCartOpen: Dispatch<SetStateAction<boolean>>;
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<SetStateAction<boolean>>;
    wishlist: WishlistItemType[];
    addToWishlist: (params: { product: ProductType }) => void;
    removeFromWishlist: (params: { product: ProductType }) => void;
    isInWishlist: (params: { product: ProductType }) => boolean;
    cartItems: CartItemType[];
    setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
    addToCart: (params: { cartProduct: CartItemType }) => void;
    removeFromCart: (cartItemId: number) => void;
    toggleCartModal: boolean;
    setToggleCartModal: Dispatch<SetStateAction<boolean>>;
    productForModal: ProductType | undefined;
    setProductForModal: Dispatch<SetStateAction<ProductType | undefined>>;
    productFeatures: ProductFeatures;
    setProductFeatures: Dispatch<SetStateAction<ProductFeatures>>;
    initialFeatures: ProductFeatures;
    // handleFeatures: (params: event: React.ChangeEvent<HTMLInputElement>) => void
    // handleToggleCartModal: HandleToggleCartModal;
} // appcontext.tsx

// export interface HandleToggleCartModal {
//     (toggle: boolean, product: ProductType): ProductType;
// };

export interface WishlistItemType {
    product: ProductType;
}; // appcontext.tsx

export interface WishlistItemCardProps {
    product: ProductType;
}

export interface CartItemType {
    id: number;
    product: ProductType;
    features: ProductFeatures;
}

export interface SlideItemType {
    id: number,
    category: string,
    title: string,
    link: string,
    image: StaticImageData,
} // homeslider.tsx

export interface RangeItemType {
    image: StaticImageData;
    title: string;
} // browsetherange.tsx

export interface PageHeadingProps {
    mainhead: string;
    subhead?: string;
} // pageheading.tsx

export interface ProductFeatures {
    color: string;
    size: string;
    quantity: number;
}