import React from "react";

const PromoSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 py-10 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-sm p-6 rounded-lg border-r-0 md:border-r-8">
          {/* Left text */}
          <div className="text-center md:text-left md:mr-6 flex-1">
            <p className="text-yellow-500 font-medium">DIGITAL SMART</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              WIRELESS SPEAKER
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              MIN. 30-75% OFF
            </p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded font-semibold">
              SHOP NOW
            </button>
          </div>

          {/* Right image */}
          <div className="w-40 sm:w-48 aspect-square flex-shrink-0 mt-4 md:mt-0">
            <img
              src="https://i.pinimg.com/736x/09/ca/46/09ca46f55af3268baf2c923861ed204d.jpg"
              alt="Wireless Speaker"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-sm p-6 rounded-lg border-r-0 md:border-r-8">
          {/* Left text */}
          <div className="text-center md:text-left md:mr-6 flex-1">
            <p className="text-yellow-500 font-medium">DIGITAL SMART</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              WATCH CHARGER
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              UP TO 75% OFF
            </p>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded font-semibold">
              SHOP NOW
            </button>
          </div>

          {/* Right image */}
          <div className="w-40 sm:w-48 aspect-square flex-shrink-0 mt-4 md:mt-0">
            <img
              src="https://i.pinimg.com/1200x/d0/7f/19/d07f194b91fa1083de4251c8f3e9439a.jpg"
              alt="Watch Charger"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
