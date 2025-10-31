
import {
  Wallet,
  Gift,
  Home,
  TrendingUp,
} from "lucide-react";

const TenantBenefits = () => {
  return (
    <section className="py-16 theme-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
            Why Modern Renters Choose Us
          </h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the advantages of hassle-free renting designed for your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <BenefitCard
            icon={Wallet}
            title="Financial Freedom"
            benefits={[
              "Zero security deposit required",
              "Flexible payment options",
              "Transparent pricing - no hidden costs"
            ]}
          />

          <BenefitCard
            icon={Gift}
            title="Rewards Program"
            benefits={[
              "Earn points on every rent payment",
              "Redeem for rent credits & vouchers",
              "Exclusive partner discounts"
            ]}
          />

          <BenefitCard
            icon={Home}
            title="Premium Living Experience"
            benefits={[
              "24/7 maintenance support",
              "Verified quality properties",
              "Dedicated property manager"
            ]}
          />

          <BenefitCard
            icon={TrendingUp}
            title="Build Your Future"
            benefits={[
              "Build strong rental history",
              "Credit score improvement assistance",
              "Path to homeownership guidance"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({ icon: Icon, title, benefits }: {
  icon: React.ElementType;
  title: string;
  benefits: string[];
}) => (
  <div className="bg-white/95 rounded-xl p-8 shadow-lg border border-gray-100 h-full transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
    <div className="flex flex-col items-center mb-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-primary-light border-2 border-primary-light">
        <Icon className="w-10 h-10 theme-primary-text" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-center theme-primary-text">{title}</h3>
      <div className="h-1 w-16 bg-[var(--theme-primary)] rounded-full mt-2"></div>
    </div>
    <ul className="space-y-2 text-gray-700">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
          <span className="mr-2 theme-accent-text">•</span>
          <span>{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TenantBenefits;
