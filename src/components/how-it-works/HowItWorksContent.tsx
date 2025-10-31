
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProcessStepMobile from "./ProcessStepMobile";
import ProcessStepDesktop from "./ProcessStepDesktop";
import { ProcessStep } from "./types";

interface HowItWorksContentProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  ctaText: string;
  ctaLink: string;
  onCtaClick?: () => void;
}

const HowItWorksContent = ({
  title,
  subtitle,
  steps,
  ctaText,
  ctaLink,
  onCtaClick
}: HowItWorksContentProps) => {
  return (
    <section id="how-it-works" className="section-padding theme-section relative overflow-hidden bg-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">{title}</h2>
          <div className="accent-line mx-auto"></div>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Process Flow with Straight Path */}
          <div className="relative mt-16">
            {/* Progress bar for desktop - visible only on md and up */}
            <div className="hidden md:block absolute top-12 left-1/2 w-4/5 -translate-x-1/2 z-0">
              <Progress className="h-1" value={100}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 rounded-full"></div>
              </Progress>
            </div>

            {/* Straight Path - Mobile (hidden on larger screens) */}
            <div className="md:hidden">
              {steps.map((step, index) => (
                <div key={index} className="mb-16 relative">
                  <ProcessStepMobile step={step} index={index} />
                  {index < steps.length - 1 && (
                    <div className="absolute h-16 w-px bg-gradient-to-b from-purple-700 to-blue-600 left-1/2 -bottom-16 -translate-x-1/2"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Straight Path - Desktop (hidden on mobile) - Added connecting indicators */}
            <div className="hidden md:block relative">
              <div className="grid grid-cols-4 gap-8 relative z-10">
                {steps.map((step, index) => (
                  <ProcessStepDesktop 
                    key={index} 
                    step={step} 
                    index={index}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-12">
            <Button 
              className="hover:opacity-90 active:scale-[0.98] group transition-all duration-300 hover:scale-105 w-full sm:w-auto" 
              size="lg" 
              variant="accent" 
              asChild={!!ctaLink && !onCtaClick}
              onClick={onCtaClick}
            >
              {ctaLink && !onCtaClick ? (
                <Link to={ctaLink}>
                  {ctaText}
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <>
                  {ctaText}
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-40 left-10 w-64 h-64 theme-primary-bg opacity-5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 theme-accent-bg opacity-5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default HowItWorksContent;
