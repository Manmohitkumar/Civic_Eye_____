
import { useIsMobile } from "@/hooks/use-mobile";
import MobileComparisonTable from "./comparison/MobileComparisonTable";
import DesktopComparisonTable from "./comparison/DesktopComparisonTable";

const ComparisonTableContent = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileComparisonTable /> : <DesktopComparisonTable />;
};

export default ComparisonTableContent;
