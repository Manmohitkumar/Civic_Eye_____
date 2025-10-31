
import React from "react";
import { Clock, Home } from "lucide-react";
import {
  Accordion
} from "@/components/ui/accordion";
import FAQItem from "./FAQItem";

const ProcessTimingFAQ = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Process & Timing
      </h3>
      <Accordion type="single" collapsible className="space-y-4">
        <FAQItem 
          value="item-4"
          icon={Clock}
          question="How quickly can you find new tenants for my property?"
          answer="On average, our properties experience only 15 days of vacancy per year compared to the industry average of 43 days. We maintain a waiting list of pre-screened qualified tenants and begin marketing your property before the current tenant moves out to minimize vacancy periods."
        />
        <FAQItem 
          value="item-5"
          icon={Home}
          question="What happens if there's property damage beyond normal wear and tear?"
          answer="We conduct thorough move-in and move-out inspections with detailed documentation. If damage occurs beyond normal wear and tear, we handle the entire process of documentation, tenant communication, and repairs. Our tenant security deposits and screening process minimize these occurrences."
        />
      </Accordion>
    </div>
  );
};

export default ProcessTimingFAQ;
