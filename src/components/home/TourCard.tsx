interface TourCardProps {
  image: string;
  title: string;
  duration: string;
  location: string;
}

const TourCard = ({ image, title, duration, location }: TourCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
      {/* Image Placeholder */}
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-base font-medium text-[#2b2b2b] mb-3">
          {title}
        </h3>
        
        {/* Meta Information */}
        <div className="space-y-2">
          {/* Duration */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{duration}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
