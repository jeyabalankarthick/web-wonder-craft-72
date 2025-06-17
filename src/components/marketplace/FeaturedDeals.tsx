
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

interface FeaturedDealsProps {
  onViewAllDeals: () => void;
}

export const FeaturedDeals = ({ onViewAllDeals }: FeaturedDealsProps) => {
  const { products } = useProducts();
  
  // Get products with discounts (where originalPrice > price)
  const dealsProducts = products
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .slice(0, 4);

  if (dealsProducts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Today's Deals</h2>
          <p className="text-muted-foreground">Limited time offers you can't miss</p>
        </div>
        <Button onClick={onViewAllDeals} variant="outline">
          View All Deals
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dealsProducts.map((product) => {
          const discount = product.originalPrice 
            ? Math.round((1 - product.price / product.originalPrice) * 100)
            : 0;
            
          return (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 left-2" variant="destructive">
                    {discount}% OFF
                  </Badge>
                  <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full p-1">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.store}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-orange-600 font-medium">
                      Deal ends soon
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Deal of the Day Banner */}
      <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Deal of the Day</h3>
            <p className="text-orange-100">Save up to 70% on selected items</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">24:00:00</div>
            <div className="text-orange-100 text-sm">Time remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};
