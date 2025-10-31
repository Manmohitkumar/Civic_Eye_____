
import React from "react";
import { LucideIcon } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FAQItemProps {
  value: string;
  icon: LucideIcon;
  question: string;
  answer: string;
}

const FAQItem = ({ value, icon: Icon, question, answer }: FAQItemProps) => {
  return (
    <AccordionItem 
      value={value}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
    >
      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
        <span className="flex items-center">
          <Icon className="h-5 w-5 mr-3 text-[#4A23AD] flex-shrink-0" />
          <span>{question}</span>
        </span>
      </AccordionTrigger>
      <AccordionContent className="px-6 py-4 text-gray-700">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
