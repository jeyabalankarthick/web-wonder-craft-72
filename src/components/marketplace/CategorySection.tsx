
import { Card, CardContent } from "@/components/ui/card";
import { 
  Laptop, 
  Shirt, 
  Home, 
  Dumbbell, 
  Book, 
  Sparkles,
  Car,
  Baby
} from "lucide-react";

interface CategorySectionProps {
  onCategorySelect: (category: string) => void;
}

export const CategorySection = ({ onCategorySelect }: CategorySectionProps) => {
  const categories = [
    { name: "Electronics", icon: Laptop, color: "from-blue-500 to-blue-600" },
    { name: "Fashion", icon: Shirt, color: "from-pink-500 to-pink-600" },
    { name: "Home & Garden", icon: Home, color: "from-green-500 to-green-600" },
    { name: "Sports", icon: Dumbbell, color: "from-orange-500 to-orange-600" },
    { name: "Books", icon: Book, color: "from-purple-500 to-purple-600" },
    { name: "Beauty", icon: Sparkles, color: "from-rose-500 to-rose-600" },
    { name: "Automotive", icon: Car, color: "from-gray-500 to-gray-600" },
    { name: "Baby", icon: Baby, color: "from-yellow-500 to-yellow-600" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
        <p className="text-muted-foreground text-lg">Find exactly what you're looking for</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.name}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
              onClick={() => onCategorySelect(category.name)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium text-sm">{category.name}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
