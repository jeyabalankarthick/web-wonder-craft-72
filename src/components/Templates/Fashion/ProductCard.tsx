import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();
  const { toast } = useToast();
  const detailUrl =
    purchaseContext === "marketplace"
      ? `/productDetails/${id}`
      : `/products/${id}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // For store websites, ALWAYS add to STORE cart with the specific storeId
    addToCart({
      id,
      name,
      price,
      image,
      qty: 1,
      quantity: 1,
      purchaseContext: "store", // ALWAYS store for store website purchases
      storeId: storeId, // Specific store ID
    });

    toast({
      title: `Added to ${storeName} cart`,
      description: `${name} added to your store cart.`,
    });
  };

  return (
    <Link to={detailUrl} className="product-card group bg-white">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

        {/* Quick Actions */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Sale Badge */}
        {originalPrice && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
              Sale
            </span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">{category}</p>
        <div>
          <h3 className="font-medium text-gray-900 mb-2 hover:text-accent transition-colors text-sm sm:text-base line-clamp-2">
            {name}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900 text-sm sm:text-base">
            ₹{price}
          </span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
