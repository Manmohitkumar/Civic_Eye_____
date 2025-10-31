import { useState, useEffect, memo } from "react";
import { ArrowRight, Building, Shield, Clock, MessageSquare, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PropertyInquiryFormHorizontal from "./PropertyInquiryFormHorizontal";
import { Link } from "react-router-dom";
const ValuePropositions = memo(() => <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-6">
    <ValueCard icon={<Building size={22} className="theme-accent-text" />} title="Property Management" description="Full-service property management delivering upto 40% higher net rental returns" />
    <ValueCard icon={<Shield size={22} className="theme-accent-text" />} title="Risk-Free Income" description="100% assured timely rent payment, guaranteed even during vacancies" />
    <ValueCard icon={<Clock size={22} className="theme-accent-text" />} title="Time-Saving" description="We handle everything while you focus on what matters most to you" />
  </div>);
const ValueCard = ({
  icon,
  title,
  description
}) => <div className="flex items-start bg-white/90 p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="w-12 h-12 rounded-full theme-accent-light-bg flex items-center justify-center mr-4 mt-1">
      {icon}
    </div>
    <div>
      <p className="font-medium theme-primary-text text-lg">{title}</p>
      <p className="text-base text-gray-600 mt-1">{description}</p>
    </div>
  </div>;
const NotificationCard = memo(() => <Card className="bg-gray-100/95 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden">
    <CardContent className="p-0">
      <div className="bg-[var(--theme-primary)] px-3 py-1.5 flex items-center">
        <MessageSquare size={14} className="text-white mr-1.5" />
        <p className="text-white text-xs font-medium">Propico</p>
      </div>
      
      <div className="p-3">
        <div className="bg-white rounded-lg p-2.5 shadow-sm border-l-3 border-[var(--theme-accent)]">
          <p className="text-xs text-gray-800 font-medium">Good news!</p>
          <p className="text-base font-bold text-[var(--theme-accent)]">₹50,000<span className="text-xs font-medium">/month</span></p>
          <div className="flex items-center mt-1 text-xs text-gray-600">
            <Clock size={10} className="mr-1 text-[var(--theme-primary)]" />
            <p className="text-[10px]">Guaranteed rent starting in 21 days</p>
          </div>
        </div>
        <div className="mt-1.5 flex justify-end">
          <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-[var(--theme-primary-light)] text-[var(--theme-primary)] rounded-full">Example notification</span>
        </div>
      </div>
    </CardContent>
  </Card>);
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);
  const scrollToPropertyForm = () => {
    const element = document.getElementById('property-inquiry-form');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative pt-20 pb-10 md:pt-28 md:pb-14 overflow-hidden theme-hero" id="property-inquiry">
      <div className="absolute top-0 right-0 w-1/2 h-full theme-gradient -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight theme-primary-text">Guaranteed Rent. y Month. No Exceptns</h1>
              <p className="text-xl md:text-2xl text-gray-600 mt-4">
                Turn uncertainty into predictable income, regardless of vacancies or tenant issues
              </p>
              <div className="h-1 w-20 my-4 bg-[var(--theme-accent)] rounded-full opacity-80"></div>
            </div>
            
            <p className="text-lg text-gray-600 max-w-lg">
              We take on the risk so you don't have to. Guaranteed fixed monthly payments on time, every time
            </p>
            
            <div className="flex flex-wrap gap-4 pt-1">
              <Button className="text-base group bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90" size="lg" variant="default" onClick={scrollToPropertyForm}>
                Register Complaint
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Link to="/rent-predictor">
                <Button className="text-base group" size="lg" variant="secondary">
                  Get Your Rent Estimate
                  <Calculator size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'} animation-delay-300 -mb-16`}>
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60" alt="Modern property for landlords" className="w-full h-auto object-cover" loading="lazy" width="600" height="400" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute bottom-6 right-6 max-w-[220px] transform translate-y-0 hover:translate-y-[-5px] transition-all duration-300">
                  <NotificationCard />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ValuePropositions />
        
        <div className="mt-10 mb-4 max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-6" id="property-inquiry-form">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold theme-primary-text">Get your guaranteed rent offer today</h3>
            <p className="text-gray-600">Fill in your details and we'll contact you with an offer</p>
          </div>
          <PropertyInquiryFormHorizontal ctaLabel="Get My Offer" />
        </div>
      </div>
    </section>;
};
export default Hero;