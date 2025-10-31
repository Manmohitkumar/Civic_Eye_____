
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const TenantHero = () => {

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden theme-hero">
      <div className="absolute top-0 right-0 w-1/2 h-full theme-gradient -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center max-w-[1400px] mx-auto">
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight theme-primary-text">
                The Smarter Way to Rent
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mt-4">
                Zero deposit. Seamless move-ins. Rent rewards. One-tap maintenance.
              </p>
              <div className="h-1 w-20 my-4 bg-[var(--theme-accent)] rounded-full opacity-80"></div>
            </div>
            
            <p className="text-lg text-gray-600 max-w-lg">
              Everything renters wish existed - now it does. Join a growing community choosing stress-free living.
            </p>
            
            <div className="pt-2">
              <Button 
                size="lg"
                className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-base group"
                onClick={() => {
                  const phoneNumber = '+918790645442';
                  const message = "Hi! I'm interested in Propico's tenant membership plans. Could you please help me with more information?";
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
                  window.open(whatsappUrl, '_blank');
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in animation-delay-300 w-full pr-0 lg:pr-8">
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                  alt="Modern luxury apartment" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantHero;
