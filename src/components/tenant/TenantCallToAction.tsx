
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Gift, Headphones } from "lucide-react";

const TenantCallToAction = () => {

  return (
    <section className="py-20 theme-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
              Ready to Transform Your Rental Experience?
            </h2>
            <div className="accent-line mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600 mb-8">
              Get in touch with us to experience stress-free, rewarding renting
            </p>
            <Button 
              size="lg"
              className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 group"
              onClick={() => {
                const phoneNumber = '+918790645442';
                const message = "Hi! I'm interested in Propico's tenant services. Could you please help me get started?";
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Contact Us on WhatsApp
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={Award}
              title="Quality Properties"
              description="Only verified, premium properties that meet our high standards"
            />
            
            <ValueCard
              icon={Gift}
              title="Instant Rewards"
              description="Start earning from day one with our comprehensive rewards program"
            />
            
            <ValueCard
              icon={Headphones}
              title="24/7 Support"
              description="Our dedicated team is always here to help, day or night"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex items-start bg-white/90 p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="w-12 h-12 rounded-full theme-accent-light-bg flex items-center justify-center mr-4 mt-1">
      <Icon className="w-6 h-6 theme-accent-text" />
    </div>
    <div>
      <p className="font-medium theme-primary-text text-lg">{title}</p>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);

export default TenantCallToAction;
