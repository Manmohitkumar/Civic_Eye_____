
import React from "react";
import { Heart, Home } from "lucide-react";

const ValueProposition = () => {
  return (
    <div className="mt-20 mb-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 theme-primary-text">The True Value of Your Property</h2>
        <div className="accent-line mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Your property represents both financial security and personal legacy. We protect both.
        </p>
      </div>
      
      {/* Side-by-side content */}
      <div className="flex flex-col md:flex-row gap-10 items-center bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-8 shadow-sm border border-indigo-100">
        {/* Left side - Image */}
        <div className="md:w-1/2 relative">
          <div className="rounded-xl overflow-hidden shadow-lg relative">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" 
              alt="Beautiful family home with well-maintained garden representing the emotional and financial value of property ownership"
              className="w-full h-auto object-cover"
            />
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <Heart className="w-10 h-10 text-white fill-white opacity-70" aria-label="Heart icon representing love for home" />
            </div>
          </div>
          
          {/* Optional decorative element */}
          <div className="absolute -bottom-4 -right-4 bg-[var(--theme-accent)] w-16 h-16 rounded-full flex items-center justify-center shadow-md z-10 hidden md:flex">
            <Home className="w-8 h-8 text-white" aria-label="Home icon" />
          </div>
        </div>
        
        {/* Right side - Emotional message */}
        <div className="md:w-1/2 space-y-6">
          <h3 className="text-2xl font-bold text-[var(--theme-primary)]">
            More Than Just A Property
          </h3>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Your property is more than wood and concrete. It's years of careful planning, 
            moments of pride, and dreams of the future.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            When you entrust your property to us, we're not just managing an asset – we're protecting 
            the foundation of your family's security and the cornerstone of your legacy.
          </p>
          
          <div className="pt-4">
            <p className="text-lg italic border-l-4 border-[var(--theme-accent)] pl-4 text-gray-700">
              "We treat every property as if it were our own family home – with care, 
              respect, and an understanding of its true meaning in your life."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
