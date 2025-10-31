
import { ArrowRight, Shield, Building, Wrench, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const scrollToPropertyForm = () => {
    const element = document.getElementById('property-inquiry-form');
    if (element) {
      const headerOffset = 100; // Adjust this value based on your navbar height plus some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback to scrolling to the top where the form is located
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="section-padding theme-section relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg group relative bg-white">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary)]/5 to-transparent opacity-60"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-10">
              <div className="text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-bold theme-primary-text mb-4">Ready to Maximize Your Rental Income?</h2>
                <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                  Join thousands of satisfied landlords who have transformed their rental experience.
                </p>
                <div className="section-divider mx-auto mt-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <BenefitCard 
                  icon={Shield}
                  title="Financial Security"
                  description="100% rent guarantee with zero default risk"
                />
                <BenefitCard 
                  icon={Building}
                  title="Property Value"
                  description="Regular maintenance and annual refreshing"
                />
                <BenefitCard 
                  icon={Wrench}
                  title="Professional Management"
                  description="Premium tenant screening and property care"
                />
                <BenefitCard 
                  icon={Heart}
                  title="Peace of Mind"
                  description="Zero involvement with 24/7 emergency support"
                />
              </div>
              
              <div className="text-center">
                <Button 
                  className="animate-primary-pulse px-8 py-6 text-lg font-medium group"
                  variant="accent"
                  onClick={scrollToPropertyForm}
                >
                  List Your Property Today
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="mt-4 text-sm text-foreground/60">No obligations. <span className="theme-accent-text font-medium">Free property evaluation.</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute -top-20 -left-20 w-80 h-80 theme-primary-bg opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 theme-accent-bg opacity-5 rounded-full blur-2xl -z-10"></div>
    </section>
  );
};

const BenefitCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[var(--theme-primary)]/20">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 rounded-lg theme-accent-light-bg flex items-center justify-center">
          <Icon size={20} className="theme-accent-text" />
        </div>
        <h3 className="text-lg font-semibold theme-primary-text">{title}</h3>
      </div>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  );
};

export default CallToAction;
