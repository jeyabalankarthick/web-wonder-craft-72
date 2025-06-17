
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest deals and updates.",
      });
      setEmail("");
    }
  };

  return (
    <div className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Mail className="h-6 w-6" />
          <Badge variant="secondary">Newsletter</Badge>
        </div>
        <h2 className="text-3xl font-bold mb-4">Stay Updated with Best Deals</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Subscribe to our newsletter and get exclusive discounts, early access to sales, 
          and the latest product updates delivered to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background text-foreground"
            required
          />
          <Button type="submit" variant="secondary" className="whitespace-nowrap">
            <Gift className="w-4 h-4 mr-2" />
            Subscribe
          </Button>
        </form>

        <p className="text-sm opacity-75 mt-4">
          Join over 100,000+ subscribers. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};
