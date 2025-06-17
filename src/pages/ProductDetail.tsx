// src/pages/ProductDetail.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";

// Marketplace wrapper
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 1️⃣ Find product
  const product = products.find((p) => p.id === id);

  // 2️⃣ Not found
  if (!product) {
    const back = purchaseContext === "marketplace" ? "/marketplace" : `/live/${storeId}`;
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Product not found.</p>
        <Link to={back} className="ml-4 text-primary underline">
          Back
        </Link>
      </div>
    );
  }

  const images = product.images || [product.image];
  const features = product.features || [];

  // 3️⃣ Add to cart handler
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[selectedImage],
      qty: quantity,
      quantity: quantity,
      purchaseContext,
      storeId: purchaseContext === "store" ? storeId : undefined,
    });

    const title =
      purchaseContext === "marketplace"
        ? "Added to cart"
        : `Added to ${storeName} cart`;

    toast({
      title,
      description: `${quantity} × ${product.name} added.`,
    });
  };

  // 4️⃣ Back link/text logic
  const backLink =
    purchaseContext === "store" ? `/live/${storeId}` : "/marketplace";
  const backText =
    purchaseContext === "store" ? `Back to ${storeName}` : "Back to Marketplace";
  const cartButtonText =
    purchaseContext === "store"
      ? `Add to ${storeName}st Cart`
      : "Add to marCart";

  // 5️⃣ Detail content (common)
  const DetailContent = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Button variant="ghost" onClick={() => window.history.back()}>
        <ArrowLeft className="w-4 h-4" /> {backText}
      </Button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === i ? "border-primary" : "border-transparent"
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
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {product.store && (
                <Badge variant="secondary">{product.store}</Badge>
              )}
              {product.freeShipping && (
                <Badge variant="outline">Free Shipping</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      product.rating && i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              {product.rating != null && product.reviews != null && (
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews})
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold">₹{product.price}</span>
            {product.originalPrice != null &&
              product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge variant="destructive">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </Badge>
                </>
              )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-muted-foreground">
              {product.description}
            </p>
          )}

          {/* Features */}
          {features.length > 0 && (
            <ul className="space-y-1">
              {features.map((f, idx) => (
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

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  –
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{cartButtonText}</span>
            </Button>
            <Button variant="outline" size="icon" >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // 6️⃣ Entire return, wrapping based on context
  return purchaseContext === "marketplace" ? (
    <>
      <MarketplaceHeader
        searchQuery="" // optional
        setSearchQuery={() => {}}
      />
      <DetailContent />
      <MarketplaceFooter />
    </>
  ) : (
    <DetailContent />
  );
};

export default ProductDetail;
