import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import type { Blog } from '../types/blog';
import { marked } from "marked";
marked.setOptions({
  gfm: true,
  breaks: true
});

// ── Reading progress bar ──────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-[#F4A62A] transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#FAFAF8]">
      {/* Hero skeleton */}
      <div className="w-full h-[420px] bg-gray-200 animate-pulse" />

      <div className="w-full max-w-[720px] mx-auto px-6 sm:px-10 lg:px-8 py-12">
        {/* Badge */}
        <div className="h-6 w-24 rounded-full bg-gray-200 animate-pulse mb-6" />
        {/* Title */}
        <div className="space-y-3 mb-8">
          <div className="h-9 bg-gray-200 animate-pulse rounded-md w-full" />
          <div className="h-9 bg-gray-200 animate-pulse rounded-md w-4/5" />
        </div>
        {/* Meta */}
        <div className="flex gap-4 mb-10">
          <div className="h-4 w-28 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
        </div>
        {/* Body */}
        <div className="space-y-3">
          {[100, 90, 95, 70, 85, 92, 60, 88].map((w, i) => (
            <div
              key={i}
              className="h-4 bg-gray-200 animate-pulse rounded"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Error / Not found ─────────────────────────────────────────────────────────
function NotFound({ message, onBack }: { message: string; onBack: () => void }) {
  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#F4A62A]/40 flex items-center justify-center text-3xl">
        📄
      </div>
      <div>
        <p className="text-xl font-semibold text-[#1a1a1a] mb-2">Article not found</p>
        <p className="text-sm text-gray-400">{message}</p>
      </div>
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#2b1b14] hover:bg-[#F4A62A] px-6 py-3 rounded-full transition-all duration-200"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
        Back to Blog
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const parsedContent = blog?.content
  ? marked.parse(blog.content)
  : "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        setBlog(await blogService.getBlog(id));
      } catch {
        setError('We couldn\'t find the article you are looking for.');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [id]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (loading) return <Skeleton />;
  if (error || !blog) return <NotFound message={error ?? 'Article not found.'} onBack={() => navigate('/blog')} />;

  return (
    <>
      <ReadingProgress />

      <article
        ref={articleRef}
        className="flex-grow pt-[52px] min-h-screen bg-[#FAFAF8] w-full overflow-x-hidden"
      >

        
        {/* ── Article body ────────────────────────────────────────────── */}
        <div className="w-full max-w-[720px] mx-auto px-6 sm:px-10 lg:px-8">

          {/* ── Header card ─────────────────────────────────────────── */}
          <header className="py-10 sm:py-14 border-b border-gray-200">

            {/* Back + Category row */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
          

              <span className="inline-flex items-center bg-[#FEF3DC] text-[#C47F0A] text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#F4A62A]/30">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-extrabold text-[#0f0f0f] leading-[1.15] tracking-tight mb-6">
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-gray-500">
              {/* Author avatar placeholder */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F4A62A]/20 flex items-center justify-center text-[11px] font-bold text-[#C47F0A] uppercase flex-shrink-0">
                  {blog.authorName?.[0] ?? 'A'}
                </div>
                <span className="font-semibold text-[#2b1b14] text-[13px]">{blog.authorName}</span>
              </div>

              <Dot />

              <time dateTime={blog.publishedDate} className="tabular-nums">
                {blog.publishedDate}
              </time>

              <Dot />

              <span className="flex items-center gap-1">
                <ClockIcon />
                {blog.readingTimeMinutes} min read
              </span>
            </div>
          </header>

          {/* ── Pull quote ──────────────────────────────────────────── */}
          <div className="my-10 sm:my-12">
            <blockquote className="relative pl-6 border-l-[3px] border-[#F4A62A]">
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed italic font-light">
                {blog.shortDescription}
              </p>
            </blockquote>
          </div>

            {/* ── Body ────────────────────────────────────────────────── */}
          <div
            className={[
              "prose max-w-none",
              "prose-base sm:prose-lg",

              // headings
              "prose-headings:font-bold",
              "prose-headings:text-[#0f0f0f]",
              "prose-headings:tracking-tight",

              "prose-h1:text-4xl",
              "prose-h1:mt-16",
              "prose-h1:mb-8",

              "prose-h2:text-3xl",
              "prose-h2:mt-14",
              "prose-h2:mb-6",

              "prose-h3:text-2xl",
              "prose-h3:mt-10",
              "prose-h3:mb-4",

              "prose-h4:text-xl",
              "prose-h4:mt-8",
              "prose-h4:mb-3",

              // paragraph
              "prose-p:text-[#3a3a3a]",
              "prose-p:leading-relaxed",
              "prose-p:text-justify",

              // links
              "prose-a:text-[#C47F0A]",
              "prose-a:no-underline",
              "hover:prose-a:underline",

              // lists
              "prose-ul:pl-6",
              "prose-ol:pl-6",

              // blockquote
              "prose-blockquote:border-l-4",
              "prose-blockquote:border-[#F4A62A]",
              "prose-blockquote:bg-[#FEF9F0]",
              "prose-blockquote:px-6",
              "prose-blockquote:py-3",

              // images
              "prose-img:rounded-xl",
              "prose-img:shadow",

            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />

          {/* ── Footer ──────────────────────────────────────────────── */}
          <footer className="mt-16 pt-10 border-t border-gray-200 pb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

              {/* Author card */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#F4A62A]/15 flex items-center justify-center text-base font-extrabold text-[#C47F0A] uppercase flex-shrink-0 border border-[#F4A62A]/20">
                  {blog.authorName?.[0] ?? 'A'}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">Written by</p>
                  <p className="text-sm font-bold text-[#1a1a1a]">{blog.authorName}</p>
                </div>
              </div>

              {/* Back button */}
              <button
                onClick={() => navigate('/blog')}
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#2b1b14] border border-[#2b1b14]/20 hover:border-[#F4A62A] hover:text-[#F4A62A] px-5 py-2.5 rounded-full transition-all duration-200"
              >
                <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
                Back to all articles
              </button>

            </div>
          </footer>
        </div>
      </article>
    </>
  );
}

// ── Tiny helpers ──────────────────────────────────────────────────────────────
function Dot() {
  return <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />;
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}