import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RentPredictionForm from '@/components/rent-prediction/RentPredictionForm';
import BreadcrumbNavigation from '@/components/navigation/BreadcrumbNavigation';
import SEOHelmet from '@/components/seo/SEOHelmet';

const RentPrediction: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHelmet 
        title="Rent Predictor Tool - Estimate Property Rental Income | Propico"
        description="Use Propico's AI-powered rent predictor to estimate your property's rental income potential. Get accurate market-based rent estimates for properties across India."
      />
      <Navbar />
      <div className="pt-20">
        <BreadcrumbNavigation />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 theme-primary-text">
                Rent Estimation
              </h1>
              <div className="h-1 w-16 theme-accent-bg mx-auto rounded"></div>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                Get an accurate estimate of how much rent your property could earn in today's market based on real data and advanced AI models.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-10">
              <RentPredictionForm />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RentPrediction;
