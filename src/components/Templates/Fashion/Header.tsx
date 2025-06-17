// src/components/Templates/Fashion/Header.tsx

import React, { useState, useRef } from "react";
import { ShoppingCart, Menu, X, Pencil, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartDropdown } from "@/components/marketplace/CartDropdown";
import { useWebsite } from "@/context/WebsiteContext";
import { SaveWebsiteModal } from "@/components/dashboard/SaveWebsiteModal";

interface NavItem {
  label: string;
  href: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const { items } = useCart();
  const { isLiveWebsiteActive } = useWebsite();

  // Editable logo
  const [logoText, setLogoText] = useState("FASHION");
  const [editingLogo, setEditingLogo] = useState(false);

  // Editable nav
  const [navItems, setNavItems] = useState<NavItem[]>([
    { label: "Home", href: "#" },
    { label: "Shop", href: "#" },
    { label: "Categories", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ]);
  const [editingNavIndex, setEditingNavIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const showMessage = (msg: string) => {
    setUpdateMessage(msg);
    setTimeout(() => setUpdateMessage(""), 2000);
  };

  const saveLogo = () => {
    setEditingLogo(false);
    showMessage("Logo updated");
  };

  const saveNav = (index: number) => {
    setEditingNavIndex(null);
    showMessage("Navigation updated");
  };

  const cartItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-2 group">
              {editingLogo ? (
                <>
                  <input
                    ref={inputRef}
                    className="border-b-2 focus:outline-none"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value)}
                    onBlur={saveLogo}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveLogo();
                    }}
                    autoFocus
                  />
                  <Check
                    className="w-5 h-5 text-green-500 cursor-pointer"
                    onClick={saveLogo}
                  />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{logoText}</h1>
                  <button
                    onClick={() => {
                      setEditingLogo(true);
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    aria-label="Edit logo"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Pencil className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </button>
                </>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item, idx) => (
                <div key={idx} className="relative flex items-center group">
                  {editingNavIndex === idx ? (
                    <>
                      <input
                        ref={inputRef}
                        className="border-b-2 focus:outline-none"
                        value={item.label}
                        onChange={(e) => {
                          const newNav = [...navItems];
                          newNav[idx].label = e.target.value;
                          setNavItems(newNav);
                        }}
                        onBlur={() => saveNav(idx)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveNav(idx);
                        }}
                        autoFocus
                      />
                      <Check
                        className="w-4 h-4 text-green-500 ml-1 cursor-pointer"
                        onClick={() => saveNav(idx)}
                      />
                    </>
                  ) : (
                    <>
                      <a
                        href={item.href}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {item.label}
                      </a>
                      <button
                        onClick={() => {
                          setEditingNavIndex(idx);
                          setTimeout(() => inputRef.current?.focus(), 0);
                        }}
                        aria-label="Edit nav item"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-1"
                      >
                        <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Live Website Button */}
              <Button
                variant={isLiveWebsiteActive ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSaveModal(true)}
                className="relative overflow-hidden hidden sm:flex"
              >
                <Globe className="h-4 w-4" />
                <span>{isLiveWebsiteActive ? "Live Website" : "Save as Website"}</span>
                {isLiveWebsiteActive && (
                  <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
              </Button>

              {/* Cart */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCartDropdown((o) => !o)}
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
                onClick={() => setIsMenuOpen((o) => !o)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
              {navItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 group">
                  <a href={item.href} className="text-gray-700 hover:text-gray-900">
                    {item.label}
                  </a>
                  <button
                    onClick={() => {
                      setEditingNavIndex(idx);
                      setIsMenuOpen(false);
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    aria-label="Edit nav item"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </button>
                </div>
              ))}
              <Button
                variant={isLiveWebsiteActive ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSaveModal(true)}
                className="self-start"
              >
                <Pencil className="w-4 h-4 mr-1" />{" "}
                {isLiveWebsiteActive ? "Live Website" : "Save Website"}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Temporary update message */}
      {updateMessage && (
        <div className="fixed top-16 right-4 bg-green-600 text-white px-4 py-2 rounded shadow">
          {updateMessage}
        </div>
      )}

      <SaveWebsiteModal open={showSaveModal} onOpenChange={setShowSaveModal} />

      <style>{`
        @keyframes pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </>
  );
};

export default Header;