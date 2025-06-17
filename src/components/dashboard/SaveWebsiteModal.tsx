
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useWebsite } from "@/context/WebsiteContext";

interface SaveWebsiteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setActiveView?: (view: string) => void;
}

export const SaveWebsiteModal = ({ open, onOpenChange, setActiveView }: SaveWebsiteModalProps) => {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const { addWebsite, setActiveWebsite } = useWebsite();
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a website name",
        variant: "destructive"
      });
      return;
    }

    const urlSlug = websiteUrl.trim() || websiteName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const newWebsite = addWebsite({
      name: websiteName,
      url: urlSlug,
      template: 'fashion',
      content: {
        heroTitle: 'Welcome to Our Store',
        heroSubtitle: 'Discover amazing products',
        logoText: 'FASHION'
      }
    });

    setActiveWebsite(newWebsite.id);

    toast({
      title: "Website Saved Successfully!",
      description: `Your website "${websiteName}" has been added to My Websites.`,
    });
    
    setWebsiteName("");
    setWebsiteUrl("");
    onOpenChange(false);
    
    // Redirect to My Websites tab instead of live website
    if (setActiveView) {
      setActiveView('websites');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Save to My Websites</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label htmlFor="websiteName">Website Name</Label>
            <Input
              id="websiteName"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="Enter website name"
              required
            />
          </div>

          <div>
            <Label htmlFor="websiteUrl">Custom URL (Optional)</Label>
            <Input
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="my-store-name"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your website will be available at: /live/{websiteUrl || websiteName.toLowerCase().replace(/\s+/g, '-')}
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save to My Websites
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
