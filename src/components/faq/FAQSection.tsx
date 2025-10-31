
import React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FinancialProtectionFAQ from "./FinancialProtectionFAQ";
import PropertyManagementFAQ from "./PropertyManagementFAQ";
import ProcessTimingFAQ from "./ProcessTimingFAQ";
import AboutCompanyFAQ from "./AboutCompanyFAQ";

const FAQSection = () => {
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
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-3">
              <HelpCircle className="mr-2 h-8 w-8 text-purple-600" />
              <h2 className="text-3xl md:text-4xl font-bold theme-primary-text">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Everything you need to know about our property management services
            </p>
          </div>

          <FinancialProtectionFAQ />
          <PropertyManagementFAQ />
          <ProcessTimingFAQ />
          <AboutCompanyFAQ />

          <div className="mt-12 bg-purple-50 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between border border-purple-100">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-xl font-bold theme-primary-text mb-2">Still have questions?</h3>
              <p className="text-gray-700">Our team is ready to answer all your questions about property management</p>
            </div>
            <Button 
              variant="accent"
              className="w-full sm:w-auto whitespace-nowrap"
              onClick={scrollToPropertyForm}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
