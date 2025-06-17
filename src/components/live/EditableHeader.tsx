
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWebsite } from "@/context/WebsiteContext";
import { CartDropdown } from "@/components/marketplace/CartDropdown";

export const EditableHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const { items } = useCart();
  const { currentWebsite, updateWebsiteContent, isEditMode } = useWebsite();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogoEdit = (newLogo: string) => {
    updateWebsiteContent({ logoText: newLogo });
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Editable Logo */}
          <div className="flex-shrink-0">
            {isEditMode ? (
              <Input
                value={currentWebsite?.content.logoText || 'FASHION'}
                onChange={(e) => handleLogoEdit(e.target.value)}
                className="text-2xl font-bold text-gray-900 border-dashed border-2 border-blue-300 bg-blue-50"
                placeholder="Enter logo text"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">
                {currentWebsite?.content.logoText || 'FASHION'}
              </h1>
            )}
            {isEditMode && (
              <p className="text-xs text-blue-600 mt-1">Click to edit logo</p>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Shop</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>

              {showCartDropdown && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <CartDropdown onClose={() => setShowCartDropdown(false)} />
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Shop</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
