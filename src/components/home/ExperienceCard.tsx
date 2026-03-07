import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  id: string;
  image: string;
  title: string;
  duration: string;
  groupSize: string;
  rating?: string;
  isTrending?: boolean;
}

const ExperienceCard = ({
  id,
  image,
  title,
  duration,
  groupSize,
  rating = "4.9",
  isTrending = true
}: ExperienceCardProps) => {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">

      <div className="relative h-[250px] overflow-hidden rounded-t-xl">

        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div
          className="absolute top-0 left-0 w-full h-[90px] bg-no-repeat bg-top bg-cover z-10 pointer-events-none"
          style={{
            backgroundImage: "url('/Vector.svg')",
          }}
        />

        {isTrending && (
          <span className="absolute top-4 left-4 bg-[#F4A321] text-white text-xs rounded-full px-4 py-1 flex items-center gap-1 z-20">
            🔥 Trending
          </span>
        )}

        <span className="absolute top-4 right-4 bg-white text-gray-800 text-xs rounded-full px-3 py-1 flex items-center gap-1 shadow z-20">
          ⭐ {rating}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-medium text-[#2b2b2b] mb-2">
          {title}
        </h3>

        <div className="text-xs text-gray-500 mb-4">
          <p>{duration}</p>
          <p>{groupSize}</p>
        </div>

        <button
          onClick={() => navigate(`/tours/${id}`)}
          className="w-full bg-[#2b1b14] hover:bg-[#3a261e] text-white text-sm rounded-md py-2 transition-colors duration-300"
        >
          View Details →
        </button>
      </div>

    </div>
  );
};

export default ExperienceCard;