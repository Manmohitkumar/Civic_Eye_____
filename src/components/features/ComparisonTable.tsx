
import React from 'react';
import ComparisonTableContent from './ComparisonTableContent';
import PropertyOwnersLove from './PropertyOwnersLove';

const ComparisonTable = () => {
  return (
    <div className="py-12">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--theme-primary)]">
          Why choose us
        </h2>
        {/* Coral accent line */}
        <div className="h-1 w-20 bg-[var(--theme-accent)] rounded-full mx-auto mt-4"></div>
        {/* Subtitle */}
        <p className="mt-4 text-xl">
          The Propico <span className="text-[#ff6b6b]">advantage</span> over traditional alternatives
        </p>
      </div>

      {/* Comparison Table */}
      <ComparisonTableContent />

      {/* Why property owners love Propico */}
      <PropertyOwnersLove />
    </div>
  );
};

export default ComparisonTable;
