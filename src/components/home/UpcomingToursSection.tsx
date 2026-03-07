import { useEffect, useState } from 'react';
import TourCard from './TourCard';
import { Compass, BookOpen, Gift, Heart, Shield, Award } from 'lucide-react';
import { homeService } from '../../services/homeService';
import type { HomeTour } from '../../types/home';

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
const features = [
  {
    icon: Compass,
    title: 'Sharing Experience',
    description: 'HHT reflects Dr Sonam Wangchok’s aspiration to share his experiences, research and knowledge of cultural and natural heritage of the Himalayas with the visiting guests. The tour programme and itinerary of HHT are being developed under his supervision and guidance.'
  },
  {
    icon: BookOpen,
    title: 'Enriching Knowledge',
    description: 'Believing in “travel is more than the seeing of sights” we always try to enrich visitors’ knowledge with storytelling of Himalayan heritage, recounting history, tradition wisdom, iconographies, mystic practices, local legends and discovering tangible sites.'
  },
  {
    icon: Gift,
    title: 'More Rewarding',
    description: 'Heritage Himalaya Trails always has something new to offer which you might not have expected. Each experience is thoughtfully crafted to reveal the soul of the Himalayas.'
  },
  {
    icon: Heart,
    title: 'Travel for a Cause',
    description: 'When you travel with HHT, your journey becomes a meaningful contribution—supporting local initiatives dedicated to preserving the rich cultural and natural heritage of mountain communities, helping them thrive for generations to come.'
  },
  {
    icon: Shield,
    title: 'Ethical Hospitality',
    description: 'We design your itinerary to match your interests, preference, schedule, and budget. Ensure it in a sense that combining experience, ethical journeys, respect for Himalayan eco-cultural diversity. Your satisfaction is our true goal!'
  },
  {
    icon: Award,
    title: 'Licensed & Certified',
    description: 'As an officially registered company with the Department of Tourism, UT Ladakh, we meet all safety standards and operate regulatory requirements, giving you confidence and peace of mind in every journey.'
  }
];
const UpcomingToursSection = () => {
  const [apiTours, setApiTours] = useState<HomeTour[] | null>(null);

  useEffect(() => {
    if (!import.meta.env.VITE_API_BASE_URL) return;
    homeService.recommended()
      .then(setApiTours)
      .catch((err) => console.error('Failed to load recommended tours', err));
  }, []);

  const displayTours = apiTours
    ? apiTours.map((t) => ({
        id: t.id,
        image: t.photoUrl || 'assets/ImageWithFallback (3).svg',
        title: t.title,
        duration: `${t.durationNights} Nights/${t.durationDays} Days`,
        location: t.region,
      }))
    : upcomingTours;

  return (
     <>
    <section className="w-full bg-[#f3f3f3] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-2">
          <h2 className="font-berlin text-3xl font text-[#281910] mb-2">
            Upcoming Tours
          </h2>
          <p className="font-sans text-base tracking-tight font-normal text-[#4A5565]">
            Join us on our adventures
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTours.map((tour) => (
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
    
    <section className="w-full bg-gradient-to-b from-[#2b1408] via-[#281910] to-[#281910] py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Center Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-11 h-11 rounded-full bg-[#f4a62a] flex items-center justify-center shadow-[0_0_20px_rgba(244,166,42,0.4)]">
              <Compass className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-2xl font-semibold text-white text-center mb-3">
            Why Travel With Us
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-gray-300 max-w-2xl mx-auto text-center mb-12 leading-relaxed">
            We offer more than tours — we create transformative cultural experiences rooted in authenticity, expertise, and respect.
          </p>

          {/* Feature Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-3px] hover:bg-[rgba(255,255,255,0.08)]"
                >
                  {/* Icon Circle */}
                  <div className="w-9 h-9 rounded-full bg-[#f4a62a] flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-normal text-white mb-2">
                    {feature.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
     </>
  );
};

export default UpcomingToursSection;
