
import { useParams, Navigate } from "react-router-dom";
import { useWebsite } from "@/context/WebsiteContext";
import { EditableHeader } from "@/components/live/EditableHeader";
import { EditableHeroSection } from "@/components/live/EditableHeroSection";
import FeaturedProducts from "@/components/Templates/Fashion/FeaturedProducts";
import CategoryGrid from "@/components/Templates/Fashion/CategoryGrid";
import TestmonialCarousel from "@/components/Templates/Fashion/TestmonialCarousel";
import Footer from "@/components/Templates/Fashion/Footer";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";

const LiveWebsite = () => {
  const { websiteName } = useParams<{ websiteName: string }>();
  const { currentWebsite, isEditMode, setIsEditMode } = useWebsite();

  // If no website data or URL doesn't match, redirect to home
  if (!currentWebsite || currentWebsite.url !== websiteName) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Edit Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsEditMode(!isEditMode)}
          variant={isEditMode ? "default" : "outline"}
          size="sm"
          className="shadow-lg"
        >
          {isEditMode ? (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      <EditableHeader />
      <EditableHeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <TestmonialCarousel />
      <Footer />
    </div>
  );
};

export default LiveWebsite;
