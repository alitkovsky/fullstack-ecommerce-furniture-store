import {
    FilterBar,
    PageHeading,
    Pagination,
    ProductCard
} from "@/app/components";
import UpperFooter from "@/app/layout/UpperFooter";
import products from "../../data/products";

const ShopPage: React.FC = () => {
    return (
        <>
            <PageHeading mainhead='Shop' />
            <FilterBar />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-8 lg:p-20">
                {products.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
            <Pagination />
            <div className="mb-20"></div>
            <UpperFooter />
        </>
    )
}

export default ShopPage
