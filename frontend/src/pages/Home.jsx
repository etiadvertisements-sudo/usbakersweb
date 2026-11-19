import Hero from "../components/home/Hero";
import CategoryStrip from "../components/home/CategoryStrip";
import BestSellers from "../components/home/BestSellers";
import ParallaxCategories from "../components/home/ParallaxCategories";
import PromoBanners from "../components/home/PromoBanners";
import CustomCTA from "../components/home/CustomCTA";
import ValueProps from "../components/home/ValueProps";
import Testimonials from "../components/home/Testimonials";
import StoreInfo from "../components/home/StoreInfo";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <CategoryStrip />
      <BestSellers />
      <ParallaxCategories />
      <PromoBanners />
      <CustomCTA />
      <ValueProps />
      <Testimonials />
      <StoreInfo />
    </main>
  );
}
