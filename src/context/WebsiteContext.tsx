
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WebsiteData {
  id: string;
  name: string;
  url: string;
  template: 'fashion' | 'default';
  content: {
    heroTitle?: string;
    heroSubtitle?: string;
    logoText?: string;
  };
  createdAt: string;
  isActive: boolean;
}

interface WebsiteContextType {
  websites: WebsiteData[];
  currentWebsite: WebsiteData | null;
  setCurrentWebsite: (website: WebsiteData | null) => void;
  addWebsite: (websiteData: Omit<WebsiteData, 'id' | 'createdAt' | 'isActive'>) => WebsiteData;
  updateWebsiteContent: (content: Partial<WebsiteData['content']>) => void;
  deleteWebsite: (id: string) => void;
  setActiveWebsite: (id: string) => void;
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean) => void;
  isLiveWebsiteActive: boolean;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsite must be used within WebsiteProvider");
  }
  return context;
};

export const WebsiteProvider = ({ children }: { children: ReactNode }) => {
  const [websites, setWebsites] = useState<WebsiteData[]>([]);
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const isLiveWebsiteActive = websites.some(site => site.isActive);

  const addWebsite = (websiteData: Omit<WebsiteData, 'id' | 'createdAt' | 'isActive'>): WebsiteData => {
    const newWebsite: WebsiteData = {
      ...websiteData,
      id: `website-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isActive: true, // Set as active when created
      content: {
        heroTitle: 'Welcome to Our Store',
        heroSubtitle: 'Discover amazing products',
        logoText: 'FASHION',
        ...websiteData.content
      }
    };
    
    // Deactivate all other websites and add the new one
    setWebsites(prev => [...prev.map(site => ({ ...site, isActive: false })), newWebsite]);
    setCurrentWebsite(newWebsite);
    
    console.log('Website added:', newWebsite);
    console.log('Total websites:', websites.length + 1);
    
    return newWebsite;
  };

  const updateWebsiteContent = (content: Partial<WebsiteData['content']>) => {
    if (currentWebsite) {
      const updatedWebsite = {
        ...currentWebsite,
        content: {
          ...currentWebsite.content,
          ...content
        }
      };
      setCurrentWebsite(updatedWebsite);
      setWebsites(prev => 
        prev.map(site => 
          site.id === currentWebsite.id ? updatedWebsite : site
        )
      );
    }
  };

  const deleteWebsite = (id: string) => {
    setWebsites(prev => prev.filter(site => site.id !== id));
    if (currentWebsite?.id === id) {
      setCurrentWebsite(null);
    }
  };

  const setActiveWebsite = (id: string) => {
    setWebsites(prev => 
      prev.map(site => ({
        ...site,
        isActive: site.id === id
      }))
    );
    const activeWebsite = websites.find(site => site.id === id);
    if (activeWebsite) {
      setCurrentWebsite(activeWebsite);
    }
  };

  return (
    <WebsiteContext.Provider value={{
      websites,
      currentWebsite,
      setCurrentWebsite,
      addWebsite,
      updateWebsiteContent,
      deleteWebsite,
      setActiveWebsite,
      isEditMode,
      setIsEditMode,
      isLiveWebsiteActive
    }}>
      {children}
    </WebsiteContext.Provider>
  );
};
