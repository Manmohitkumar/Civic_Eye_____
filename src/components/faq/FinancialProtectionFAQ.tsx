
import React from "react";
import { DollarSign, CreditCard } from "lucide-react";
import {
  Accordion
} from "@/components/ui/accordion";
import FAQItem from "./FAQItem";

const FinancialProtectionFAQ = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
        <DollarSign className="h-5 w-5 mr-2" />
        Financial Protection
      </h3>
      <Accordion type="single" collapsible className="space-y-4" defaultValue="item-0">
        <FAQItem 
          value="item-0"
          icon={DollarSign}
          question="How does your rent guarantee actually work?"
          answer="Our rent guarantee ensures you receive your full rent payments regardless of tenant payment issues. If a tenant is late or fails to pay, we cover the full amount. This guarantee is backed by our extensive screening process and financial reserves to ensure you never miss a payment."
        />
        <FAQItem 
          value="item-1"
          icon={CreditCard}
          question="Can I receive my full year's rent in advance?"
          answer="Yes, we offer an annual rent advance option where you can receive your entire year's rental income upfront. This service comes with a small administrative fee but provides you with immediate capital while we handle the month-to-month collection from tenants."
        />
      </Accordion>
    </div>
  );
};

export default FinancialProtectionFAQ;
