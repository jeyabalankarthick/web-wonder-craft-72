
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductContext";

interface TopSellingSectionProps {
  onViewProduct: (id: string) => void;
}

export const TopSellingSection = ({ onViewProduct }: TopSellingSectionProps) => {
  const { products } = useProducts();
  
  // Get top selling products (sorted by reviews as a proxy for sales)
  const topSellingProducts = products
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 6);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <Badge variant="secondary">Best Sellers</Badge>
            </div>
            <h2 className="text-3xl font-bold">Top Selling Products</h2>
            <p className="text-muted-foreground">Most popular items loved by our customers</p>
          </div>
          <Button variant="outline" onClick={() => onViewProduct('all')}>
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSellingProducts.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {index < 3 && (
                <Badge className="absolute top-2 left-2 z-10" variant="destructive">
                  #{index + 1} Best Seller
                </Badge>
              )}
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && product.originalPrice > product.price && (
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.store}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-medium line-clamp-2">{product.name}</h3>
                  
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
                      ({product.reviews} reviews)
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

                  <Button 
                    className="w-full mt-2" 
                    size="sm"
                    onClick={() => onViewProduct(product.id)}
                  >
                    View Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
