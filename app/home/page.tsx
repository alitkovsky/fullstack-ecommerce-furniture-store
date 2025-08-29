import Hero from "@/app/components/home/Hero";
import HomeGrid from "@/app/components/home/HomeGrid";
import HomeSlider from "@/app/components/home/HomeSlider";
import OurProducts from "@/app/components/home/OurProducts"; // Use database version
import BrowseTheRange from "@/app/components/home/BrowseTheRange";

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
};

export default HomePage;