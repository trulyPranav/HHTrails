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
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Placeholder Image Icon */}
        <div className="text-gray-600 opacity-30">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Trending Badge */}
        {isTrending && (
          <span className="absolute top-3 left-3 bg-[#F4A321] text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
            🔥 Trending
          </span>
        )}
        {/* Rating Badge */}
        <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs rounded-full px-3 py-1 flex items-center gap-1">
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
