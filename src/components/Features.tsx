
import ComparisonTable from "./features/ComparisonTable";
import ValueProposition from "./features/ValueProposition";
import StatsSection from "./features/StatsSection";

const Features = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Comparison Table */}
        <ComparisonTable />

        {/* Enhanced True Value of Property Section */}
        <ValueProposition />

        {/* Stats Section */}
        <StatsSection />
      </div>
    </section>
  );
};

export default Features;
