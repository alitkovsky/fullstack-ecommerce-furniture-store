import {
    Hero,
    HomeGrid,
    HomeSlider,
    OurProducts,
    BrowseTheRange
} from "@/app/components";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <BrowseTheRange />
            <OurProducts />
            <HomeSlider />
            <HomeGrid />
        </>
    )
}

export default HomePage
