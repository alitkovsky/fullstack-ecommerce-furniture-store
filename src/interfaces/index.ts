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
    image: string,
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
    image: string,
    link: string
} // homeslider.tsx

export interface RangeItemType {
    image: string;
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