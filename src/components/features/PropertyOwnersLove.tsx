
import React from 'react';

type BenefitProps = {
  number: number;
  title: string;
  description: string;
};

const Benefit = ({ number, title, description }: BenefitProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f5f0ff] text-[var(--theme-primary)] flex items-center justify-center font-semibold text-sm">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-[var(--theme-primary)] text-xl mb-2">{title}</h4>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const PropertyOwnersLove = () => {
  const benefits = [
    {
      number: 1,
      title: "Financial Security",
      description: "Your rental income is guaranteed every month, regardless of vacancies or tenant payment issues"
    },
    {
      number: 2,
      title: "Peace of Mind",
      description: "We assume all the risks and responsibilities while you enjoy truly passive income"
    },
    {
      number: 3,
      title: "Property Protection",
      description: "Your investment is professionally managed and returned to you in its original condition"
    },
    {
      number: 4,
      title: "Time Freedom",
      description: "We give you your time back to enjoy on things that truly matter"
    }
  ];

  return (
    <div className="rounded-xl border border-gray-200 p-8">
      <h3 className="text-2xl font-bold text-[var(--theme-primary)] mb-8">
        Why do property owners <span className="text-[var(--theme-accent)]">love</span> Propico
      </h3>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {benefits.map((benefit, index) => (
          <Benefit
            key={index}
            number={benefit.number}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyOwnersLove;
