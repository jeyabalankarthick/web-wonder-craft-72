
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Globe, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWebsite } from "@/context/WebsiteContext";
import { SaveWebsiteModal } from "./SaveWebsiteModal";

interface DashboardHeaderProps {
  setActiveView?: (view: string) => void;
}

export const DashboardHeader = ({ setActiveView }: DashboardHeaderProps) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { isLiveWebsiteActive } = useWebsite();

  return (
    <>
      <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Live Website Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isLiveWebsiteActive ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSaveModal(true)}
              className="relative overflow-hidden"
            >
              <div className="flex items-center space-x-2">
                {isLiveWebsiteActive ? (
                  <>
                    <Globe className="h-4 w-4" />
                    <span>Live Website</span>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    <span>Save as Website</span>
                  </>
                )}
              </div>
              {isLiveWebsiteActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer -skew-x-12"></div>
              )}
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Store Owner</p>
              <p className="text-xs text-muted-foreground">owner@store.com</p>
            </div>
          </div>
        </div>
      </header>

      <SaveWebsiteModal 
        open={showSaveModal} 
        onOpenChange={setShowSaveModal}
        setActiveView={setActiveView}
      />

      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}
      </style>
    </>
  );
};
