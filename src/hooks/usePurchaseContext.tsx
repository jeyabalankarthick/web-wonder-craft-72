
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
    
    // If we're on marketplace route, it's a marketplace purchase
    if (location.pathname.startsWith('/marketplace')) {
      return 'marketplace';
    }

    // If we're in cart or checkout and have a current website, it's a store purchase
    if ((location.pathname === '/cart' || location.pathname === '/iheckout') && currentWebsite) {
      return 'store';
    }

    // For product detail pages accessed from marketplace, default to marketplace
    if (location.pathname.startsWith('/product/')) {
      return 'marketplace';
    }

    // Default fallback based on current website context
    return currentWebsite ? 'store' : 'marketplace';
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
