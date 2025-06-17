
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Truck, Package, MapPin, Mail, Phone, Calendar, Store } from "lucide-react";
import { useOrders } from "@/context/OrdersContext";
import { useState } from "react";

export const OrdersView = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "processing": return "default";
      case "shipped": return "outline";
      case "delivered": return "default";
      default: return "secondary";
    }
  };

  const getContextIcon = (context: string) => {
    return context === "marketplace" ? <Package className="w-4 h-4" /> : <Store className="w-4 h-4" />;
  };

  const getContextBadge = (context: string, storeId?: string) => {
    if (context === "marketplace") {
      return "PocketAngadi Marketplace";
    } else {
      return storeId === "template-preview" ? "Minimal Shop" : `Store: ${storeId}`;
    }
  };

  const selectedOrderData = orders.find(order => order.id === selectedOrder);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground">Manage and track customer orders from marketplace and stores</p>
      </div>

      {selectedOrderData ? (
        // Order Details View
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              ← Back to Orders
            </Button>
            <div className="flex space-x-2">
              <Badge variant={getStatusColor(selectedOrderData.status)}>
                {selectedOrderData.status}
              </Badge>
              {getContextIcon(selectedOrderData.items[0]?.purchaseContext || "marketplace")}
              <Badge variant="outline">
                {getContextBadge(selectedOrderData.items[0]?.purchaseContext || "marketplace", selectedOrderData.items[0]?.storeId)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-medium">{selectedOrderData.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedOrderData.date}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Store/Platform</p>
                  <p className="font-medium">{getContextBadge(selectedOrderData.items[0]?.purchaseContext || "marketplace", selectedOrderData.items[0]?.storeId)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{selectedOrderData.paymentMethod || "Credit Card"}</p>
                </div>
                {selectedOrderData.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-medium">{selectedOrderData.trackingNumber}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Customer Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{selectedOrderData.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{selectedOrderData.customer.email}</p>
                </div>
                {selectedOrderData.customer.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{selectedOrderData.customer.phone}</span>
                    </p>
                  </div>
                )}
                {selectedOrderData.customer.address && (
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping Address</p>
                    <div className="font-medium">
                      <p>{selectedOrderData.customer.address}</p>
                      {selectedOrderData.customer.city && (
                        <p className="text-sm text-muted-foreground">
                          {selectedOrderData.customer.city} {selectedOrderData.customer.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Totals */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Items ({selectedOrderData.items.length})</span>
                  <span>{selectedOrderData.items.reduce((sum, item) => sum + item.quantity, 0)} total</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{selectedOrderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{selectedOrderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{selectedOrderData.tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{selectedOrderData.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items ({selectedOrderData.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrderData.items.map((item) => (
                    <TableRow key={`${item.id}-${item.storeId}`}>
                      <TableCell className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">SKU: {item.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getContextBadge(item.purchaseContext, item.storeId)}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Orders List View
        <Card>
          <CardHeader>
            <CardTitle>All Orders ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No orders yet</p>
                  <p className="text-sm">Orders from both marketplace and stores will appear here</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getContextIcon(order.items[0]?.purchaseContext || "marketplace")}
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getContextBadge(order.items[0]?.purchaseContext || "marketplace", order.items[0]?.storeId)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">₹{order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                      </div>
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setSelectedOrder(order.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Truck className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
