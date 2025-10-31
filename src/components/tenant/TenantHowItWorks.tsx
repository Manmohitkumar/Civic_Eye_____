
import HowItWorksContent from "../how-it-works/HowItWorksContent";
import { tenantProcessSteps } from "../how-it-works/types";

const TenantHowItWorks = () => {
  const handleApplyClick = () => {
    const phoneNumber = '+918790645442';
    const message = "Hi! I'd like to apply for Propico's tenant membership. Could you please help me get started with the application process?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <HowItWorksContent
      title="How It Works For Tenants"
      subtitle="Start your hassle-free renting journey in just four simple steps."
      steps={tenantProcessSteps}
      ctaText="Apply Now"
      ctaLink=""
      onCtaClick={handleApplyClick}
    />
  );
};

export default TenantHowItWorks;
