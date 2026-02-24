import { Compass, Landmark, Lightbulb, Leaf, Camera } from 'lucide-react';

const BlogCategoryFilter = () => {
  return (
    <div className="mb-12">
      {/* First Row */}
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        <button className="h-9 px-5 rounded-full text-xs font-medium bg-[#2b1b14] text-white">
          All
        </button>
        <button className="h-9 px-5 rounded-full text-xs font-medium  bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2 ">
          <Compass size={14} />
          Travel Stories
        </button>
        <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Landmark size={14} />
          Culture & Heritage
        </button>
        <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Lightbulb size={14} />
          Tips & Guides
        </button>
        <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Leaf size={14} />
          Sustainability & Volunteering
        </button>
      </div>
      
      {/* Second Row - Centered */}
      <div className="flex justify-center">
        <button className="h-9 px-5 rounded-full text-xs font-medium bg-white border border-black/50 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <Camera size={14} />
          Photography
        </button>
      </div>
    </div>
  );
};

export default BlogCategoryFilter;
