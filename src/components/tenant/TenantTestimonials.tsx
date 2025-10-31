
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Zahed M',
    role: 'Business Professional in Hyderabad',
    content: "The entire team did a great Job right from the first conversation till setting up my rental agreement and all questions and doubts i had with regards to my new house. I would deffinately recommend Propico for seamless housing. Very helpful to people like me who moved from out of town",
    rating: 5,
  },
  {
    id: 2,
    name: 'Ritik R.',
    role: 'Software Engineer in Hyderabad',
    content: "Smooth onboarding, very well maintained property and they have been present in every phase from visiting to booking to moving in the property. Excellent.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Saurabh A.',
    role: 'Software Engineer in Hyderabad',
    content: "After 25 hectic days of searching for a flat and finding nothing that fit my budget or needs, I came across Propico. These guys made the whole process so smooth—I finally got a flat within my budget, exactly matching my requirements. Couldn't be happier, highly recommend!",
    rating: 5,
  },
  {
    id: 4,
    name: 'Vikram Reddy',
    role: 'Graduate Student in Hyderabad',
    content: "The zero deposit policy allowed me to furnish my apartment properly instead of sleeping on a mattress for months. The digital rental experience makes everything so seamless compared to my previous rental nightmares.",
    rating: 5,
  },
];

const TenantTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const goToTestimonial = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % testimonials.length;
    goToTestimonial(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    goToTestimonial(prevIndex);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(goToNext, 6000);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeIndex]);

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding theme-section relative overflow-hidden py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">Hear From Our Tenants</h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto">
            Real experiences from tenants who've transformed their rental journey with our innovative approach.
          </p>
        </div>

        <div 
          className={`max-w-4xl mx-auto transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Testimonial Slider */}
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </div>
            
            {/* Enhanced Navigation Arrows */}
            <button 
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-foreground hover:bg-white transition-colors focus:outline-none z-10 border border-gray-100 hover:scale-105 transform transition-transform duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-md flex items-center justify-center text-foreground hover:bg-white transition-colors focus:outline-none z-10 border border-gray-100 hover:scale-105 transform transition-transform duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex 
                    ? 'theme-accent-bg w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute -top-20 right-10 w-72 h-72 theme-primary-bg opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 theme-accent-bg opacity-10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="rounded-2xl p-8 md:p-10 bg-white shadow-lg border border-gray-200 relative">
        {/* Quote Icon */}
        <div className="absolute top-4 left-6 text-6xl theme-accent-text opacity-10">
          <Quote size={48} strokeWidth={1.5} />
        </div>
        
        {/* Content */}
        <p className="text-lg text-foreground mb-8 relative z-10 pt-6">{testimonial.content}</p>
        
        {/* Rating - Updated to filled stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < testimonial.rating ? "currentColor" : "none"}
              className={cn(
                i < testimonial.rating 
                  ? "theme-accent-text" 
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
        
        {/* Author */}
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full theme-primary-bg bg-opacity-20 flex items-center justify-center mr-4 border-2 border-white shadow-sm">
            {testimonial.image ? (
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="theme-primary-text" size={20} />
            )}
          </div>
          <div>
            <p className="font-semibold theme-primary-text">{testimonial.name}</p>
            <p className="text-sm text-foreground/70">{testimonial.role}</p>
          </div>
        </div>
        
        {/* Bottom Quote Icon */}
        <div className="absolute bottom-4 right-6 text-6xl theme-accent-text opacity-10">
          <Quote size={48} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default TenantTestimonials;
