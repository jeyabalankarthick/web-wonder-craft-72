
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Smartphone,
  CreditCard,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

export const MarketplaceFooter = () => {
  const footerSections = [
    {
      title: "Get to Know Us",
      links: [
        { label: "About Pocket Angadi", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press Releases", href: "#" },
        { label: "Investor Relations", href: "#" }
      ]
    },
    {
      title: "Make Money with Us",
      links: [
        { label: "Sell on Pocket Angadi", href: "/dashboard" },
        { label: "Seller Central", href: "#" },
        { label: "Advertise Your Products", href: "#" },
        { label: "Become an Affiliate", href: "#" }
      ]
    },
    {
      title: "Let Us Help You",
      links: [
        { label: "Your Account", href: "#" },
        { label: "Returns Centre", href: "#" },
        { label: "Customer Service", href: "#" },
        { label: "Report a Product", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Back to Top */}
      <div className="bg-gray-800 text-center py-3">
        <Button 
          variant="ghost" 
          className="text-white hover:text-white hover:bg-gray-700"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </Button>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">PA</span>
              </div>
              <span className="text-xl font-bold">Pocket Angadi</span>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              India's trusted online marketplace connecting millions of buyers and sellers. 
              Shop with confidence, sell with ease.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Contact & App Download */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1800-123-4567 (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@pocketangadi.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Bangalore, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Mobile Apps */}
          <div>
            <h3 className="font-semibold mb-4">Download Our App</h3>
            <div className="space-y-3">
              <Button variant="outline" className="justify-start w-full border-gray-600 text-gray-300 hover:text-white">
                <Smartphone className="h-4 w-4 mr-2" />
                Get it on Google Play
              </Button>
              <Button variant="outline" className="justify-start w-full border-gray-600 text-gray-300 hover:text-white">
                <Smartphone className="h-4 w-4 mr-2" />
                Download on App Store
              </Button>
            </div>
          </div>

          {/* Payment & Security */}
          <div>
            <h3 className="font-semibold mb-4">Secure Payment</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <CreditCard className="h-4 w-4" />
                <span>Multiple Payment Options</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Shield className="h-4 w-4" />
                <span>100% Secure Transactions</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                We accept Visa, Mastercard, UPI, Net Banking, Wallets and more.
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Pocket Angadi. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
