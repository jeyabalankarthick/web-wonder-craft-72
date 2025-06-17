
import HeroSection from "@/components/Templates/Fashion/HeroSection";
import FeaturedProducts from "@/components/Templates/Fashion/FeaturedProducts";
import CategoryGrid from "@/components/Templates/Fashion/CategoryGrid";
import TestmonialCarousel from "@/components/Templates/Fashion/TestmonialCarousel";
import Footer from "@/components/Templates/Fashion/Footer";
import Header from "@/components/Templates/Fashion/Header";
import { WebsiteProvider } from "@/context/WebsiteContext";

const IndexF = () => {
  return (
    <WebsiteProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <HeroSection />
        <FeaturedProducts />
        <CategoryGrid />
        <TestmonialCarousel />
        <Footer />
      </div>
    </WebsiteProvider>
  );
};

export default IndexF;
