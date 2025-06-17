import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "LUXE has completely transformed my wardrobe. The quality is exceptional and the styles are always on-trend.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b37c?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michael Chen",
      text: "Amazing customer service and fast delivery. The clothing fits perfectly and looks exactly like the photos.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Emma Williams",
      text: "I love the sustainable approach and the attention to detail in every piece. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12">What Our Customers Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-accent fill-current" />
              ))}
            </div>
            
            <blockquote className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 italic">
              "{testimonials[currentIndex].text}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <img 
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600 text-xs sm:text-sm">Verified Customer</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
