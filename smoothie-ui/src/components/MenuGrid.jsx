import React from 'react';

const MenuGrid = () => {
  return (
    <section className="bg-grayBg py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-[32px] font-bold text-gray90 mb-10 text-center">Our Menu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Smoothies Card */}
          <div className="relative rounded-lg overflow-hidden h-64 shadow-md cursor-pointer">
            <img
              src="/menu/smoothies.jpg"
              alt="Smoothies"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-earthGreen/20"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-[32px] font-bold text-white">Smoothies</h3>
            </div>
            <div className="absolute top-4 left-4 bg-earthGreen text-white text-sm font-bold py-1 px-3 rounded-md">
              ORDER AHEAD
            </div>
          </div>
          
          {/* Bowls Card */}
          <div className="relative rounded-lg overflow-hidden h-64 shadow-md cursor-pointer">
            <img
              src="/menu/bowls.jpg"
              alt="Bowls"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-earthGreen/20"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-[32px] font-bold text-white">Bowls</h3>
            </div>
            <div className="absolute top-4 left-4 bg-earthGreen text-white text-sm font-bold py-1 px-3 rounded-md">
              ORDER AHEAD
            </div>
          </div>
          
          {/* Protein Coffee Card */}
          <div className="relative rounded-lg overflow-hidden h-64 shadow-md cursor-pointer">
            <img
              src="/menu/protein-coffee.jpg"
              alt="Protein Coffee"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-earthGreen/20"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-[32px] font-bold text-white">Protein Coffee + Cafe Drinks</h3>
            </div>
            <div className="absolute top-4 left-4 bg-earthGreen text-white text-sm font-bold py-1 px-3 rounded-md">
              ORDER AHEAD
            </div>
          </div>
          
          {/* Grab + Go Card */}
          <div className="relative rounded-lg overflow-hidden h-64 shadow-md cursor-pointer">
            <img
              src="/menu/grab-go.jpg"
              alt="Grab + Go"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-earthGreen/20"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-[32px] font-bold text-white">Grab + Go</h3>
            </div>
            <div className="absolute top-4 left-4 bg-earthGreen text-white text-sm font-bold py-1 px-3 rounded-md">
              ORDER AHEAD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuGrid;