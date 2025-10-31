
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PropertyFormProps {
  email: string;
  setEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  additionalDetails: string;
  setAdditionalDetails: (value: string) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  email,
  setEmail,
  address,
  setAddress,
  additionalDetails,
  setAdditionalDetails,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-base font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-2"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="address" className="text-base font-medium">
              Property Address
            </Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full property address"
              className="mt-2"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="additionalDetails" className="text-base font-medium">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="additionalDetails"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Tell us more about your property (size, condition, current status, etc.)"
              className="mt-2 min-h-24"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button 
            type="submit"
            className="w-full px-6 py-3 theme-primary-bg text-white rounded-md font-medium shadow-sm transition-all hover:opacity-90 hover:shadow-md active:scale-[0.98] group"
            disabled={isSubmitting}
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Submit Property"}
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t">
        <h3 className="font-medium text-lg mb-4 theme-primary-text">What happens next?</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Our property specialist will review your submission</li>
          <li>We'll contact you to schedule an initial assessment</li>
          <li>You'll receive a guaranteed rental income offer</li>
          <li>Once you accept, we'll handle all the details</li>
        </ol>
      </div>
    </div>
  );
};

export default PropertyForm;
