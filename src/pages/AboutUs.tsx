
import Navbar from "@/components/Navbar";
import CompanyStorySection from "@/components/CompanyStorySection";
import Footer from "@/components/Footer";
import BreadcrumbNavigation from "@/components/navigation/BreadcrumbNavigation";
import SEOHelmet from "@/components/seo/SEOHelmet";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHelmet 
        title="About Propico - India's Rental Guarantee Property Management Company"
        description="Learn about Propico's mission to provide guaranteed rental income to property owners across India. Discover our story, team, and commitment to stress-free property management."
      />
      <Navbar />
      <div className="pt-20">
        <BreadcrumbNavigation />
        <CompanyStorySection />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
