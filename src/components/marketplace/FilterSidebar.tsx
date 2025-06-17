
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useProducts } from "@/context/ProductContext";

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export const FilterSidebar = ({ filters, setFilters }: FilterSidebarProps) => {
  const { getCategories } = useProducts();
  const categories = getCategories();

  const priceRanges = [
    { label: "Under ₹2,000", value: "0-2000" },
    { label: "₹2,000 - ₹5,000", value: "2000-5000" },
    { label: "₹5,000 - ₹10,000", value: "5000-10000" },
    { label: "₹10,000 - ₹25,000", value: "10000-25000" },
    { label: "Over ₹25,000", value: "25000+" }
  ];

  const ratings = [4, 3, 2, 1];

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      sortBy: "newest"
    });
  };

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Categories</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.category === category}
                    onCheckedChange={(checked) => 
                      updateFilter("category", checked ? category : "")
                    }
                  />
                  <Label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Price Range</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min (₹)</Label>
                  <Input
                    id="minPrice"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max (₹)</Label>
                  <Input
                    id="maxPrice"
                    placeholder="50000"
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={range.value}
                      checked={
                        (range.value === "0-2000" && filters.minPrice === "0" && filters.maxPrice === "2000") ||
                        (range.value === "2000-5000" && filters.minPrice === "2000" && filters.maxPrice === "5000") ||
                        (range.value === "5000-10000" && filters.minPrice === "5000" && filters.maxPrice === "10000") ||
                        (range.value === "10000-25000" && filters.minPrice === "10000" && filters.maxPrice === "25000") ||
                        (range.value === "25000+" && filters.minPrice === "25000" && filters.maxPrice === "")
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const [min, max] = range.value.split("-");
                          updateFilter("minPrice", min);
                          updateFilter("maxPrice", max === "+" ? "" : max);
                        } else {
                          updateFilter("minPrice", "");
                          updateFilter("maxPrice", "");
                        }
                      }}
                    />
                    <Label htmlFor={range.value} className="text-sm cursor-pointer">
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Customer Rating</Label>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating.toString()}
                    onCheckedChange={(checked) => 
                      updateFilter("rating", checked ? rating.toString() : "")
                    }
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Shipping</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="freeShipping" />
                <Label htmlFor="freeShipping" className="text-sm cursor-pointer">
                  Free Shipping
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="fastShipping" />
                <Label htmlFor="fastShipping" className="text-sm cursor-pointer">
                  Fast Delivery (1-2 days)
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
