const AvailableToursHeader = () => {
  return (
    <div className="w-full bg-white mt-6 px-7 py-6 rounded-lg">

      {/* container */}
      <div className="flex items-center justify-between ">

        {/* LEFT TEXT */}
        <div>
          <h2 className="text-4xl font-md  font-berlin text-[#2b140c]">
            Available Tours
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Showing 6 of 10 tours • No filter applied
          </p>
        </div>

        {/* RIGHT SORT */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>

          <select
            className="
              bg-[#2b140c]
              text-white
              px-4 py-2
              rounded-lg
              text-sm
              outline-none
              cursor-pointer
            "
          >
            <option>All</option>
            <option>Popular</option>
            <option>Newest</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default AvailableToursHeader;