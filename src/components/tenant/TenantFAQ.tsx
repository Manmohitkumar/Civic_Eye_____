
import React from "react";
import { HelpCircle, Home, Clock, CreditCard, Shield, Award } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const TenantFAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-3">
              <HelpCircle className="mr-2 h-8 w-8 text-[var(--theme-primary)]" />
              <h2 className="text-3xl md:text-4xl font-bold theme-primary-text">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Everything you need to know about renting with us
            </p>
          </div>

          {/* Application Process Category */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Application Process
            </h3>
            <Accordion type="single" collapsible className="space-y-4" defaultValue="item-0">
              <AccordionItem 
                key={0} 
                value={`item-0`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
                  <span className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-[var(--theme-primary)] flex-shrink-0" />
                    <span>What documents do I need to apply?</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  You'll need to provide proof of identity (Aadhar card, passport, or driver's license), proof of income (salary slips or bank statements for the past 3 months), employment verification, and references from previous landlords. Our digital application makes uploading these documents simple and secure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Membership & Fees Category */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Membership & Fees
            </h3>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem 
                key={1} 
                value={`item-1`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
                  <span className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-[var(--theme-primary)] flex-shrink-0" />
                    <span>How is the monthly service fee calculated?</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  Our monthly service fee is calculated as a percentage of your rent based on the membership plan you choose: Basic (2%), Premium (6%), or Luxury (10%), inclusive of GST. This fee covers your deposit reduction/elimination benefit, maintenance coordination with guaranteed response times, rewards program access, and dedicated property manager. You will be eligible for no claim bonuses at each renewal.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem 
                key={4} 
                value={`item-4`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
                  <span className="flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-[var(--theme-primary)] flex-shrink-0" />
                    <span>Why would a landlord agree to zero deposit?</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  Landlords partner with us because we provide them guaranteed rental income and property protection. If your landlord requires a deposit, we handle it entirely—we provide the deposit to them on your behalf and take on all the risk of recovering it at the end of your lease. You simply pay your monthly subscription fee and enjoy hassle-free renting without worrying about large upfront deposits or dealing with deposit refund processes.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Services & Benefits Category */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Services & Benefits
            </h3>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem 
                key={2} 
                value={`item-2`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
                  <span className="flex items-center">
                    <Home className="h-5 w-5 mr-3 text-[var(--theme-primary)] flex-shrink-0" />
                    <span>How does maintenance work?</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  Simply submit a maintenance request through our app or WhatsApp your property manager. Based on your membership level, we guarantee response times of 24 hours (Basic), 12 hours (Premium), or 2 hours (Luxury). We coordinate and facilitate all maintenance work so you don't have to deal with the hassle of finding vendors or managing repairs. Please note that actual maintenance costs are your responsibility—we handle the coordination to make the process seamless for you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem 
                key={3} 
                value={`item-3`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
                  <span className="flex items-center">
                    <Award className="h-5 w-5 mr-3 text-[var(--theme-primary)] flex-shrink-0" />
                    <span>How do rewards work?</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  You earn 1 point for every ₹100 of rent paid on time, with multipliers based on your membership level (1x for Basic, 2x for Premium, 3x for Luxury). Each point is worth ₹1. Additional points can be earned through referrals (2,000 points per referral) and lease renewals (5,000 points bonus). Points can be redeemed for rent credits, partner vouchers, utility payments, or home services through our app.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Property & Liability Category */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 theme-primary-text flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Property & Liability
            </h3>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem 
                key={5} 
                value={`item-5`}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 theme-primary-text font-medium text-left text-lg">
                  <span className="flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-[var(--theme-primary)] flex-shrink-0" />
                    <span>What happens if I damage something in the property?</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700">
                  We conduct thorough move-in and move-out inspections to document the property's condition. For normal wear and tear, you won't be charged. For damages beyond normal wear and tear, we'll assess the cost of repairs and bill you accordingly. Only Luxury members receive the exclusive "pack-and-leave" service, which includes deep cleaning and minor repair coordination as part of your premium exit experience.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-12 bg-purple-50 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between border border-purple-100">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-xl font-bold theme-primary-text mb-2">Still have questions?</h3>
              <p className="text-gray-700">Our team is ready to answer all your questions about renting with us</p>
            </div>
            <Button 
              variant="accent" 
              className="w-full sm:w-auto px-5 py-3 whitespace-nowrap"
              onClick={() => {
                const phoneNumber = '+918790645442';
                const message = "Hi! I have some questions about Propico's tenant services. Could you please help me?";
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantFAQ;
