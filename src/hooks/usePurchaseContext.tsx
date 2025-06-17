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
    
    // If we're on marketplace route without a current website, it's a marketplace purchase
    if (location.pathname.startsWith('/marketplace') && !currentWebsite) {
      return 'marketplace';
    }

    // If we're in cart or checkout and have a current website, it's a store purchase
    if ((location.pathname === '/storecart' || location.pathname === '/checkout') && currentWebsite) {
      return 'store';
    }

    // For product detail pages, check if we have a current website context
    if (location.pathname.startsWith('/product/') || location.pathname.startsWith('/productDetails/')) {
      // If we have a current website, it's a store purchase
      if (currentWebsite) {
        return 'store';
      }
      // Otherwise, it's a marketplace purchase
      return 'marketplace';
    }

    // For index page and other routes, if we have a current website, it's a store purchase
    if (currentWebsite) {
      return 'store';
    }

    // Default fallback to marketplace
    return 'marketplace';
  };

  const getStoreId = (): string | undefined => {
    if (getPurchaseContext() === 'store' && currentWebsite) {
      return currentWebsite.url;
    }
    return undefined;
  };

  const getStoreName = (): string => {
    if (getPurchaseContext() === 'store' && currentWebsite) {
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
