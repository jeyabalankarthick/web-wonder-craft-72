
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Wrench, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="text-center max-w-md mx-auto px-6 animate-fade-in">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative animate-bounce">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-ping">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">Under Construction</h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed animate-fade-in-up animation-delay-200">
            We are currently working on this section. Our team is building something 
            great and it will be available soon. Thank you for your patience.
          </p>
          <div className="bg-card border rounded-lg p-4 mb-6 animate-fade-in-up animation-delay-400">
            <p className="text-sm text-muted-foreground mb-2">Status:</p>
            <p className="text-primary font-semibold">Coming Soon</p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/')} 
          className="px-8 py-3 font-medium hover:scale-105 transition-transform duration-200 animate-fade-in-up animation-delay-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        
        <div className="mt-8 text-xs text-muted-foreground animate-fade-in-up animation-delay-800">
          We appreciate your understanding while we improve our services
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
