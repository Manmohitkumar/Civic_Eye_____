import StandardPackage from "./packages/StandardPackage";
import PremiumPackage from "./packages/PremiumPackage";
import IntroSection from "./packages/IntroSection";
import { standardFeatures, premiumFeatures, missingFeatures } from "./packages/packageData";

const PackagesSection = () => {
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
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">Packages For Every Need</h2>
          <div className="accent-line mx-auto"></div>
        </div>
        
        <IntroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Property Management Package */}
          <StandardPackage 
            standardFeatures={standardFeatures}
            missingFeatures={missingFeatures}
            onLearnMore={scrollToPropertyForm}
          />
          
          {/* Premium Guaranteed Package */}
          <PremiumPackage 
            standardFeatures={standardFeatures}
            premiumFeatures={premiumFeatures}
            onGetStarted={scrollToPropertyForm}
          />
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
