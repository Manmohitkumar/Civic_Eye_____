
import React from 'react';
import { Building, Shield, Clock, Check } from "lucide-react";

const GuaranteedRentFlyer: React.FC = () => {
  return (
    <div className="w-[1080px] h-[1920px] bg-white flex flex-col relative overflow-hidden rounded-3xl">
      {/* Header Section with Gradient Background */}
      <div className="w-full h-[500px] bg-gradient-to-r from-[#9b50e3] to-[#ff69b4] p-8 flex flex-col justify-center items-center">
        <p className="text-white text-center text-3xl font-medium mb-4">PROPICO</p>
        <h1 className="text-white text-center text-9xl font-bold tracking-wider leading-tight">GUARANTEED<br />RENT</h1>
        <h2 className="text-white text-center text-4xl font-medium mt-6">EVERY MONTH. NO EXCEPTIONS.</h2>
      </div>

      {/* Rent Amount Card */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white rounded-xl shadow-2xl p-10 text-center">
          <div className="text-[#4A23AD] text-7xl font-bold mb-3">₹50,000<span className="text-4xl">/month</span></div>
          <div className="text-gray-700 text-2xl">Fixed payments. On time. Every time.</div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-full px-16 pt-32 pb-16 bg-white">
        <h3 className="text-4xl font-bold text-gray-800 text-center mb-4">Why Property Owners Choose Us</h3>
        <div className="w-24 h-1 bg-[#4A23AD] mx-auto mb-16 rounded-full"></div>
        
        <div className="flex justify-between gap-8">
          {/* Benefit 1 */}
          <div className="flex-1 border-l-4 border-[#4A23AD] pl-6 py-2">
            <div className="flex justify-center mb-4">
              <div className="bg-[#f5f0ff] p-5 rounded-full w-20 h-20 flex items-center justify-center">
                <Building className="w-10 h-10 text-[#4A23AD]" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 text-center mb-2">40% HIGHER RETURNS</h4>
            <p className="text-center text-gray-600">Maximize your rental income with our proven investment model</p>
          </div>
          
          {/* Benefit 2 */}
          <div className="flex-1 border-l-4 border-[#4A23AD] pl-6 py-2">
            <div className="flex justify-center mb-4">
              <div className="bg-[#f5f0ff] p-5 rounded-full w-20 h-20 flex items-center justify-center">
                <Shield className="w-10 h-10 text-[#4A23AD]" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 text-center mb-2">ZERO RISK</h4>
            <p className="text-center text-gray-600">We pay you even when tenants don't pay us</p>
          </div>
          
          {/* Benefit 3 */}
          <div className="flex-1 border-l-4 border-[#4A23AD] pl-6 py-2">
            <div className="flex justify-center mb-4">
              <div className="bg-[#f5f0ff] p-5 rounded-full w-20 h-20 flex items-center justify-center">
                <Clock className="w-10 h-10 text-[#4A23AD]" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 text-center mb-2">100% HASSLE-FREE</h4>
            <p className="text-center text-gray-600">We handle everything - maintenance, tenants, paperwork</p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full px-16 py-12 bg-white">
        <div className="border-l-4 border-[#4A23AD] pl-6 py-4">
          <p className="text-gray-700 italic text-xl mb-4">
            "Since partnering with Propico, I've received my rent on time every month without fail. The peace of mind is worth every rupee!"
          </p>
          <p className="text-gray-900 font-semibold">— Ananya S., Property Owner in Koramangala</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-16 py-12 flex justify-center gap-6">
        <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
          <Check className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-medium">5-Year Contract</span>
        </div>
        <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
          <Check className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-medium">No Hidden Fees</span>
        </div>
        <div className="flex items-center bg-blue-50 rounded-lg px-4 py-2">
          <Check className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-medium">24/7 Support</span>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full flex-1 flex flex-col items-center justify-center px-10 pt-8 pb-16">
        <button className="bg-[#4A23AD] text-white text-2xl font-bold px-12 py-6 rounded-full shadow-lg hover:bg-[#4A23AD]/90 mb-10 w-full max-w-md">
          GET YOUR GUARANTEED OFFER
        </button>
        
        <div className="bg-red-100 text-red-800 font-bold px-6 py-2 rounded-full mb-8">
          LIMITED SPOTS AVAILABLE
        </div>
        
        <p className="text-xl text-gray-700 font-medium mb-4">Call or WhatsApp: +91 98765-43210</p>
        <p className="text-xl text-[#4A23AD] font-medium">www.propico.in</p>
      </div>
    </div>
  );
};

export default GuaranteedRentFlyer;
