
import { Wrench, MessageSquare, Calendar, Check } from "lucide-react";

const TenantMaintenance = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
            Maintenance & Support
          </h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We take care of your home so you can focus on living your best life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <ServiceCard
            icon={Wrench}
            title="24/7 Maintenance Support"
            description="Our professional maintenance team is available 24/7 to address any issues, from minor repairs to emergencies."
            features={[
              "Priority responses for members",
              "Professional technicians",
              "Digital request tracking"
            ]}
          />

          <ServiceCard
            icon={MessageSquare}
            title="WhatsApp Property Manager"
            description="Connect with your dedicated property manager via WhatsApp for quick responses to all your queries and concerns."
            features={[
              "Instant messaging support",
              "Document sharing",
              "Voice & video call options"
            ]}
          />

          <ServiceCard
            icon={Calendar}
            title="Regular Inspections"
            description="Scheduled property inspections ensure your home is always in optimal condition, preventing small issues from becoming big problems."
            features={[
              "Preventative maintenance",
              "Digital inspection reports",
              "Seasonal property checks"
            ]}
          />
        </div>

        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold theme-primary-text mb-2">Our Maintenance Promise</h3>
            <p className="text-gray-600">We guarantee response times based on your membership level</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ResponseCard
              tier="Basic"
              response="Response within 24 hours"
              bgColor="bg-primary-light"
            />
            <ResponseCard
              tier="Premium"
              response="Response within 12 hours"
              bgColor="bg-primary-light"
            />
            <ResponseCard
              tier="Luxury"
              response="Response within 6 hours"
              bgColor="bg-primary-light"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, features }: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}) => (
  <div className="bg-white/95 rounded-xl p-8 shadow-lg border border-gray-100 h-full transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
    <div className="flex flex-col items-center mb-6">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-primary-light border-2 border-primary-light">
        <Icon className="w-10 h-10 theme-primary-text" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-center theme-primary-text">{title}</h3>
      <div className="h-1 w-16 bg-[var(--theme-primary)] rounded-full mt-2 mb-4"></div>
    </div>
    <p className="text-gray-700 text-center mb-6">{description}</p>
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <Check className="h-5 w-5 theme-accent-text mr-2 flex-shrink-0" />
          <span className="text-gray-700 text-sm">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const ResponseCard = ({ tier, response, bgColor }: {
  tier: string;
  response: string;
  bgColor: string;
}) => (
  <div className={`p-6 rounded-lg ${bgColor} border border-primary-light text-center`}>
    <h4 className="font-bold text-lg theme-primary-text mb-2">{tier}</h4>
    <p className="text-gray-700">{response}</p>
  </div>
);

export default TenantMaintenance;
