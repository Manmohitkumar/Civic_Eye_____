import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BreadcrumbNavigation from '@/components/navigation/BreadcrumbNavigation';
import SEOHelmet from '@/components/seo/SEOHelmet';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title="Refund Policy - Propico | Terms & Conditions"
        description="Understand Propico's refund policy for guaranteed rental income services. Learn about eligibility, process, and terms for refunds on our property management services."
      />
      <Navbar />
      <div className="pt-20">
        <BreadcrumbNavigation />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-10">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-[#4A23AD]">
                Propico (Leap To Win Technologies Pvt Ltd) - Refund Policy
              </h1>
              
              <p className="text-base font-medium text-gray-700 mb-8">
                Effective Date: April 11, 2025
              </p>
              
              <div className="prose max-w-none text-gray-800 space-y-8">
                <p>
                  At Propico, we are committed to delivering high-quality technology services. This Refund Policy
                  outlines the terms under which refunds may be issued for our services.
                </p>
                
                <section>
                  <h2 className="text-lg font-bold mb-4 text-[#4A23AD]">1. General Policy</h2>
                  <p>
                    Our services are provided on a fee-for-service basis. We generally do not offer refunds for
                    services that have been delivered. However, we may consider refunds in specific circumstances
                    as outlined below.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-lg font-bold mb-4 text-[#4A23AD]">2. Refund Eligibility</h2>
                  <p className="mb-4">
                    Refunds may be considered under these circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <span className="font-semibold text-[#4A23AD]">Service Cancellation:</span> Cancellation before service delivery may qualify for a refund of
                      pre-paid fees, minus applicable cancellation or administrative costs.
                    </li>
                    <li>
                      <span className="font-semibold text-[#4A23AD]">Billing Errors:</span> We will correct any billing errors and refund overcharged amounts.
                      Please report discrepancies within 30 days.
                    </li>
                    <li>
                      <span className="font-semibold text-[#4A23AD]">Service Quality Issues:</span> If you believe our services did not meet promised standards,
                      please contact us to discuss your concerns. We'll review each case individually to
                      determine appropriate resolution.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-lg font-bold mb-4 text-[#4A23AD]">3. Non-Refundable Items</h2>
                  <p className="mb-4">
                    The following are non-refundable:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <span className="font-semibold text-[#4A23AD]">Tenant Placement Fees:</span> Once tenants have moved-in to the property
                    </li>
                    <li>
                      <span className="font-semibold text-[#4A23AD]">Government-Related Charges:</span> Any fees incurred for registration, licensing, permits,
                      compliance documentation, or other government-related processes are non-refundable
                      once submitted.
                    </li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-lg font-bold mb-4 text-[#4A23AD]">4. Refund Process</h2>
                  <p className="mb-4">
                    To request a refund:
                  </p>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>Contact our customer support team with details about your request</li>
                    <li>Provide any relevant documentation supporting your claim</li>
                    <li>Allow up to 15 business days for review</li>
                    <li>If approved, refund will be processed and credited back to original payment method within 15 business days.</li>
                  </ol>
                </section>
                
                <section>
                  <h2 className="text-lg font-bold mb-4 text-[#4A23AD]">5. Policy Updates</h2>
                  <p>
                    We reserve the right to modify this policy. Changes take effect immediately upon posting.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-lg font-bold mb-4 text-[#4A23AD]">6. Contact Information</h2>
                  <p>
                    Propico (Leap To Win Technologies Pvt. Ltd.)<br />
                    Email: support@propico.in
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
