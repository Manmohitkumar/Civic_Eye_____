
import HowItWorksContent from "./how-it-works/HowItWorksContent";
import { landlordProcessSteps } from "./how-it-works/types";

const HowItWorks = () => {
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

  return (
    <HowItWorksContent
      title="How It Works For Landlords"
      subtitle="Our simple process turns your property into a hassle-free income stream in just four easy steps."
      steps={landlordProcessSteps}
      ctaText="List Your Property"
      ctaLink=""
      onCtaClick={scrollToPropertyForm}
    />
  );
};

export default HowItWorks;
