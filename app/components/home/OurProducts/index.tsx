import { ProductCard } from '@/app/components'
import products from '@/app/data/products'

const OurProducts: React.FC = () => {

    return (
        <div className='p-8 lg:p-20'>
            <h2 className="font-bold text-[#3A3A3A] text-3xl lg:text-4xl text-center">Our Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-8">
                {products.map((product, index) => (<ProductCard key={index} product={product} />))}
            </div>
            <div className="w-full flex justify-center">
                <button className='text-ochre border-2 border-ochre hover:bg-ochre hover:text-white duration-300 py-3 px-20 font-semibold'>Show More</button>
            </div>
        </div>
    )
}

export default OurProducts
