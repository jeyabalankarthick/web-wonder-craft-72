
// src/pages/Templates/Fashion/StoreCart.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Templates/Fashion/Header";
import Footer from "@/components/Templates/Fashion/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";

const StoreCart: React.FC = () => {
  const navigate = useNavigate();
  const { storeId, storeName } = usePurchaseContext();
  const {
    getStoreItems,
    updateQuantity,
    removeFromCart,
    getStoreTotalPrice,
    clearStoreCart,
  } = useCart();

  // only store items
  const items = getStoreItems(storeId);
  const totalPrice = getStoreTotalPrice(storeId);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center bg-background">
          <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold">{storeName} Cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some products to get started.</p>
          <Button 
            className="mt-6"
            onClick={() => navigate(`/live/${storeId}`)}
          >
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{storeName} Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card 
                key={`${item.id}-${item.storeId}`} 
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="flex items-center space-x-4 p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                  </div>

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

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

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
                  onClick={() => {
                    clearStoreCart(storeId);
                    navigate(`/live/${storeId}`);
                  }}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StoreCart;
