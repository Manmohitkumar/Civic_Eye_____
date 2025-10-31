
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SuccessViewProps {
  resetForm: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ resetForm }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 theme-primary-text">
                  Property Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-8">
                  Thank you for submitting your property information. Our team will review your details and get in touch with you shortly.
                </p>
                <div className="space-y-4 w-full sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <Button
                    onClick={resetForm}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Submit Another Property
                  </Button>
                  <Button
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link to="/">Return to Homepage</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessView;
