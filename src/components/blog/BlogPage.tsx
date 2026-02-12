const BlogPage = () => {
  return (
    <div>
      {/* Hero Banner Section */}
      <div className="relative w-full h-[200px] md:h-[260px] overflow-hidden">
        {/* Background Image Placeholder */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat  h-48 mt-[72px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url('assets/Container.svg')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-berlin font-semiboldtext-white mb-3 tracking-wide">
            Blog & Stories
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm text-gray-200 max-w-xl leading-relaxed">
            Explore journeys, culture, travel wisdom, and stories from the Himalayas.
          </p>
        </div>
      </div>

      
    </div>


  );
};

export default BlogPage;