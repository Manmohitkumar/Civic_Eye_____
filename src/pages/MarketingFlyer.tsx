
import React, { useRef } from "react";
import GuaranteedRentFlyer from "../components/marketing/GuaranteedRentFlyer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";

const MarketingFlyer: React.FC = () => {
  const flyerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // This is a placeholder for actual download functionality
    // In a real implementation, you would use html-to-image or similar library
    toast.info("Download functionality would be implemented here", {
      description: "This would generate and download the flyer as an image",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center gap-6 mb-8">
        <h1 className="text-3xl font-bold text-[#4A23AD]">
          Guaranteed Rent Marketing Flyer
        </h1>
        <p className="text-gray-600 max-w-2xl text-center">
          Use this flyer to attract property owners to our guaranteed rent program. 
          Perfect for sharing in WhatsApp groups, Facebook communities, and other social platforms.
        </p>
        <Button onClick={handleDownload} className="flex items-center gap-2">
          Download as Image <ArrowDown size={16} />
        </Button>
      </div>

      {/* Mobile screen preview frame for the flyer */}
      <div className="w-full flex justify-center mb-10">
        <div className="bg-gray-800 rounded-[40px] p-3 shadow-xl border-8 border-gray-800">
          <div className="bg-black rounded-[22px] w-[340px] h-[650px] overflow-hidden">
            <div 
              className="transform scale-[0.175] origin-top border shadow-xl"
              ref={flyerRef}
              style={{ transformOrigin: 'top left' }}
            >
              <GuaranteedRentFlyer />
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <div className="w-16 h-3 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto text-center mt-10 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Tips for Effective Distribution</h3>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>• Share in local property owner groups and communities</li>
          <li>• Upload directly to platforms rather than sharing as a link</li>
          <li>• Send personally to contacts who own rental properties</li>
          <li>• Use as part of email marketing campaigns to property owners</li>
        </ul>
      </div>
    </div>
  );
};

export default MarketingFlyer;
