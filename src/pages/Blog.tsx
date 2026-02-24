import {
  BlogHeroSection,
  BlogCategoryFilter,
  BlogFeaturedSection,
  BlogLatestArticles,
  BlogLibrarySection,
  BlogNewsletterSection,
} from '../components/blog';

const Blog = () => {
  return (
    <div>
      <BlogHeroSection />
      <div className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <BlogCategoryFilter />
          <BlogFeaturedSection />
        </div>
      </div>
      <BlogLatestArticles />
      <BlogLibrarySection />
      <BlogNewsletterSection />
    </div>
  );
};

export default Blog;
