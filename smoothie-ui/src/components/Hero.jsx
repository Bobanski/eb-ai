import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/hero.jpg" 
          alt="Earthbar Smoothies" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-earthGreen/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-[64px] font-bold mb-4 leading-tight">
          Fuel Your Body with Nature's Best
        </h1>
        <h2 className="text-[32px] font-bold italic mb-8">
          Organic Smoothies & Protein-Packed Drinks
        </h2>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="bg-earthGreen text-white font-bold rounded-full h-11 px-6 hover:bg-[#007c59] transition-colors focus-visible:outline-earthGreen outline-2 shadow-md">
            Order Online
          </button>
          <button className="bg-transparent border-2 border-white text-white font-bold rounded-full h-11 px-6 hover:bg-white/10 transition-colors focus-visible:outline-earthGreen outline-2 shadow-md">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;