
// src/pages/Templates/Fashion/ProductDetail.tsx

import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../../components/Templates/Fashion/Header";
import Footer from "../../../components/Templates/Fashion/Footer";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const product = getProductById(id!);
  const { addToCart } = useCart();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If no such product, show a friendly 404
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Product not found.</p>
        <Link
          to={
            purchaseContext === "marketplace"
              ? "/marketplace"
              : `/live/${storeId}`
          }
          className="ml-4 text-primary underline"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // derive images array always
  const images = useMemo(
    () => (product.images && product.images.length ? product.images : [product.image]),
    [product] 
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[selectedImage],
      qty: quantity,
      quantity,
      purchaseContext: purchaseContext === "marketplace" ? "marketplace" : "store",
      storeId: purchaseContext === "marketplace" ? undefined : storeId,
    });
    toast({
      title:
        purchaseContext === "marketplace"
          ? "Added to Marketplace cart"
          : `Added to ${storeName} cart`,
      description: `${quantity} × ${product.name} added.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-light mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        product.rating && i < Math.floor(product.rating)
                          ? "text-primary fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  {product.rating != null && product.reviews != null && (
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  –
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-white py-4 text-lg rounded"
              >
                Add to Cart
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                  <span>Save</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Feature Icons */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-sm">
                  Free shipping on orders over ₹1000
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-gray-600" />
                <span className="text-sm">
                  Free returns within 30 days
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <span className="text-sm">
                  2-year warranty included
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
