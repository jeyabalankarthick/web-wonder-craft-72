
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  searchQuery: string;
  filters: any;
  handleProductView: (id: string) => void;
}

export const ProductGrid = ({ searchQuery, filters, handleProductView }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { products } = useProducts(); 
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.store || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !filters.category || product.category === filters.category;
      
      const matchesPrice = (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
                          (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice));
      
      const matchesRating = !filters.rating || (product.rating || 0) >= parseFloat(filters.rating);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [searchQuery, filters, products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (filters.sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "reviews":
        return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      default:
        return sorted;
    }
  }, [filteredProducts, filters.sortBy]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Always add to MARKETPLACE cart, regardless of which store the product is from
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
      quantity: 1,
      purchaseContext: 'marketplace', // ALWAYS marketplace for marketplace purchases
      storeId: undefined, // No store ID for marketplace purchases
    });

    toast({
      title: 'Added to PocketAngadi Cart',
      description: `${product.name} added to your marketplace cart.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {sortedProducts.length} of {products.length} products
          {searchQuery && (
            <span> for "<span className="font-medium">{searchQuery}</span>"</span>
          )}
        </p>
        <Select value={filters.sortBy} onValueChange={(value) => filters.setFilters?.(prev => ({ ...prev, sortBy: value }))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <button onClick={() => handleProductView(product.id)} className="w-full">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
                
                {/* Add to Cart Button - Marketplace Context */}
                <Button
                  size="icon"
                  className="absolute top-2 left-2 bg-primary hover:bg-primary/90"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => toggleWishlist(Number(product.id))}
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(Number(product.id)) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                  />
                </Button>
                {product.originalPrice && product.originalPrice > product.price && (
                  <Badge className="absolute bottom-2 left-2" variant="destructive">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {product.store}
                  </Badge>
                  {product.freeShipping && (
                    <Badge variant="secondary" className="text-xs">
                      Free Shipping
                    </Badge>
                  )}
                </div>
                
                <button onClick={() => handleProductView(product.id)} className="w-full text-left">
                  <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </button>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};
