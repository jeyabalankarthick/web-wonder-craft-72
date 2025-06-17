
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Truck, Shield } from "lucide-react";

interface HeroSectionProps {
  onExploreProducts: () => void;
}

export const HeroSection = ({ onExploreProducts }: HeroSectionProps) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Main Hero */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                ✨ New Marketplace Experience
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              They Dream. You Shop. Together, We Build India
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                Shop millions of products with fast delivery, competitive prices, and excellent customer service.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={onExploreProducts}
                className="text-lg px-8 py-6"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Become a Seller
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">4.8/5 Rating</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">2M+</span> Happy Customers
              </div>
            </div>
          </div>

          {/* Hero Image/Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" 
                    alt="Electronics"
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">Electronics</h3>
                  <p className="text-sm text-muted-foreground">Latest gadgets</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow mt-8">
                <CardContent className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" 
                    alt="Fashion"
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">Fashion</h3>
                  <p className="text-sm text-muted-foreground">Trending styles</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop" 
                    alt="Home"
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">Home & Garden</h3>
                  <p className="text-sm text-muted-foreground">Cozy spaces</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow mt-8">
                <CardContent className="p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" 
                    alt="Sports"
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold">Sports</h3>
                  <p className="text-sm text-muted-foreground">Active lifestyle</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Secure Shopping</h3>
                <p className="text-sm text-muted-foreground">Your payment information is protected</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
