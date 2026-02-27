const BlogLatestArticles = () => {
  const articles = [
    {
      id: 1,
      category: "Travel Stories",
      title: "Walking the Silk Route: Cultural Legacies Beyond Trade",
      description: "An overview of how Silk Route networks shaped Ladakh's cultural exchange,",
      author: "Heritage Himalaya Trails",
      image: "assets/ImageWithFallback (1).svg"
    },
    {
      id: 2,
      category: "Sustainability & Volunteering",
      title: "Belief Systems and Climate Adaptation in Ladakh",
      description: "Insights from Dr. Sonam Wangchok's research on traditional belief systems",
      author: "Dr. Sonam Wangchok",
      image: "assets/ImageWithFallback (5).svg"
    },
    {
      id: 3,
      category: "Culture & Heritage",
      title: "Village Life in Ladakh: A Cultural Perspective",
      description: "Understanding Ladakhi village systems, social values, and everyday cultural",
      author: "HHT Field Team",
      image: "assets/ImageWithFallback.svg"
    }
  ];

  return (
    <div className="w-full bg-[#f5f5f5] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-[#2b2b2b] text-center mb-12">
          Latest Articles
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image Section */}
             {/* Image Section */}
              <div className="relative h-[180px] overflow-hidden rounded-t-xl">

                {/* Main Image */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />

                {/* Top Curved Overlay (Gap-Free Version) */}
                <div
                  className="absolute top-0 left-0 w-full h-[90px] bg-no-repeat bg-top bg-cover z-10 pointer-events-none"
                  style={{
                    backgroundImage: "url('/Vector.svg')",
                  }}
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-[#f4a62a] text-white text-xs px-4 py-1 rounded-full font-medium z-20">
                  {article.category}
                </div>

              </div>
              {/* Card Body */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-base font-semibold text-[#2b2b2b] mb-2 leading-snug">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {article.description}
                </p>

                {/* Bottom Meta Row */}
                <div className="flex items-center text-xs text-gray-500">
                  <span>{article.author}</span>
                  <span className="ml-auto text-[#2b1b14] font-medium hover:underline cursor-pointer">
                    Read More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLatestArticles;
