
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, Users, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "100% secure payment processing with buyer protection guarantee"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick delivery across India with real-time tracking"
    },
    {
      icon: Users,
      title: "Customer Support",
      description: "24/7 customer service to help with all your needs"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Verified sellers and authentic products only"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">About Pocket Angadi</Badge>
          <h2 className="text-3xl font-bold mb-4">Your Trusted Online Marketplace</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Pocket Angadi connects buyers and sellers across India, offering a secure platform 
            for quality products at the best prices. Join millions of satisfied customers today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-12 text-center">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">10M+</h3>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">50K+</h3>
            <p className="text-muted-foreground">Verified Sellers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">1M+</h3>
            <p className="text-muted-foreground">Products Listed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
