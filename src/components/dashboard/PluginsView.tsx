
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Puzzle, Download, Settings, ExternalLink } from "lucide-react";

export const PluginsView = () => {
  const plugins = [
    {
      name: "Payment Gateway",
      description: "Integrate multiple payment options",
      status: "In Progress",
      category: "Payments"
    },
    {
      name: "Email Marketing",
      description: "Automated email campaigns",
      status: "Coming Soon",
      category: "Marketing"
    },
    {
      name: "Analytics Dashboard",
      description: "Advanced sales analytics",
      status: "In Progress",
      category: "Analytics"
    },
    {
      name: "Social Media Integration",
      description: "Connect with social platforms",
      status: "Coming Soon",
      category: "Social"
    },
    {
      name: "Inventory Management",
      description: "Advanced stock management",
      status: "In Progress",
      category: "Inventory"
    },
    {
      name: "SEO Tools",
      description: "Search engine optimization",
      status: "Coming Soon",
      category: "SEO"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "default";
      case "Coming Soon": return "secondary";
      case "Available": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Plugins</h1>
        <p className="text-muted-foreground">Extend your store functionality with powerful plugins</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plugins.map((plugin, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Puzzle className="w-8 h-8 text-primary" />
                <Badge variant={getStatusColor(plugin.status)}>
                  {plugin.status}
                </Badge>
              </div>
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{plugin.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{plugin.category}</Badge>
                <div className="flex space-x-2">
                  {plugin.status === "Available" ? (
                    <>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Install
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" variant="ghost" disabled>
                      <Settings className="w-4 h-4 mr-2" />
                      {plugin.status === "In Progress" ? "Developing" : "Notify Me"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plugin Development Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center py-8">
              <Puzzle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">We're Working Hard!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our team is actively developing these plugins to enhance your store experience. 
                Check back soon for updates!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
