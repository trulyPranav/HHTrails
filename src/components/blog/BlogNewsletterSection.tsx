import { BookOpen } from 'lucide-react';

const BlogNewsletterSection = () => {
  return (
    <div className="w-full bg-[#281910] py-20 mt-16 -mb-16">
      <div className="max-w-4xl mx-auto px-6 text-white">
        {/* Top Icon */}
        <div className="flex justify-center mb-6">
          <BookOpen className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">
          Join Our Heritage Community
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-300 text-center max-w-xl mx-auto leading-relaxed mb-8">
          Receive cultural research updates, heritage stories, and insights from our field team documenting Little Tibet's living traditions.
        </p>

        {/* Email Input + Button Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          {/* Input Field */}
          <input
            type="email"
            placeholder="Your email address"
            className="w-full md:w-80 h-[42px] bg-transparent border border-gray-400 rounded-md px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
          />

          {/* Subscribe Button */}
          <button className="w-full md:w-auto h-[42px] px-6 bg-transparent border border-gray-400 text-white text-sm rounded-md hover:bg-white hover:text-[#2b1408] transition-all">
            Subscribe
          </button>
        </div>

        {/* Footnote Text */}
        <p className="text-xs text-gray-400 text-center mt-6">
          No spam. Only meaningful cultural narratives and research insights.
        </p>
      </div>
    </div>
  );
};

export default BlogNewsletterSection;
