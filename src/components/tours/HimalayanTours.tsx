const HimalayanTours = () => {
  const places = ["Ladakh", "Spiti", "Zanskar", "Himachal", "Sikkim"];

  return (
    <div className="w-full bg-[#281910] border-b text-center px-4 py-10 sm:py-12 lg:py-15">

      {/* Title */}
      <p className="font-sans text-sm sm:text-base mb-3 text-[#F3F4F1]">
        Himalayan Tours
      </p>

      {/* Description */}
      <p className="
        font-sans
        max-w-xl sm:max-w-2xl lg:max-w-3xl
        mx-auto
        text-sm sm:text-base
        leading-relaxed
        text-[#F3F4F1]
      ">
        Immerse yourself in ancient cultures, explore pristine mountain landscapes,
        and discover the authentic spirit of the Himalayas through carefully curated journeys
      </p>

      {/* Places */}
      <div className="
        flex
        flex-wrap
        justify-center
        gap-4 sm:gap-6 lg:gap-8
        mt-6
      ">
        {places.map((place) => (
          <div key={place} className="flex items-center gap-2 text-[#F3F4F1] text-sm sm:text-base">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="font-sans">{place}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default HimalayanTours;