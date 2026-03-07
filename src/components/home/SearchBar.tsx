import { useState } from 'react';
import { homeService } from '../../services/homeService';
import type { HomeTour } from '../../types/home';


interface SearchBarProps {
  onSearch: (tours: HomeTour[]) => void;
  onClear: () => void;
}


const SearchBar = ({ onSearch, onClear }: SearchBarProps) => {
  const [destination, setDestination] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!import.meta.env.VITE_API_BASE_URL) return;
    if (!destination || !from || !to) return;
    try {
      setLoading(true);
      const result = await homeService.search(from, to, destination);
      onSearch(result.tours);
    } catch (err) {
      console.error('Search failed', err);
      onSearch([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 px-2 mt-[40px] sm:mt-[30px] md:mt-[15px] lg:-mt-[35px]">
      <div className="max-w-4xl mx-auto bg-[#6A5F56] rounded-lg shadow-md p-2 md:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3">

          {/* Destination */}
          <div className="flex items-center gap-1.5 px-2 py-1.5 md:px-4 md:py-3 bg-white rounded-md">
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-[8px] md:text-[10px] text-gray-400 leading-none">
                Destination
              </p>
              <select
                value={destination}
                onChange={(e) => { setDestination(e.target.value); if (!e.target.value) onClear(); }}
                className="w-full outline-none text-xs text-gray-700 bg-transparent appearance-none cursor-pointer"
              >
                <option value="">Select destination...</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Spiti">Spiti</option>
                <option value="Kashmir">Kashmir</option>
                <option value="Himachal">Himachal</option>
              </select>
            </div>
          </div>

          {/* From */}
          <div className="flex items-center gap-1.5 px-2 py-1.5 md:px-4 md:py-3 bg-white rounded-md">
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <p className="text-[8px] md:text-[10px] text-gray-400 leading-none">
                From
              </p>
              <input
                type="text"
                placeholder="27 - Nov - 2025"
               value={from}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full outline-none text-[10px] md:text-xs text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Till */}
          <div className="flex items-center gap-1.5 px-2 py-1.5 md:px-4 md:py-3 bg-white rounded-md">
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <p className="text-[8px] md:text-[10px] text-gray-400 leading-none">
                Till
              </p>
              <input
                type="text"
                placeholder="30 - Nov - 2025"
                value={to}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                onChange={(e) => setTo(e.target.value)}
                className="w-full outline-none text-[10px] md:text-xs text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Search Button */}
          <button 
           onClick={handleSearch}
            disabled={loading}
            className="bg-[#F4A321] hover:bg-[#E09419] text-[#1F1F1F] text-[10px] md:text-sm font-medium px-2 py-1.5 md:px-4 md:py-3 rounded-md flex items-center justify-center gap-1 transition-all duration-300">
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {loading ? 'Searching...' : 'Search'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default SearchBar;