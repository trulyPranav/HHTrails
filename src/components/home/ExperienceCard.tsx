interface ExperienceCardProps {
  image: string;
  title: string;
  duration: string;
  groupSize: string;
  rating?: string;
  isTrending?: boolean;
}

const ExperienceCard = ({ 
  image, 
  title, 
  duration, 
  groupSize, 
  rating = "4.9",
  isTrending = true 
}: ExperienceCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Image Placeholder */}
      {/* Image Section */}
<div className="relative h-[250px] overflow-hidden rounded-t-xl">

  {/* Main Image */}
  <img
    src={image}
    alt={title}
    className="w-full h-full object-cover"
  />

  {/* Top Curved Overlay (NO GAP VERSION) */}
  <div
    className="absolute top-0 left-0 w-full h-[90px] bg-no-repeat bg-top bg-cover z-10 pointer-events-none"
    style={{
      backgroundImage: "url('/Vector.svg')",
    }}
  />

  {/* Trending Badge */}
  {isTrending && (
    <span className="absolute top-4 left-4 bg-[#F4A321] text-white text-xs rounded-full px-4 py-1 flex items-center gap-1 z-20">
      🔥 Trending
    </span>
  )}

  {/* Rating Badge */}
  <span className="absolute top-4 right-4 bg-white text-gray-800 text-xs rounded-full px-3 py-1 flex items-center gap-1 shadow z-20">
    ⭐ {rating}
  </span>

</div>
      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-base font-medium text-[#2b2b2b] mb-2">
          {title}
        </h3>
        <div className="text-xs text-gray-500 mb-4">
          <p>{duration}</p>
          <p>{groupSize}</p>
        </div>
        <button className="w-full bg-[#2b1b14] hover:bg-[#3a261e] text-white text-sm rounded-md py-2 transition-colors duration-300">
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
