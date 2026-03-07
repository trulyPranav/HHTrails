  import { useEffect, useState } from 'react';
  import ExperienceCard from './ExperienceCard';
  import { homeService } from '../../services/homeService';
  import type { HomeTour } from '../../types/home';

  import { useNavigate } from 'react-router-dom';

  interface ExperiencesSectionProps {
    tours?: HomeTour[] | null;
  }

  const experiences = [
    {
      id: "6657ee51-30d6-41f0-9654-22f2542960e8",
      image: 'assets/ImageWithFallback.svg',
      title: 'Silk Route Trails & Tales',
      duration: '9 Nights/10 Days',
      groupSize: '8–12 people',
    },
    {
      id: "08d1d67e-b2a7-4809-9645-3bb82023954f",
      image: 'assets/ImageWithFallback (1).svg',
      title: 'Volunteer Tourism',
      duration: '5 Nights/7 Days',
      groupSize: '6–10 people',
    },
    {
      id: "008a5212-1ebe-4b97-a867-3484bc08615f",
      image: 'assets/ImageWithFallback (2).svg',
      title: 'Cultural & Heritage Tour',
      duration: 'Customise / Flexible',
      groupSize: '4–6 people',
    },
  ];

  const ExperiencesSection = ({ tours }: ExperiencesSectionProps) => {
    const [recommended, setRecommended] = useState<HomeTour[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (!import.meta.env.VITE_API_BASE_URL) return;
      homeService.recommended()
        .then(setRecommended)
        .catch((err) => console.error('Failed to load recommended tours', err));
    }, []);

    // tours prop = active search results (null means no search yet)
    const toMap = (t: HomeTour) => ({
      id: t.id,
      image: t.photoUrl || 'assets/ImageWithFallback.svg',
      title: t.title,
      duration: `${t.durationNights} Nights/${t.durationDays} Days`,
      groupSize: t.region,
    });

    const displayCards = tours !== null && tours !== undefined
      ? tours.map(toMap)
      : recommended
        ? recommended.map(toMap)
        : experiences;

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
          {displayCards.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-12">No tours found for your search.</p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCards.map((experience) => (
              <ExperienceCard
                id={experience.id}
                image={experience.image}
                title={experience.title}
                duration={experience.duration}
                groupSize={experience.groupSize}
              />
            ))}
          </div>
          )}
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
            <button 
            onClick={() => navigate('/tours')}
            className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors duration-300">
              See All Tours →
            </button>
          </div>
      </section>
    );
  };

  export default ExperiencesSection;