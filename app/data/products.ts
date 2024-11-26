import { ProductType } from "@/app/interfaces";
import Product1 from "@/public/assets/img/products/product1.png"
import Product2 from "@/public/assets/img/products/product2.png"
import Product3 from "@/public/assets/img/products/product3.png"

const products: ProductType[] = [
    {
        id: 1,
        title: "Syltherine",
        about: "Stylish cafe chair",
        oldprice: 3500,
        price: 2500,
        discount: 30,
        image: Product1,
        isnew: false
    },
    {
        id: 2,
        title: "Grifo",
        about: "Night lamp",
        price: 1500,
        image: Product2,
        isnew: false
    },
    {
        id: 3,
        title: "Muggo",
        about: "Small mug",
        price: 2000,
        image: Product3,
        isnew: true
    },{
        id: 4,
        title: "Syltherine",
        about: "Stylish cafe chair",
        oldprice: 3500,
        price: 2500,
        discount: 30,
        image: Product1,
        isnew: false
    },
    {
        id: 5,
        title: "Grifo",
        about: "Night lamp",
        price: 1500,
        image: Product2,
        isnew: false
    },
    {
        id: 6,
        title: "Muggo",
        about: "Small mug",
        price: 2000,
        image: Product3,
        isnew: true
    },

];

export default products;