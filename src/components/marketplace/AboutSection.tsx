
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Truck, Users, Award } from "lucide-react";

export const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "MSME Focus",
      description: "Exclusively supporting small businesses, artisans, and local sellers"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick delivery across India with real-time tracking"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Supporting families, communities, and local entrepreneurs"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Verified MSME vendors and authentic products only"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">About Us – PocketAngadi</Badge>
          <h2 className="text-3xl font-bold mb-6">Empowering India's MSME Heroes</h2>
          <div className="text-muted-foreground text-lg max-w-4xl mx-auto space-y-4">
            <p>
              At PocketAngadi, we believe that every product has a story — and behind each one is a dreamer, 
              a doer, a local entrepreneur striving to make a difference.
            </p>
            <p>
              We're more than just an e-commerce platform. We're a movement to empower India's MSME heroes — 
              the small businesses, artisans, and local sellers who are the true backbone of our economy. 
              Unlike mass-market giants, we focus exclusively on MSME vendors, giving them the visibility, 
              voice, and value they deserve.
            </p>
            <p>
              When you shop with us, you're not just buying a product — you're supporting a family, 
              a community, a future.
            </p>
            <p className="font-semibold text-primary">
              Together, we're building a marketplace where commerce feels human, where every cart contributes 
              to someone's climb, and where you can shop with pride and purpose.
            </p>
            <p className="font-bold text-xl text-gray-900">
              Let's grow together. Let's shop better. Let's uplift India — one order at a time.
            </p>
          </div>
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
            <p className="text-muted-foreground">MSME Vendors</p>
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
