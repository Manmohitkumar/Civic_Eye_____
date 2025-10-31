
import React from "react";
import { Home, Award } from "lucide-react";
import {
  Accordion
} from "@/components/ui/accordion";
import FAQItem from "./FAQItem";

const PropertyManagementFAQ = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
        <Home className="h-5 w-5 mr-2" />
        Property Management
      </h3>
      <Accordion type="single" collapsible className="space-y-4">
        <FAQItem 
          value="item-2"
          icon={Award}
          question="What makes your tenant screening process better than others?"
          answer="Our premium screening goes beyond standard credit and background checks. We use advanced behavioral analytics, employment verification, rental history analysis, and character references. This comprehensive approach has resulted in a 98% tenant retention rate and minimal payment issues."
        />
        <FAQItem 
          value="item-3"
          icon={Home}
          question="What maintenance services are included in your fee?"
          answer="Our standard package includes all routine maintenance, 24/7 emergency response, and annual preventative maintenance inspections. We handle everything from small repairs to coordinating with contractors for larger issues, all while keeping you informed through our digital dashboard."
        />
        <FAQItem 
          value="item-7"
          icon={Award}
          question="Why is the Premium package worth the extra cost?"
          answer="Our Premium package provides significantly higher returns and peace of mind. While it costs ₹5,000 more per month than our Standard package, it typically delivers ₹15,000-20,000 in additional monthly income through higher rental rates, faster tenant placement, and reduced vacancy. Premium clients also receive priority maintenance service, quarterly property inspections, and complimentary annual deep cleaning services—all of which extend your property's lifespan and maintain its market value."
        />
      </Accordion>
    </div>
  );
};

export default PropertyManagementFAQ;
