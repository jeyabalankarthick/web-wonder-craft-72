
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, ExternalLink, Globe } from "lucide-react";
import { useWebsite } from "@/context/WebsiteContext";

interface WebsitesViewProps {
  setActiveView: (view: string) => void;
}

export const WebsitesView = ({ setActiveView }: WebsitesViewProps) => {
  const { websites, deleteWebsite, setActiveWebsite } = useWebsite();

  console.log('Websites in view:', websites);

  const handleViewWebsite = (website: any) => {
    console.log('Viewing website:', website);
    setActiveWebsite(website.id);
    // Open the live website in a new tab
    const liveUrl = `/live/${website.url}`;
    window.open(liveUrl, '_blank');
  };

  const handleDeleteWebsite = (id: string) => {
    if (confirm("Are you sure you want to delete this website?")) {
      deleteWebsite(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Websites</h1>
          <p className="text-muted-foreground">View and manage your published websites</p>
        </div>
        <Button onClick={() => setActiveView('templates')}>
          <Globe className="w-4 h-4 mr-2" />
          Create New Website
        </Button>
      </div>

      {websites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Globe className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No websites yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first website using our templates
            </p>
            <Button onClick={() => setActiveView('templates')}>
              Browse Templates
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <Card key={website.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{website.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">/live/{website.url}</p>
                  </div>
                  <div className="flex space-x-1">
                    {website.isActive && (
                      <Badge variant="default" className="text-xs">Live</Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {website.template}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(website.createdAt).toLocaleDateString()}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Hero Title:</span> {website.content.heroTitle}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Logo:</span> {website.content.logoText}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleViewWebsite(website)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Live
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteWebsite(website.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
