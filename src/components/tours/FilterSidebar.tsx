import { useState } from "react";
import { X } from "lucide-react";

interface FilterSidebarProps {
  selectedRegions: string[];
  onRegionsChange: (regions: string[]) => void;
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  selectedSeasons: string[];
  onSeasonsChange: (seasons: string[]) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  /** Mobile-only: controls whether the drawer is open */
  mobileOpen?: boolean;
  /** Mobile-only: called when the drawer should close */
  onCloseMobile?: () => void;
}

const FilterSidebar = ({
  selectedRegions,
  onRegionsChange,
  selectedTypes,
  onTypesChange,
  selectedSeasons,
  onSeasonsChange,
  duration,
  onDurationChange,
  mobileOpen = false,
  onCloseMobile,
}: FilterSidebarProps) => {
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

  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      onRegionsChange(selectedRegions.filter((r) => r !== region));
    } else {
      onRegionsChange([...selectedRegions, region]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  const toggleSeason = (season: string) => {
    if (selectedSeasons.includes(season)) {
      onSeasonsChange(selectedSeasons.filter((s) => s !== season));
    } else {
      onSeasonsChange([...selectedSeasons, season]);
    }
  };

  return (
    <>
      {/* ── Mobile backdrop ── */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onCloseMobile}
      />

      {/* ── Sidebar (drawer on mobile, sticky on desktop) ── */}
      <aside
        className={`
          max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-full max-lg:z-50 max-lg:overflow-y-auto
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:self-start
          w-[300px] lg:w-[320px]
          p-6 lg:p-[36px]
          pt-14 lg:pt-[36px]
          lg:ml-16
          lg:rounded-[10px] lg:border-2
          bg-[#F3F4F1]
          space-y-6 lg:shrink-0
          lg:max-h-screen lg:scroll-smooth
        `}
      >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        {/* Close button — mobile only */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* REGION */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3">REGION</p>

        <div className="space-y-2 text-sm">
          {visibleRegions.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-black"
                checked={selectedRegions.includes(item)}
                onChange={() => toggleRegion(item)}
              />
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
              <input
                type="checkbox"
                className="accent-black"
                checked={selectedTypes.includes(item)}
                onChange={() => toggleType(item)}
              />
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
            onChange={(e) => onDurationChange(Number(e.target.value))}
            className="w-full"
          />

          <p className="text-xs text-gray-700 mt-2">
            Selected: {duration} days
          </p>
        </div>

        <div className="flex gap-2 mt-3 text-xs"><div className="flex gap-2 mt-3 text-xs">
        <button
          onClick={() => onDurationChange(6)}
          className={`border px-3 py-1 rounded ${
            duration < 7 ? "bg-black text-white" : ""
          }`}
        >
          &lt; 7 days
        </button>

        <button
          onClick={() => onDurationChange(8)}
          className={`border px-3 py-1 rounded ${
            duration >= 7 && duration <= 10 ? "bg-black text-white" : ""
          }`}
        >
          7-10 days
        </button>

        <button
          onClick={() => onDurationChange(11)}
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
            <input
              type="checkbox"
              checked={selectedSeasons.includes("Summer")}
              onChange={() => toggleSeason("Summer")}
            />
            Summer
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSeasons.includes("Winter")}
              onChange={() => toggleSeason("Winter")}
            />
            Winter
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSeasons.includes("Monsoon")}
              onChange={() => toggleSeason("Monsoon")}
            />
            Monsoon
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedSeasons.includes("Festival")}
              onChange={() => toggleSeason("Festival")}
            />
            Festival Time
          </label>
        </div>
      </div>
    </aside>
    </>
  );
};

export default FilterSidebar;