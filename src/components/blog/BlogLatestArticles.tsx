import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../types/blog';

interface Props {
  blogs: Blog[];
}

const BlogLatestArticles = ({ blogs }: Props) => {
  const navigate = useNavigate();

  if (blogs.length === 0) return null;

  return (
    <div className="w-full bg-[#f5f5f5] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold text-[#2b2b2b] text-center mb-12">
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-[180px] overflow-hidden rounded-t-xl">
                {blog.coverImageUrl
                  ? <img src={blog.coverImageUrl} alt={blog.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gradient-to-br from-[#d6cfc8] to-[#b0a89e]" />}
                <div
                  className="absolute top-0 left-0 w-full h-[90px] bg-no-repeat bg-top bg-cover z-10 pointer-events-none"
                  style={{ backgroundImage: "url('/Vector.svg')" }}
                />
                <div className="absolute top-4 left-4 bg-[#f4a62a] text-white text-xs px-4 py-1 rounded-full font-medium z-20">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-semibold text-[#2b2b2b] mb-2 leading-snug line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {blog.shortDescription}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{blog.authorName}</span>
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

export default BlogLatestArticles
