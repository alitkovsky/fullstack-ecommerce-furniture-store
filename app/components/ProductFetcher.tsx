import { getProducts } from "@/app/data/products_new";

const ProductFetcher = async () => {
    const products = await getProducts();

    return products;
};

export default ProductFetcher;