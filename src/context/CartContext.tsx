
import React, {
    createContext,
    useContext,
    useState,
    ReactNode
  } from "react";
  
  // ❶ Define your CartItem shape
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    qty: number;
    quantity: number; // Add this for compatibility
    purchaseContext: 'marketplace' | 'store'; // New field to track context
    storeId?: string; // Optional store identifier
  }
  
  interface CartContextType {
    cartItems: CartItem[];
    items: CartItem[]; // Add alias for compatibility
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, purchaseContext: 'marketplace' | 'store', storeId?: string) => void;
    updateQuantity: (id: string, quantity: number, purchaseContext: 'marketplace' | 'store', storeId?: string) => void;
    getTotalPrice: () => number;
    getMarketplaceItems: () => CartItem[];
    getStoreItems: (storeId?: string) => CartItem[];
    clearCart: () => void;
    clearStoreCart: (storeId?: string) => void;
    clearMarketplaceCart: () => void;
    getMarketplaceTotalPrice: () => number;
    getStoreTotalPrice: (storeId?: string) => number;
  }
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  export const useCart = (): CartContextType => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
  };
  
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    const addToCart = (item: CartItem) => {
      setCartItems((prev) => {
        const existing = prev.find((ci) => 
          ci.id === item.id && 
          ci.purchaseContext === item.purchaseContext &&
          ci.storeId === item.storeId
        );
        if (existing) {
          return prev.map((ci) =>
            ci.id === item.id && 
            ci.purchaseContext === item.purchaseContext &&
            ci.storeId === item.storeId ? { 
              ...ci, 
              qty: ci.qty + item.qty,
              quantity: ci.qty + item.qty 
            } : ci
          );
        }
        return [...prev, { ...item, quantity: item.qty }];
      });
    };
  
    const removeFromCart = (id: string, purchaseContext: 'marketplace' | 'store', storeId?: string) => {
      setCartItems((prev) => prev.filter((ci) => !(
        ci.id === id && 
        ci.purchaseContext === purchaseContext &&
        ci.storeId === storeId
      )));
    };

    const updateQuantity = (id: string, quantity: number, purchaseContext: 'marketplace' | 'store', storeId?: string) => {
      if (quantity <= 0) {
        removeFromCart(id, purchaseContext, storeId);
        return;
      }
      setCartItems((prev) =>
        prev.map((ci) =>
          ci.id === id && 
          ci.purchaseContext === purchaseContext &&
          ci.storeId === storeId ? { 
            ...ci, 
            qty: quantity, 
            quantity: quantity 
          } : ci
        )
      );
    };

    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    const getMarketplaceItems = () => {
      return cartItems.filter(item => item.purchaseContext === 'marketplace');
    };

    const getStoreItems = (storeId?: string) => {
      return cartItems.filter(item => 
        item.purchaseContext === 'store' && 
        (!storeId || item.storeId === storeId)
      );
    };

    const clearCart = () => {
      setCartItems([]);
    };

    const clearStoreCart = (storeId?: string) => {
      setCartItems(prev => 
        prev.filter(item => 
          !(item.purchaseContext === 'store' && 
            (!storeId || item.storeId === storeId))
        )
      );
    };

    const clearMarketplaceCart = () => {
      setCartItems(prev => 
        prev.filter(item => item.purchaseContext !== 'marketplace')
      );
    };

    const getMarketplaceTotalPrice = () => {
      return getMarketplaceItems().reduce((total, item) => total + (item.price * item.qty), 0);
    };

    const getStoreTotalPrice = (storeId?: string) => {
      return getStoreItems(storeId).reduce((total, item) => total + (item.price * item.qty), 0);
    };
  
    return (
      <CartContext.Provider value={{ 
        cartItems, 
        items: cartItems, // Provide alias for compatibility
        addToCart, 
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getMarketplaceItems,
        getStoreItems,
        clearCart,
        clearStoreCart,
        clearMarketplaceCart,
        getMarketplaceTotalPrice,
        getStoreTotalPrice
      }}>
        {children}
      </CartContext.Provider>
    );
  };
