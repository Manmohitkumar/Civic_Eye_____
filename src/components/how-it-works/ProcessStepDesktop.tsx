
import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ProcessStep } from "./types";

interface ProcessStepDesktopProps {
  step: ProcessStep;
  index: number;
  isLast: boolean;
}

const ProcessStepDesktop = ({ step, index, isLast }: ProcessStepDesktopProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const IconComponent = step.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 delay-${
        index * 100
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Icon in the center */}
        <div className="relative mb-6">
          <div className={`w-24 h-24 rounded-full ${step.bgColor} flex items-center justify-center relative z-10 border-4 border-white`}>
            <IconComponent size={40} className={step.iconColor} />
            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${step.circleColor} text-white flex items-center justify-center font-bold text-lg`}>
              {index + 1}
            </div>
          </div>
          
          {/* Arrow connecting to next step (hidden for last item) */}
          {!isLast && (
            <div className="hidden md:block absolute top-1/2 left-full w-8 h-2 -translate-y-1/2 z-0">
              <ArrowRight size={20} className="text-gray-300" />
            </div>
          )}
        </div>
        
        {/* Text below the icon */}
        <div className="text-center mx-auto" style={{ maxWidth: "220px" }}>
          <h3 className="text-xl font-semibold mb-2 theme-primary-text whitespace-nowrap">{step.title}</h3>
          <p className="text-foreground/70 mb-2">{step.description}</p>
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">
            {step.timeline}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessStepDesktop;
