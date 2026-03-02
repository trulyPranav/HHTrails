import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { Blog } from '../types/blog';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        setBlog(await blogService.getBlog(id));
      } catch {
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading article…</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">{error ?? 'Article not found.'}</p>
        <button onClick={() => navigate('/blog')} className="text-sm text-[#2b1b14] hover:underline">
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-white">
      {/* Hero image */}
      {blog.coverImageUrl && (
        <div className="w-full h-48 sm:h-[420px] overflow-hidden">
          <img src={blog.coverImageUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-[720px] mx-auto px-6 py-12">
        {/* Back */}
        <button
          onClick={() => navigate('/blog')}
          className="text-sm text-gray-500 hover:text-[#2b1b14] mb-8 flex items-center gap-1"
        >
          ← Back to Blog
        </button>

        {/* Category badge */}
        <span className="inline-block bg-[#F4A62A] text-white text-xs px-4 py-1.5 rounded-full font-medium mb-4">
          {blog.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#2b2b2b] leading-tight mb-4">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <span className="font-medium text-[#2b1b14]">{blog.authorName}</span>
          <span>·</span>
          <span>{blog.publishedDate}</span>
          <span>·</span>
          <span>{blog.readingTimeMinutes} min read</span>
        </div>

        {/* Short description */}
        <p className="text-base text-gray-600 leading-relaxed mb-8 italic border-l-4 border-[#F4A62A] pl-4">
          {blog.shortDescription}
        </p>

        {/* Content */}
        <div
          className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}
