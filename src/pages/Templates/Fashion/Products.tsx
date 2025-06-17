
import { useState } from "react";
import Header from "@/components/Templates/Fashion/Header";
import Footer from "@/components/Templates/Fashion/Footer";
import ProductCard from "@/components/Templates/Fashion/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { WebsiteProvider } from "@/context/WebsiteContext";

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "shirts",
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1543508282-86ba8230d4c7?w=400&h=400&fit=crop",
      category: "pants",
      rating: 4.2,
      reviews: 95
    },
    {
      id: 3,
      name: "Leather Ankle Boots",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "shoes",
      rating: 4.8,
      reviews: 155
    },
    {
      id: 4,
      name: "Woven Leather Belt",
      price: 39.99,
      originalPrice: 49.99,
      image: "https://images.unsplash.com/photo-1617196009934-955ca8f12a7c?w=400&h=400&fit=crop",
      category: "accessories",
      rating: 4.0,
      reviews: 62
    },
    {
      id: 5,
      name: "Striped Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
      category: "shirts",
      rating: 4.6,
      reviews: 110
    },
    {
      id: 6,
      name: "Chino Shorts",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://images.unsplash.com/photo-1560243574-bbcb48f464c3?w=400&h=400&fit=crop",
      category: "pants",
      rating: 4.3,
      reviews: 88
    },
    {
      id: 7,
      name: "Suede Loafers",
      price: 99.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1588361503371-8447953c1398?w=400&h=400&fit=crop",
      category: "shoes",
      rating: 4.7,
      reviews: 142
    },
    {
      id: 8,
      name: "Canvas Backpack",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop",
      category: "accessories",
      rating: 4.1,
      reviews: 75
    },
    {
      id: 9,
      name: "Denim Jacket",
      price: 89.99,
      originalPrice: 109.99,
      image: "https://images.unsplash.com/photo-1566275529824-cca6d807a5a7?w=400&h=400&fit=crop",
      category: "shirts",
      rating: 4.4,
      reviews: 101
    },
    {
      id: 10,
      name: "Cargo Pants",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1616587894842-c3d94f1311b4?w=400&h=400&fit=crop",
      category: "pants",
      rating: 4.2,
      reviews: 92
    }
  ];

  const categories = ['all', 'shirts', 'pants', 'shoes', 'accessories'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100+', label: 'Over $100' }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange === '0-50') priceMatch = product.price < 50;
    else if (priceRange === '50-100') priceMatch = product.price >= 50 && product.price <= 100;
    else if (priceRange === '100+') priceMatch = product.price > 100;
    
    return categoryMatch && priceMatch;
  });

  return (
    <WebsiteProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Discover our complete collection</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600 capitalize">
                          {category === 'all' ? 'All Categories' : category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={range.value}
                          checked={priceRange === range.value}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {/* View Controls */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id.toString()}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </WebsiteProvider>
  );
};

export default Products;
