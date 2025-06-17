
// src/pages/Cart.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";

// Marketplace wrappers
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter";
// Store (Fashion) wrappers
import Header from "@/components/Templates/Fashion/Header";
import Footer from "@/components/Templates/Fashion/Footer";

interface WrapperProps {
  children: React.ReactNode;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();
  const {
    getMarketplaceItems,
    getStoreItems,
    updateQuantity,
    removeFromCart,
    getMarketplaceTotalPrice,
    getStoreTotalPrice,
    clearCart,
  } = useCart();

  // pick items + total by context
  const items =
    purchaseContext === "marketplace"
      ? getMarketplaceItems()
      : getStoreItems(storeId);
  const totalPrice =
    purchaseContext === "marketplace"
      ? getMarketplaceTotalPrice()
      : getStoreTotalPrice(storeId);

  const emptyMessage =
    purchaseContext === "marketplace"
      ? "Your marketplace cart is empty."
      : `Your ${storeName} cart is empty.`;

  const continueLink =
    purchaseContext === "marketplace"
      ? "/marketplace"
      : `/live/${storeId}`;

  const Wrapper: React.FC<WrapperProps> = ({ children }) =>
    purchaseContext === "marketplace" ? (
      <>
        <MarketplaceHeader
          searchQuery={""}
          setSearchQuery={() => {}}
        />
        {children}
        <MarketplaceFooter />
      </>
    ) : (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );

  // if no items, render empty state
  if (items.length === 0) {
    return (
      <Wrapper>
        <div className="min-h-screen flex items-center justify-center bg-background py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold">{emptyMessage}</h2>
            <Button
              className="mt-6"
              onClick={() => navigate(continueLink)}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="min-h-screen py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {purchaseContext === "marketplace"
              ? "Your Marketplace Cart"
              : `${storeName} Cart`}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card
                  key={`${item.id}-${item.purchaseContext}-${item.storeId}`}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="flex items-center space-x-4 p-6">
                    {/* image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    {/* name & price */}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>

                    {/* qty controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                            item.purchaseContext,
                            item.storeId
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                            item.purchaseContext,
                            item.storeId
                          )
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.purchaseContext,
                          item.storeId
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* summary */}
            <div>
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹100.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (10%)</span>
                      <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        ₹{(totalPrice + 100 + totalPrice * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full mb-2"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(continueLink)}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
