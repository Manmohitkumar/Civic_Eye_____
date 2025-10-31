
import { useState, useEffect, useRef } from "react";
import { ProcessStep } from "./types";

interface ProcessStepMobileProps {
  step: ProcessStep;
  index: number;
}

const ProcessStepMobile = ({ step, index }: ProcessStepMobileProps) => {
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
      className={`flex flex-col items-center text-center transition-all duration-700 delay-${
        index * 100
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative mb-4">
        <div className={`w-20 h-20 rounded-full ${step.bgColor} flex items-center justify-center relative`}>
          <IconComponent size={32} className={step.iconColor} />
          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${step.circleColor} text-white flex items-center justify-center font-bold text-lg`}>
            {index + 1}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 theme-primary-text whitespace-nowrap">{step.title}</h3>
        <p className="text-foreground/70 mb-2">{step.description}</p>
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full border border-gray-200">
          {step.timeline}
        </span>
      </div>
    </div>
  );
};

export default ProcessStepMobile;
