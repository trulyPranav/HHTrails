import type { Tour } from "../../types/tour";
import { useNavigate } from "react-router-dom";
import WindowOverlay from "../public/Vector.svg";

interface TourCardProps {
  tour: Tour;
}

const TourCard = ({ tour }: TourCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-[360px] m-3 bg-white rounded-xl shadow-md overflow-hidden">

      {/* IMAGE SECTION */}
     <div className="relative h-[200px] overflow-hidden rounded-t-xl">

  {/* Main Image */}
  <img
    src={tour.photoUrl}
    alt={tour.title}
    className="w-full h-full object-cover"
  />

  {/* Top Brown Overlay Shape */}
  <img
    src="/Vector.svg"  // your overlay svg
    alt="overlay-shape"
    className="absolute top-0 left-0 w-full h-[90px] object-cover z-10 pointer-events-none  bg-no-repeat bg-top bg-cover"
  />

  {/* Recommended Badge */}
  <span className="absolute top-4 left-4 bg-orange-400 text-white text-xs px-4 py-1 rounded-full z-20">
    {tour.isCustom ? "Custom" : "Recommended"}
  </span>

  {/* Bookmark */}
  <div className="absolute top-4 right-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow z-20">
    🔖
  </div>

  {/* Bottom Info */}
  <div className="absolute bottom-3 left-4 right-4 flex justify-between text-white text-sm z-20">
    <span>📍 {tour.region}</span>
    <span>
      📅 {tour.durationNights}N / {tour.durationDays}D
    </span>
  </div>
</div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">

        <h3 className="text-lg font-semibold text-[#2b140c]">
          {tour.title}
        </h3>

        {/* tags */}
        <div className="flex gap-2 flex-wrap">
          {tour.types.slice(0, 3).map((type) => (
            <span
              key={type}
              className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-500 line-clamp-2">
          {tour.description || "Journey through the Himalayas with HHTrails."}
        </p>

        {/* button */}
        <button
          className="w-full bg-[#2b140c] text-white py-3 rounded-lg text-sm font-medium"
          onClick={() => navigate(`/tours/${tour.id}`)}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default TourCard;
