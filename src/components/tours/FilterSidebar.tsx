import { useState } from "react";

const FilterSidebar = () => {
  const [showAllRegions, setShowAllRegions] = useState(false);
  const [showAllTypes, setShowAllTypes] = useState(false);

  const regions = [
    "Ladakh",
    "Spiti",
    "Zanskar",
    "Kashmir",
    "Uttarakhand",
    "Himachal",
    "Sikkim",
  ];

  const tourTypes = [
    "Cultural",
    "Village",
    "Volunteering",
    "Festival",
    "Photography",
    "Heritage",
  ];

  const visibleRegions = showAllRegions ? regions : regions.slice(0, 3);
  const visibleTypes = showAllTypes ? tourTypes : tourTypes.slice(0, 3);
  const [duration, setDuration] = useState<number>(0);

  return (
      <aside
        className="
          self-start
          w-[320px]
          p-[26px]
          rounded-[10px]
          border-2
          bg-white
          space-y-6
          shrink-0
        "
      >
      {/* HEADER */}
      <div className="flex items-center gap-2">
        {/* filter icon */}
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            d="M4 6h16M7 12h10M10 18h4" />
        </svg>
        <h2 className="font-semibold text-gray-800">Filters</h2>
      </div>

      {/* REGION */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">REGION</p>

        <div className="space-y-2 text-sm">
          {visibleRegions.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="checkbox" className="accent-black" />
              {item}
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowAllRegions(!showAllRegions)}
          className="text-red-500 text-xs mt-3 flex items-center gap-1"
        >
          {showAllRegions ? "Show Less" : "Show More"}
        </button>
      </div>

      <hr />

      {/* TOUR TYPE */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">TOUR TYPE</p>

        <div className="space-y-2 text-sm">
          {visibleTypes.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="checkbox" className="accent-black" />
              {item}
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowAllTypes(!showAllTypes)}
          className="text-red-500 text-xs mt-3 flex items-center gap-1"
        >
          {showAllTypes ? "Show Less" : "Show More"}
        </button>
      </div>

      <hr />

      {/* DURATION */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">
          DURATION (DAYS)
        </p>

        <div className="px-2 pt-3 pb-2">

          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>0 days</span>
            <span>14 days</span>
          </div>

          <input
            type="range"
            min="0"
            max="14"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full"
          />

          <p className="text-xs text-gray-700 mt-2">
            Selected: {duration} days
          </p>
        </div>

        <div className="flex gap-2 mt-3 text-xs"><div className="flex gap-2 mt-3 text-xs">
        <button
          onClick={() => setDuration(6)}
          className={`border px-3 py-1 rounded ${
            duration < 7 ? "bg-black text-white" : ""
          }`}
        >
          &lt; 7 days
        </button>

        <button
          onClick={() => setDuration(8)}
          className={`border px-3 py-1 rounded ${
            duration >= 7 && duration <= 10 ? "bg-black text-white" : ""
          }`}
        >
          7-10 days
        </button>

        <button
          onClick={() => setDuration(11)}
          className={`border px-3 py-1 rounded ${
            duration > 10 ? "bg-black text-white" : ""
          }`}
        >
          10+ days
        </button>

      </div>
        </div>
      </div>

      <hr />

      {/* SEASON */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">SEASON</p>

        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Summer
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Winter
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Monsoon
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Festival Time
          </label>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;