import Hero from "../components/home/Hero";
import EditorialMarquee from "../components/home/EditorialMarquee";
import Manifesto from "../components/home/Manifesto";
import Collections from "../components/home/Collections";
import BestSellers from "../components/home/BestSellers";
import CustomCTA from "../components/home/CustomCTA";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <EditorialMarquee />
      <Manifesto />
      <Collections />
      <BestSellers />
      <CustomCTA />
      <Testimonials />
    </main>
  );
}
