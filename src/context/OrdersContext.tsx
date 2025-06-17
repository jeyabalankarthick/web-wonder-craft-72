
import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/context/CartContext";

export interface OrderCustomer {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  paymentMethod?: string;
  trackingNumber?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (orderData: {
    customer: OrderCustomer;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    paymentMethod?: string;
  }) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: {
    customer: OrderCustomer;
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    paymentMethod?: string;
  }) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      ...orderData,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};
