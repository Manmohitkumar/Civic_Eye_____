import { ShieldCheck, Wrench, DollarSign, Building, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const GuaranteeSection = () => {
  return (
    <section id="triple-guarantee" className="py-16 theme-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">Our Four-Part Guarantee Program</h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We eliminate all the risks of being a landlord with our comprehensive guarantees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <GuaranteeCard
            icon={DollarSign}
            title="Financial Protection"
            description="Receive your full rental payment on time, every month. Your rental income is guaranteed against property vacancy and tenant defaults, protecting your investment against financial loss."
            iconColor="theme-primary-text"
            bgColor="bg-primary-light"
            borderColor="border-primary-light"
            badgeColor="bg-[var(--theme-primary)]"
            glowColor="shadow-primary-glow"
          />
          
          <GuaranteeCard
            icon={Wrench}
            title="Maintenance Excellence"
            description="All maintenance is performed to professional standards with complete transparency, protecting your property's long-term value. You'll never need to deal with middle-of-the-night emergencies."
            iconColor="theme-primary-text"
            bgColor="bg-primary-light"
            borderColor="border-primary-light"
            badgeColor="bg-[var(--theme-primary)]"
            glowColor="shadow-primary-glow"
          />
          
          <GuaranteeCard
            icon={Building}
            title="Property Condition"
            description="Your property will be returned to you in its original condition, accounting for normal wear and tear, or we cover the cost of restoration. Our meticulous care ensures your property remains well maintained."
            iconColor="theme-primary-text"
            bgColor="bg-primary-light"
            borderColor="border-primary-light" 
            badgeColor="bg-[var(--theme-primary)]"
            glowColor="shadow-primary-glow"
          />

          <GuaranteeCard
            icon={FileCheck}
            title="Tenant Quality"
            description="We are so confident that if a tenant we place causes damage or defaults, We bear the financial responsibility. Rest easy knowing we will find someone who will love your home as much as you do."
            iconColor="theme-primary-text"
            bgColor="bg-primary-light"
            borderColor="border-primary-light" 
            badgeColor="bg-[var(--theme-primary)]"
            glowColor="shadow-primary-glow"
          />
        </div>
      </div>
    </section>
  );
};

const GuaranteeCard = ({
  icon: Icon,
  title,
  description,
  iconColor,
  bgColor,
  borderColor,
  badgeColor,
  glowColor,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  badgeColor: string;
  glowColor: string;
}) => {
  return (
    <div className={`bg-white/95 rounded-xl p-8 shadow-lg border-2 ${borderColor} h-full transform transition-all duration-300 hover:scale-[1.03] hover:${glowColor} relative overflow-hidden`}>
      {/* Badge with glow effect */}
      <div className="absolute -top-3 -right-3">
        <div className={`p-3 rounded-full ${badgeColor} shadow-lg flex items-center justify-center animate-primary-pulse`}>
          <ShieldCheck className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
      </div>
      
      {/* Subtle diagonal background stripe */}
      <div className={`absolute top-0 right-0 h-32 w-32 -mr-10 -mt-10 rotate-45 opacity-10 ${badgeColor}`}></div>
      
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mb-2 transition-all duration-300", bgColor, borderColor, "border-2")}>
          <Icon className={cn("w-10 h-10", iconColor)} strokeWidth={1.5} />
        </div>
        <h3 className={`text-xl font-bold text-center mt-4 mb-1 theme-primary-text`}>{title}</h3>
        <div className={`h-1 w-16 ${badgeColor} rounded-full mt-1 mb-2`}></div>
      </div>
      <p className="text-gray-700 text-center relative z-10">{description}</p>
      
      {/* 100% Guarantee indicator */}
      <div className="mt-5 text-center">
        <span className={`text-xs font-semibold uppercase tracking-wider theme-primary-text`}>100% Guaranteed</span>
      </div>
    </div>
  );
};

export default GuaranteeSection;
