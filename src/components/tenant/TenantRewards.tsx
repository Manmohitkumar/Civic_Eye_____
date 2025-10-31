
import { Gift, CreditCard, Lightbulb, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const TenantRewards = () => {
  return (
    <section className="py-16 theme-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
            Reward Redemption Options
          </h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Earn points with every on-time rent payment and redeem them for valuable rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          <RewardCard 
            icon={CreditCard}
            title="Rent Credits"
            description="Apply your points toward future rent payments and reduce your monthly expenses."
            points={5000}
          />
          
          <RewardCard 
            icon={Gift}
            title="Partner Vouchers"
            description="Redeem points for vouchers from our retail, dining and entertainment partners."
            points={2000}
          />
          
          <RewardCard 
            icon={Lightbulb}
            title="Utility Payments"
            description="Use your points to cover electricity, water, or internet bills."
            points={3000}
          />
          
          <RewardCard 
            icon={Wrench}
            title="Home Services"
            description="Redeem points for premium cleaning, painting, or maintenance services."
            points={4000}
          />
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold theme-primary-text mb-4">How to Earn More Points</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Maximize your rewards by taking advantage of these point-boosting opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <EarningCard
              title="On-time Payments"
              description="Earn base points for every rent payment made on time"
              points="1 point per ₹100 rent payment"
            />
            
            <EarningCard
              title="Referrals"
              description="Refer friends who sign up and become members"
              points="2,000 points per referral"
            />
            
            <EarningCard
              title="Renewal Bonus"
              description="Renew your lease for another term"
              points="5,000 points bonus"
            />
          </div>
          
          <div className="text-center">
            <Button 
              className="bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90"
              size="lg"
              onClick={() => {
                const phoneNumber = '+918790645442';
                const message = "Hi! I'm interested in learning more about Propico's tenant rewards program. Could you please help me?";
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Learn More About Rewards
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const RewardCard = ({ icon: Icon, title, description, points }: {
  icon: React.ElementType;
  title: string;
  description: string;
  points: number;
}) => (
  <div className="bg-white/95 rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
    <div className="p-6 flex justify-center bg-primary-light border-b border-gray-100">
      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-2 border-primary-light">
        <Icon className="w-10 h-10 theme-primary-text" strokeWidth={1.5} />
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2 theme-primary-text text-center">{title}</h3>
      <div className="h-1 w-12 bg-[var(--theme-accent)] rounded-full mx-auto mb-3"></div>
      <p className="text-gray-700 mb-4 text-center">{description}</p>
      <div className="pt-4 border-t border-gray-100 text-center">
        <span className="text-sm text-gray-500">Starting from</span>
        <div className="text-lg font-bold theme-primary-text">{points.toLocaleString()} points</div>
      </div>
    </div>
  </div>
);

const EarningCard = ({ title, description, points }: {
  title: string;
  description: string;
  points: string;
}) => (
  <div className="bg-white/90 rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="font-bold text-xl theme-primary-text mb-2">{title}</div>
    <p className="text-gray-600 mb-3">{description}</p>
    <div className="text-lg font-semibold theme-accent-text">{points}</div>
  </div>
);

export default TenantRewards;
