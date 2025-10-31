
import React from "react";
import { Building } from "lucide-react";
import {
  Accordion
} from "@/components/ui/accordion";
import FAQItem from "./FAQItem";

const AboutCompanyFAQ = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
        <Building className="h-5 w-5 mr-2" />
        About Our Company
      </h3>
      <Accordion type="single" collapsible className="space-y-4">
        <FAQItem 
          value="item-6"
          icon={Building}
          question="How long has your company been managing properties?"
          answer="Our team has over 15 years of property management experience across residential and commercial properties. We were founded in 2010 and have grown to manage over 500 properties across major Indian cities. Our management team combines expertise from real estate, finance, and technology backgrounds to provide innovative property management solutions."
        />
        <FAQItem 
          value="item-8"
          icon={Building}
          question="What motivated the founders to start this company?"
          answer="Our founders were property owners themselves who experienced firsthand the challenges of rental management—unpredictable income, maintenance headaches, and tenant issues. After searching for solutions and finding only fragmented services with hidden costs, they decided to create the comprehensive property management service they wished existed. Propico was built by landlords for landlords, combining technology with personalized service to address the real pain points property owners face every day."
        />
      </Accordion>
    </div>
  );
};

export default AboutCompanyFAQ;
