import { BookOpen } from 'lucide-react';

const BlogLibrarySection = () => {
  const books = [
    {
      id: 1,
      image: "placeholder-book-1.jpg",
      title: "Perspectives on Climate Change, Adaptation, and Belief Systems in Ladakh: A Case Study of Nubra",
      author: "Author(s): Dr. Sonam Wangchok"
    },
    {
      id: 2,
      image: "placeholder-book-2.jpg",
      title: "WALKS IN NUBRA",
      volume: "Volume 1: Rongto to Kyagar",
      author: "Author(s): Dr. Sonam Wangchok"
    },
    {
      id: 3,
      image: "placeholder-book-3.jpg",
      title: "Walks in Nubra",
      volume: "Volume 1: Photoksar to Phukpoche",
      author: "Author(s): Dr. Sonam Wangchok"
    }
  ];

  return (
    <div className="w-full bg-[#f5f5f5] py-1">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          {/* Decorative Icon */}
          <div className="flex justify-center mb-3">
            <BookOpen className="w-6 h-6 text-[#f4a62a]" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-semibold text-[#2b2b2b] mb-2">
            Traveler's Library
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-500">
            Curated reading for mountain lovers and adventure seekers
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book) => (
            <div 
              key={book.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image Section */}
             {/* Image Section */}
              <div className="relative h-[200px] overflow-hidden rounded-t-xl">

                {/* Main Image */}
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />

                {/* Top Curved Overlay (Gap-Free) */}
                <div
                  className="absolute top-0 left-0 w-full h-[90px] bg-no-repeat bg-top bg-cover z-10 pointer-events-none"
                  style={{
                    backgroundImage: "url('/Vector.svg')",
                  }}
                />

              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-sm font-medium text-[#2b2b2b] leading-snug mb-3">
                  {book.title}
                </h3>

                {/* Volume (if exists) */}
                {book.volume && (
                  <p className="text-xs text-gray-500 mb-1">
                    {book.volume}
                  </p>
                )}

                {/* Author */}
                <p className="text-xs text-gray-500">
                  {book.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLibrarySection;
