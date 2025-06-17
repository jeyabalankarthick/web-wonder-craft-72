// src/pages/Marketplace.tsx

import React, { useState, useEffect } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { HeroSection } from "@/components/marketplace/HeroSection";
import { CategorySection } from "@/components/marketplace/CategorySection";
import { FeaturedDeals } from "@/components/marketplace/FeaturedDeals";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { AboutSection } from "@/components/marketplace/AboutSection";
import { TopSellingSection } from "@/components/marketplace/TopSellingSection";
import { NewsletterSection } from "@/components/marketplace/NewsletterSection";
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter";
import { Button } from "@/components/ui/button";
import { Filter, ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

type ViewMode = "landing" | "grid" | "detail";

export const Marketplace: React.FC = () => {
  // ① Hooks for overall view
  const [view, setView] = useState<ViewMode>("landing");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);

  // ② State for detail view
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [detailSelectedImage, setDetailSelectedImage] = useState(0);
  const [detailQuantity, setDetailQuantity] = useState(1);

  const { products } = useProducts();
  const { addToCart: addItemToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // ③ Handlers
  const handleViewProduct = (id: string) => {
    setSelectedProductId(id);
    setView("detail");
    setDetailSelectedImage(0);
    setDetailQuantity(1);
  };

  const handleAddToCart = () => {
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;
    const images = product.images || [product.image];
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[detailSelectedImage],
      qty: detailQuantity,
      quantity: detailQuantity,
      purchaseContext: "marketplace",
    });
    toast({
      title: "Added to cart",
      description: `${detailQuantity} × ${product.name} added to your cart.`,
    });
  };

  // ④ Render
  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {view === "landing" && (
        <div className="space-y-0">
          <HeroSection onExploreProducts={() => setView("grid")} />
          <CategorySection
            onCategorySelect={(cat) => {
              setFilters((f) => ({ ...f, category: cat }));
              setView("grid");
            }}
          />
          <FeaturedDeals onViewAllDeals={() => setView("grid")} />
          <TopSellingSection onViewProduct={handleViewProduct} />
          <AboutSection />
          <NewsletterSection />
        </div>
      )}

      {view === "grid" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden fixed bottom-4 right-4 z-50">
              <Button
                onClick={() => setShowFilters((s) => !s)}
                className="rounded-full w-12 h-12 shadow-lg"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>

            {/* Filter Sidebar */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </div>

            {/* Product Grid */}
            <div className="flex-1 space-y-4">
              <Button variant="ghost" onClick={() => setView("landing")}>
                ← Back to Home
              </Button>
              <ProductGrid
                searchQuery={searchQuery}
                filters={filters}
                handleProductView={handleViewProduct}
              />
            </div>
          </div>
        </div>
      )}

      {view === "detail" && (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <Button variant="ghost" onClick={() => setView("grid")}>
            ← Back to Products
          </Button>
          {(() => {
            const product = products.find((p) => p.id === selectedProductId);
            if (!product) return <p>Product not found.</p>;
            const images = product.images || [product.image];

            return (
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Images */}
                <div className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={images[detailSelectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setDetailSelectedImage(i)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          detailSelectedImage === i
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-xl text-primary">${product.price}</p>
                  {product.description && (
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                  )}
                  {product.features?.length > 0 && (
                    <ul className="space-y-1">
                      {product.features.map((f, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center space-x-4">
                    <label>Quantity:</label>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          setDetailQuantity((q) => Math.max(1, q - 1))
                        }
                        className="px-3 py-2 hover:bg-muted"
                      >
                        –
                      </button>
                      <span className="px-4">{detailQuantity}</span>
                      <button
                        onClick={() => setDetailQuantity((q) => q + 1)}
                        className="px-3 py-2 hover:bg-muted"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <Button onClick={handleAddToCart} className="w-full">
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <MarketplaceFooter />
    </div>
  );
};

export default Marketplace;
