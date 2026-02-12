const SearchBar = () => {
  return (
    <div className="mb-11 px-4 -mt-12">
      <div className="max-w-4xl mx-auto bg-[#6A5F56] rounded-lg shadow-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

          {/* Destination */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 leading-none">Destination</p>
              <input
                type="text"
                placeholder="Search tours..."
                className="w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* From */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 leading-none">From</p>
              <input
                type="text"
                placeholder="27 - Nov - 2025"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => !e.target.value && (e.target.type = "text")}
                className="w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Till */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 leading-none">Till</p>
              <input
                type="text"
                placeholder="30 - Nov - 2025"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => !e.target.value && (e.target.type = "text")}
                className="w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#F4A321] hover:bg-[#E09419] text-[#1F1F1F] text-sm font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>

        </div>
      </div>
    </div>
  );
};

export default SearchBar;
