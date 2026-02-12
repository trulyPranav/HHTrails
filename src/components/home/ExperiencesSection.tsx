import ExperienceCard from './ExperienceCard';

const experiences = [
  {
    id: 1,
    image: 'assets/ImageWithFallback.svg',
    title: 'Silk Route Trails & Tales',
    duration: '9 Nights/10 Days',
    groupSize: '8–12 people',
  },
  {
    id: 2,
    image: 'assets/ImageWithFallback (1).svg',
    title: 'Volunteer Tourism',
    duration: '5 Nights/7 Days',
    groupSize: '6–10 people',
  },
  {
    id: 3,
    image: 'assets/ImageWithFallback (2).svg',
    title: 'Cultural & Heritage Tour',
    duration: 'Customise / Flexible',
    groupSize: '4–6 people',
  },
];

const ExperiencesSection = () => {
  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-2">
          <h2 className="font-berlin text-3xl font text-[#2b2b2b] mb-2">
            Top Experiences
          </h2>
          <p className="font-sans text-base tracking-tight font-normal text-[#4A5565]">
            Discover our most popular adventures
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              image={experience.image}
              title={experience.title}
              duration={experience.duration}
              groupSize={experience.groupSize}
            />
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {/* Left Arrow Button */}
          <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-300">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-300">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* See All Tours Button */}
          <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors duration-300">
            See All Tours →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
