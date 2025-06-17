
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  User,
  Menu,
  MapPin,
  Gift,
  ShoppingCart as CartIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  const { getMarketplaceItems } = useCart();
  const { products } = useProducts();
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // total quantity in cart
  const cartItems = getMarketplaceItems();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products based on search query
  const filteredProducts = searchQuery.length > 0 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5) // Show max 5 results
    : [];

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/marketplace?view=grid');
      setShowSearchDropdown(false);
    }
  };

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/40">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center space-x-4">
            <MapPin className="h-3 w-3" />
            <span>Deliver to New York 10001</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Customer Service</span>
            <span>Sell</span>
            <span>Registry</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/marketplace" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">
              PA
            </span>
          </div>
          <span className="text-2xl font-bold">Pocket Angadi</span>
        </Link>

        {/* Search Bar with Dropdown */}
        <div className="flex-1 mx-8 max-w-3xl relative" ref={searchRef}>
          <div className="flex">
            <Input
              placeholder="Search Pocket Angadi"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(e.target.value.length > 0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="flex-1 rounded-l-md border focus:ring-2 focus:ring-primary/20"
            />
            <Button
              className="rounded-l-none px-6"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleProductSelect(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.category}</p>
                    <p className="text-sm font-semibold text-primary">₹{product.price}</p>
                  </div>
                </div>
              ))}
              <div className="p-3 border-t bg-gray-50">
                <button
                  onClick={handleSearch}
                  className="text-sm text-primary hover:underline"
                >
                  See all results for "{searchQuery}"
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="hidden md:flex items-center space-x-1 text-sm"
            onClick={() => {}}
          >
            <Gift className="h-4 w-4" />
            <span>Deals</span>
          </Button>

          <Link to="/dashboard">
            <Button variant="ghost" className="hidden md:flex text-sm">
              Sell on Pocket Angadi
            </Button>
          </Link>

          <Button variant="ghost" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <div className="hidden md:block text-left">
              <div className="text-xs">Hello, Sign in</div>
              <div className="text-sm font-medium">Account & Lists</div>
            </div>
          </Button>

          {/* Cart Button */}
          <Button
            variant="ghost"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <CartIcon className="h-5 w-5" />
            {totalCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">
                {totalCount}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 text-sm overflow-x-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 whitespace-nowrap"
            >
              <Menu className="h-4 w-4 mr-1" />
              All
            </Button>
            {[
              "Today's Deals",
              "Electronics",
              "Fashion",
              "Home & Garden",
              "Sports & Outdoors",
              "Books",
              "Beauty & Personal Care",
              "Toys & Games",
            ].map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-700 whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
