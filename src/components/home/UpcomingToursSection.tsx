import TourCard from './TourCard';

const upcomingTours = [
  {
    id: 1,
    image: 'assets/ImageWithFallback (3).svg',
    title: 'Silk Route Trails & Tales',
    duration: '9 Nights/10 Days',
    location: 'Nubra Valley',
  },
  {
    id: 2,
    image: 'assets/ImageWithFallback (4).svg',
    title: 'Himalayan Festivals',
    duration: '4 Nights/5 Days',
    location: 'Various Himalayan Regions',
  },
  {
    id: 3,
    image: 'assets/ImageWithFallback (5).svg',
    title: 'Bon & Balti',
    duration: '9 Nights/10 Days',
    location: 'Nubra Valley / Kargil',
  },
];

const UpcomingToursSection = () => {
  return (
    <section className="w-full bg-[#f3f3f3] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-2">
          <h2 className="font-berlin text-3xl font text-[#2b2b2b] mb-2">
            Upcoming Tours
          </h2>
          <p className="font-sans text-base tracking-tight font-normal text-[#4A5565]">
            Join us on our adventures
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingTours.map((tour) => (
            <TourCard
              key={tour.id}
              image={tour.image}
              title={tour.title}
              duration={tour.duration}
              location={tour.location}
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
          <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-5 py-2 text-sm text-gray-700 transition-colors duration-300">
            See All Tours →
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingToursSection;
