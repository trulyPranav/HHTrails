import FilterSidebar from "./FilterSidebar";
import MapSection from "./MapSection";
import AvailableToursHeader from "./AvailableToursHeader";
import TourCard from "./TourCard";
const TourLayout = () => {
  return (
    <div className="w-full py-8">

      {/* CENTER CONTENT AREA */}
      <div className="px-4 max-w-[1400px] mx-auto flex gap-8">

        {/* LEFT FILTER */}
        <FilterSidebar />

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          <MapSection />
          <AvailableToursHeader />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 7 }).map((_, i) => (
              <TourCard key={i} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default TourLayout;