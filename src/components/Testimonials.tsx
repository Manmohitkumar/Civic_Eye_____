
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  type: 'landlord' | 'tenant';
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Venkatesh M.',
    role: 'Property Owner in Hyderabad',
    content: "Propico has been managing my property and honestly, I would've lost my mind trying to handle all this myself. Coordinating appliances, finding reliable cleaning services, getting lease agreements right, managing tenant move-ins - just thinking about doing this on my own gives me a headache. Their team took over everything and I mean EVERYTHING. The guaranteed rent model is a game-changer - no tenant drama, no vacancy stress, money just lands in my account every month like clockwork. I can finally sleep peacefully knowing professionals are handling it. If you're a property owner in Hyderabad who values your sanity, stop doing this yourself and let Propico handle it.",
    type: 'landlord',
    rating: 5,
  },
  {
    id: 2,
    name: 'J Ramanadhula',
    role: 'NRI Investor in Hyderabad',
    content: 'Propico is incredible! 2 flats in Hyderabad were rented within days of handing them over. Tenants moved in seamlessly and rental income started flowing into account while I\'ve been able to focus things that really matter. They literally handled everything - tenant sourcing and screening, lease agreements, move-in coordination, even liaising with the building society. No stress, no calls during work hours or odd times that I can\'t field, just professional service from start to finish. I honestly never thought I\'d find this level of professionalism and reliability for property management in India. They\'ve completely changed my experience. Highly recommend to anyone who wants hassle-free rental management!',
    type: 'landlord',
    rating: 5,
  },
  {
    id: 3,
    name: 'Kavita P.',
    role: 'Property Owner in Hyderabad',
    content: 'We are thoroughly impressed with Propico\'s service! From start to finish, their team was transparent, efficient, and genuinely invested in finding me the perfect tenants. What truly stood out was their honesty - they didn\'t sugarcoat anything, and I appreciated their straightforward approach. The agents were knowledgeable, responsive, and took the time to understand my needs. Thanks to Propico, it was stress relief as they took the whole responsibility to find a good tenant. If you\'re looking for a reliable and trustworthy property management service, look no further than Propico services.',
    type: 'landlord',
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const landlordTestimonials = testimonials.filter(testimonial => 
    testimonial.type === 'landlord'
  );

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
    const nextIndex = (activeIndex + 1) % landlordTestimonials.length;
    goToTestimonial(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + landlordTestimonials.length) % landlordTestimonials.length;
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
    <section id="testimonials" ref={sectionRef} className="section-padding theme-section relative overflow-hidden py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">What Landlords Say</h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto">
            Hear from property owners who have transformed their rental income with guaranteed rent.
          </p>
        </div>

        <div 
          className={`max-w-4xl mx-auto transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <TestimonialSlider 
            testimonials={landlordTestimonials} 
            activeIndex={activeIndex}
            goToNext={goToNext}
            goToPrev={goToPrev}
            goToTestimonial={goToTestimonial}
          />
        </div>
      </div>
      
      <div className="absolute -top-20 right-10 w-72 h-72 theme-primary-bg opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 theme-accent-bg opacity-10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

const TestimonialSlider = ({ 
  testimonials, 
  activeIndex, 
  goToNext, 
  goToPrev, 
  goToTestimonial 
}: { 
  testimonials: Testimonial[], 
  activeIndex: number,
  goToNext: () => void,
  goToPrev: () => void,
  goToTestimonial: (index: number) => void
}) => {
  return (
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
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="w-full flex-shrink-0 px-4">
      <div className="rounded-2xl p-8 md:p-10 bg-white shadow-lg border border-gray-200 relative">
        <div className="inline-block px-3 py-1 theme-primary-bg bg-opacity-10 rounded-full text-sm font-medium theme-primary-text mb-6">
          {testimonial.type === 'landlord' ? 'Landlord' : 'Tenant'}
        </div>
        
        <div className="absolute top-4 left-6 text-6xl theme-accent-text opacity-10">
          <Quote size={48} strokeWidth={1.5} />
        </div>
        
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
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white shadow-sm">
            {testimonial.image ? (
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full theme-primary-bg bg-opacity-20 flex items-center justify-center">
                <User className="theme-primary-text" size={20} />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold theme-primary-text">{testimonial.name}</p>
            <p className="text-sm text-foreground/70">{testimonial.role}</p>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-6 text-6xl theme-accent-text opacity-10">
          <Quote size={48} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
