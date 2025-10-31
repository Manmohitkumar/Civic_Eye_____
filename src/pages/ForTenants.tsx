
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TenantHero from "@/components/tenant/TenantHero";
import TenantBenefits from "@/components/tenant/TenantBenefits";
import TenantMembershipPlans from "@/components/tenant/TenantMembershipPlans";
import TenantHowItWorks from "@/components/tenant/TenantHowItWorks";
// import TenantMaintenance from "@/components/tenant/TenantMaintenance";
import TenantRewards from "@/components/tenant/TenantRewards";
// import TenantSavingsCalculator from "@/components/tenant/TenantSavingsCalculator";
import TenantFAQ from "@/components/tenant/TenantFAQ";
import TenantTestimonials from "@/components/tenant/TenantTestimonials";
import TenantCallToAction from "@/components/tenant/TenantCallToAction";

const ForTenants = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        <TenantHero />
        <TenantBenefits />
        <TenantMembershipPlans />
        <TenantHowItWorks />
        {/* <TenantMaintenance /> */}
        <TenantRewards />
        {/* <TenantSavingsCalculator /> */}
        <TenantFAQ />
        <TenantTestimonials />
        <TenantCallToAction />
        <Footer />
      </div>
      <WhatsAppButton message="Hi! I'm interested in Propico's tenant membership plans. Could you please help me with more information?" />
    </div>
  );
};

export default ForTenants;
