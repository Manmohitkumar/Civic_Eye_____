
import React from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
              We'll handle everything
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Request an offer to learn about our comprehensive services
            </p>
            <div className="section-divider mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-4 rounded-lg transition-all hover:bg-white hover:shadow-md group"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full theme-accent-light-bg flex items-center justify-center">
                  <Check className="h-5 w-5 theme-accent-text" />
                </div>
                <div>
                  <h3 className="font-medium theme-primary-text text-lg">{service}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold theme-primary-text mb-3">Need a custom solution?</h3>
                <p className="text-gray-600">
                  Our team can create a tailored property management plan to meet your specific needs.
                </p>
              </div>
              <Button variant="accent" asChild>
                <Link to="/list-property">
                  Contact Us Today
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const services = [
  "Effective marketing and listing",
  "Professional property photos",
  "On-demand showings",
  "Thorough tenant screening",
  "Tenant lease agreement",
  "Move-in / out walkthroughs",
  "Rent collection and distribution",
  "Annual inspections",
  "Maintenance and repairs",
  "Eviction handling"
];

export default ServicesSection;
