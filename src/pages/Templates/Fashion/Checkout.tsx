// src/pages/Templates/Fashion/Checkout.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Templates/Fashion/Header";
import Footer from "@/components/Templates/Fashion/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";
import { WebsiteProvider } from "@/context/WebsiteContext";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useOrders } from "@/context/OrdersContext";

// Marketplace wrappers
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter";

const Checkout: React.FC = () => {
  const { purchaseContext, storeId } = usePurchaseContext();
  const {
    getMarketplaceItems,
    getStoreItems,
    getMarketplaceTotalPrice,
    getStoreTotalPrice,
    clearCart,
  } = useCart();
  const { products, updateProduct } = useProducts();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  // Derive items & totals
  const items =
    purchaseContext === "marketplace"
      ? getMarketplaceItems()
      : getStoreItems(storeId);
  const totalPrice =
    purchaseContext === "marketplace"
      ? getMarketplaceTotalPrice()
      : getStoreTotalPrice(storeId);

  const continueTo =
    purchaseContext === "marketplace" ? "/marketplace" : `/live/${storeId}`;

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1) Decrement stock for each item
    items.forEach((item) => {
      const prod = products.find((p) => p.id === item.id);
      if (prod) {
        const newStock = Math.max(0, prod.stock - item.quantity);
        updateProduct({
          ...prod,
          stock: newStock,
          status: newStock > 0 ? "active" : "out_of_stock",
        });
      }
    });

    // 2) Create order with proper customer object
    addOrder({
      customer: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: "",
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode
      },
      items,
      subtotal: totalPrice,
      shipping: 10,
      tax: totalPrice * 0.1,
      total: totalPrice + 10 + totalPrice * 0.1,
      paymentMethod: "Credit Card"
    });

    // 3) Clear the cart so header count resets
    clearCart();

    // 4) Open confirmation dialog
    setDialogOpen(true);
  };

  const CheckoutContent = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BILLING FORM */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(v) => handleInputChange("state", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ca">California</SelectItem>
                      <SelectItem value="ny">New York</SelectItem>
                      <SelectItem value="tx">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) =>
                  handleInputChange("cardNumber", e.target.value)
                }
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    required
                  />
                </div>
              </div>
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                value={formData.nameOnCard}
                onChange={(e) =>
                  handleInputChange("nameOnCard", e.target.value)
                }
                required
              />
            </CardContent>
          </Card>
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.purchaseContext}-${item.storeId}`}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹10.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>
                    ₹{(totalPrice + 10 + totalPrice * 0.1).toFixed(2)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <Button type="submit" className="w-full">
                  Complete Order
                </Button>
              </form>

              <Link to="/cart">
                <Button variant="outline" className="w-full mt-2">
                  Back to Cart
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Wrap based on context
  if (purchaseContext === "marketplace") {
    return (
      <>
        <MarketplaceHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {CheckoutContent}
        <MarketplaceFooter />
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Thank you!</AlertDialogTitle>
              <AlertDialogDescription>
                Your order has been placed successfully.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setDialogOpen(false);
                  navigate("/marketplace");
                }}
              >
                Continue Shopping
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <WebsiteProvider>
      <Header />
      {CheckoutContent}
      <Footer />
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank you!</AlertDialogTitle>
            <AlertDialogDescription>
              Your order has been placed successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setDialogOpen(false);
                navigate(`/live/${storeId}`);
              }}
            >
              Continue Shopping
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </WebsiteProvider>
  );
};

export default Checkout;
