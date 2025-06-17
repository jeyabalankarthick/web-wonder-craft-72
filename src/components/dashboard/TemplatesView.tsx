
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TemplatesView = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const navigate = useNavigate();

  const templates = [
    {
      id: "modern",
      name: "Modern Store",
      description: "Clean and contemporary design perfect for tech products",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Technology",
      price: "Free"
    },
    {
      id: "minimal",
      name: "Minimal Shop",
      description: "Simple and elegant layout for fashion and lifestyle brands",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      category: "Fashion",
      price: "Pro"
    },
    {
      id: "vibrant",
      name: "Vibrant Market",
      description: "Colorful and dynamic design for creative products",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop",
      category: "Creative",
      price: "Pro"
    },
    {
      id: "luxury",
      name: "Luxury Boutique",
      description: "Premium design for high-end products and services",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
      category: "Luxury",
      price: "Enterprise"
    }
  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template selected",
      description: "Your store design has been updated successfully.",
    });
  };

  const handleCardClick = (templateId: string) => {
    // Navigate to edit page for minimal template, preview for others
    if (templateId === "minimal") {
      navigate("/index");
    } else {
      navigate(`/templates/${templateId}`);
    }
  };

  const handleUseTemplate = (templateId: string) => {
    // For minimal template, go to edit mode
    if (templateId === "minimal") {
      navigate("/index");
    } else {
      handleSelectTemplate(templateId);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Store Templates</h1>
        <p className="text-muted-foreground">Choose from our collection of professionally designed templates</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${selectedTemplate === template.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleCardClick(template.id)}
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={template.price === "Free" ? "default" : "secondary"}>
                    {template.price}
                  </Badge>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-primary/20 rounded-t-lg flex items-center justify-center">
                    <Badge className="bg-primary text-primary-foreground">
                      Currently Active
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (template.id === "minimal") {
                        navigate("/index");
                      } else {
                        navigate(`/templates/${template.id}`);
                      }
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseTemplate(template.id);
                    }}
                    disabled={selectedTemplate === template.id && template.id !== "minimal"}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {template.id === "minimal" ? "Edit Template" : (selectedTemplate === template.id ? "Active" : "Use Template")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Store Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Want to create your own design?</p>
              <p className="text-sm text-muted-foreground">Use our drag-and-drop builder to customize every aspect of your store</p>
            </div>
            <Button>
              Open Builder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
