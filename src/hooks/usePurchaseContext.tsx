import { useLocation } from "react-router-dom";
import { useWebsite } from "@/context/WebsiteContext";

export const usePurchaseContext = () => {
  const location = useLocation();
  const { currentWebsite } = useWebsite();

  const getPurchaseContext = (): 'marketplace' | 'store' => {
    // If we're on a live website route, it's a store purchase
    if (location.pathname.startsWith('/live/')) {
      return 'store';
    }
    
    // If we're in template editor/preview mode, it's a store purchase
    if (location.pathname.startsWith('/edit/') || location.pathname === '/') {
      return 'store';
    }

    // If we're on marketplace route, it's a marketplace purchase
    if (location.pathname.startsWith('/marketplace')) {
      return 'marketplace';
    }

    // If we're in cart or checkout and have a current website, it's a store purchase
    if ((location.pathname === '/storecart' || location.pathname === '/checkout') && currentWebsite) {
      return 'store';
    }

    // For product detail pages, check the route structure
    if (location.pathname.startsWith('/product/') || location.pathname.startsWith('/productDetails/')) {
      // If we're in marketplace context (no current website), it's marketplace
      if (location.pathname.startsWith('/marketplace') || !currentWebsite) {
        return 'marketplace';
      }
      // Otherwise, it's a store purchase
      return 'store';
    }

    // Default fallback based on current website context
    return currentWebsite ? 'store' : 'marketplace';
  };

  const getStoreId = (): string | undefined => {
    if (getPurchaseContext() === 'store') {
      // For template preview, use a default store ID
      if (!currentWebsite) {
        return 'template-preview';
      }
      return currentWebsite.url;
    }
    return undefined;
  };

  const getStoreName = (): string => {
    if (getPurchaseContext() === 'store') {
      // For template preview, use default name
      if (!currentWebsite) {
        return 'Minimal Shop';
      }
      return currentWebsite.name;
    }
    return 'PocketAngadi Marketplace';
  };

  return {
    purchaseContext: getPurchaseContext(),
    storeId: getStoreId(),
    storeName: getStoreName(),
    isMarketplace: getPurchaseContext() === 'marketplace',
    isStore: getPurchaseContext() === 'store'
  };
};
