
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWebsite } from "@/context/WebsiteContext";

export const EditableHeroSection = () => {
  const { currentWebsite, updateWebsiteContent, isEditMode } = useWebsite();

  const handleTitleEdit = (newTitle: string) => {
    updateWebsiteContent({ heroTitle: newTitle });
  };

  const handleSubtitleEdit = (newSubtitle: string) => {
    updateWebsiteContent({ heroSubtitle: newSubtitle });
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        {/* Editable Title */}
        <div className="mb-6">
          {isEditMode ? (
            <div className="space-y-2">
              <Input
                value={currentWebsite?.content.heroTitle || 'Welcome to Our Store'}
                onChange={(e) => handleTitleEdit(e.target.value)}
                className="text-4xl md:text-6xl font-bold text-center bg-white/10 border-dashed border-2 border-blue-300 text-white placeholder-gray-300"
                placeholder="Enter hero title"
              />
              <p className="text-sm text-blue-300">Click to edit title</p>
            </div>
          ) : (
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {currentWebsite?.content.heroTitle || 'Welcome to Our Store'}
            </h1>
          )}
        </div>

        {/* Editable Subtitle */}
        <div className="mb-8">
          {isEditMode ? (
            <div className="space-y-2">
              <Textarea
                value={currentWebsite?.content.heroSubtitle || 'Discover amazing products'}
                onChange={(e) => handleSubtitleEdit(e.target.value)}
                className="text-xl md:text-2xl text-center bg-white/10 border-dashed border-2 border-blue-300 text-white placeholder-gray-300 resize-none"
                placeholder="Enter hero subtitle"
                rows={2}
              />
              <p className="text-sm text-blue-300">Click to edit subtitle</p>
            </div>
          ) : (
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              {currentWebsite?.content.heroSubtitle || 'Discover amazing products'}
            </p>
          )}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">
            Shop Now
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
