import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../types/blog';

interface Props {
  blogs: Blog[];
}

const BlogFeaturedSection = ({ blogs }: Props) => {
  const navigate = useNavigate();
  const [featured, ...rest] = blogs;
  const sideBlogs = rest.slice(0, 2);

  if (!featured) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6 lg:gap-10">

        {/* ── Featured Blog ── */}
        <div
          className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => navigate(`/blog/${featured.id}`)}
        >
          {/* Image */}
          <div className="relative h-48 sm:h-64 md:h-[320px] lg:h-[420px]">
            {featured.coverImageUrl ? (
              <img
                src={featured.coverImageUrl}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#d6cfc8] to-[#b0a89e]" />
            )}

            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#F4A62A] text-white text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-medium">
              {featured.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 lg:p-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2b2b2b] mb-2 sm:mb-3 leading-snug">
              {featured.title}
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
              {featured.shortDescription}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
              <span>{featured.authorName}</span>
              <span className="text-gray-300">•</span>
              <span>{featured.category}</span>
              <span className="text-gray-300">•</span>
              <span>{featured.publishedDate}</span>
              <span className="text-gray-300">•</span>
              <span>{featured.readingTimeMinutes} min</span>

              <span className="ml-auto font-semibold text-[#2b1b14] hover:underline whitespace-nowrap">
                Read Full Story →
              </span>
            </div>
          </div>
        </div>

        {/* ── Side Blogs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
          {sideBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              {/* Image */}
              <div className="relative h-36 sm:h-40 md:h-44 lg:h-[190px]">
                {blog.coverImageUrl ? (
                  <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#d6cfc8] to-[#b0a89e]" />
                )}

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#F4A62A] text-white text-[10px] sm:text-xs px-3 py-1 sm:px-4 sm:py-1.5 rounded-full font-medium">
                  {blog.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-base lg:text-[17px] font-bold text-[#2b2b2b] mb-2 leading-snug line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs text-gray-400">
                  {blog.authorName}
                  <span className="mx-1 text-gray-300">•</span>
                  {blog.readingTimeMinutes} min read
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogFeaturedSection;