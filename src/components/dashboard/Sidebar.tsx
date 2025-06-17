
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  List, 
  BarChart3, 
  Settings, 
  Menu,
  Store,
  Eye,
  Save
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SaveWebsiteModal } from "./SaveWebsiteModal";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar = ({ activeView, setActiveView, isCollapsed, setIsCollapsed }: SidebarProps) => {
  const [showSaveModal, setShowSaveModal] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: ShoppingBag },
    { id: "orders", label: "Orders", icon: List },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "websites", label: "My Websites", icon: Eye },
    { id: "templates", label: "Templates", icon: Store },
    { id: "plugins", label: "Plugins", icon: Store },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <div className={cn(
        "fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">PA</span>
                </div>
                <span className="text-xl font-bold">Pocket Angadi</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                isCollapsed && "px-2"
              )}
              onClick={() => setActiveView(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
          
          {/* Save Website Button */}
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start border-green-200 text-green-700 hover:bg-green-50",
              isCollapsed && "px-2"
            )}
            onClick={() => setShowSaveModal(true)}
          >
            <Save className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Save Website</span>}
          </Button>
        </nav>

        {/* Footer Actions */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Link to="/marketplace">
            <Button variant="outline" className={cn("w-full", isCollapsed && "px-2")}>
              <Eye className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">View Marketplace</span>}
            </Button>
          </Link>
        </div>
      </div>

      <SaveWebsiteModal 
        open={showSaveModal} 
        onOpenChange={setShowSaveModal}
        setActiveView={setActiveView}
      />
    </>
  );
};
