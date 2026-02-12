import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { useEffect, useRef } from 'react';
import 'swiper/css';

// Images from public/assets/img folder
const slides = [
  { id: 1, image: 'img/Rectangle 41.png', alt: 'Slide 1' },
  { id: 2, image: 'img/Rectangle 42.png', alt: 'Slide 2' },
  { id: 3, image: 'img/Rectangle 43.png', alt: 'Slide 3' },
  { id: 4, image: 'img/Rectangle 44.png', alt: 'Slide 4' },
  { id: 5, image: 'img/Rectangle 45.png', alt: 'Slide 5' },
  { id: 6, image: 'img/Rectangle 46.png', alt: 'Slide 6' },
  { id: 7, image: 'img/Rectangle 47.png', alt: 'Slide 7' },
  { id: 8, image: 'img/Rectangle 48.png', alt: 'Slide 8' },
];

// 🔁 Duplicate slides to fake infinity
const repeatedSlides = [
  ...slides,
  ...slides,
  ...slides,
  ...slides,
];

const Home = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    let rafId: number | null = null;
    const SPEED = 5; // px per frame

    // Wait for swiper to be fully initialized
    setTimeout(() => {
      const resetPoint = swiper.wrapperEl.scrollWidth / 2;

      const animate = () => {
        if (!swiper.destroyed) {
          swiper.setTranslate(swiper.translate - SPEED);

          // seamless reset
          if (Math.abs(swiper.translate) >= resetPoint) {
            swiper.setTranslate(0);
          }

          rafId = requestAnimationFrame(animate);
        }
      };

      animate();
    }, 100);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#2B1E17]">
      {/* Hero Text */}
      <div className="max-w-4xl mx-auto text-center pt-8 px-6 mb-0">
        <p className="font-berlin text-[#F4A321] text-3xl mb-2">
          JULLEY !!
        </p>

        <h1 className="font-berlin text-white text-4xl font leading-snug mb-0 tracking-wide">
          AN INSIGHT INTO THE LEGACY
          <br />
          OF MOUNTAINS
        </h1>
      </div>

      {/* Panorama Swiper */}
      <section className="w-full relative z-10 -mt-16">
        <div className="w-full relative">
          <div className="panorama-mask overflow-x-clip relative z-[1] will-change-transform translate-z-0">
            <Swiper
              slidesPerView="auto"
              spaceBetween={40}
              allowTouchMove={false}
              loop={false}
              speed={1}
              className="[&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-center [&_.swiper-wrapper]:justify-start [&_.swiper-wrapper]:!transition-timing-function-linear"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {repeatedSlides.map((slide, index) => (
                <SwiperSlide key={index} className="w-[22%] lg:w-[22%] md:w-[45%] sm:w-full flex-shrink-0 flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    draggable={false}
                    className="w-full h-full object-cover aspect-[2.5/4] will-change-transform [backface-visibility:hidden] [perspective:1000px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="mb-11 px-4 -mt-12">
        <div className="max-w-4xl mx-auto bg-[#6A5F56] rounded-lg shadow-xl p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

            {/* Destination */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 leading-none">Destination</p>
                <input
                  type="text"
                  placeholder="Search tours..."
                  className="w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* From */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 leading-none">From</p>
                <input
                  type="text"
                  placeholder="27 - Nov - 2025"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  className="w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Till */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 leading-none">Till</p>
                <input
                  type="text"
                  placeholder="30 - Nov - 2025"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  className="w-full outline-none text-xs text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#F4A321] hover:bg-[#E09419] text-[#1F1F1F] text-sm font-medium px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>

          </div>
        </div>
      </div>

      {/* Top Experiences Section */}
      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-[#2b2b2b] mb-2">
              Top Experiences
            </h2>
            <p className="text-sm text-gray-500">
              Discover our most popular adventures
            </p>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - Silk Route Trails & Tales */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
              {/* Image Placeholder */}
             <div className="relative h-[250px] overflow-hidden">
                  <img
                    src="assets/ImageWithFallback.svg"
                    alt="Silk Route Trails & Tales"
                    className="w-full h-full object-cover"
                  />
                {/* Placeholder Image Icon */}
                <div className="text-gray-600 opacity-30">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Trending Badge */}
                <span className="absolute top-3 left-3 bg-[#F4A321] text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  🔥 Trending
                </span>
                {/* Rating Badge */}
                <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  ⭐ 4.9
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#2b2b2b] mb-2">
                  Silk Route Trails & Tales
                </h3>
                <div className="text-xs text-gray-500 mb-4">
                  <p>9 Nights/10 Days</p>
                  <p>8–12 people</p>
                </div>
                <button className="w-full bg-[#2b1b14] hover:bg-[#3a261e] text-white text-sm rounded-md py-2 transition-colors duration-300">
                  View Details →
                </button>
              </div>
            </div>

            {/* Card 2 - Volunteer Tourism */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
              {/* Image Placeholder */}
             <div className="relative h-[250px] overflow-hidden">
                  <img
                    src="assets/ImageWithFallback (1).svg"
                    alt="Silk Route Trails & Tales"
                    className="w-full h-full object-cover"
                  />
                {/* Placeholder Image Icon */}
                <div className="text-gray-600 opacity-30">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Trending Badge */}
                <span className="absolute top-3 left-3 bg-[#F4A321] text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  🔥 Trending
                </span>
                {/* Rating Badge */}
                <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  ⭐ 4.9
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#2b2b2b] mb-2">
                  Volunteer Tourism
                </h3>
                <div className="text-xs text-gray-500 mb-4">
                  <p>5 Nights/7 Days</p>
                  <p>6–10 people</p>
                </div>
                <button className="w-full bg-[#2b1b14] hover:bg-[#3a261e] text-white text-sm rounded-md py-2 transition-colors duration-300">
                  View Details →
                </button>
              </div>
            </div>

            {/* Card 3 - Cultural & Heritage Tour */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1">
              {/* Image Placeholder */}
             <div className="relative h-[250px] overflow-hidden">
                  <img
                    src="assets/ImageWithFallback (2).svg"
                    alt="Silk Route Trails & Tales"
                    className="w-full h-full object-cover"
                  />
                {/* Placeholder Image Icon */}
                <div className="text-gray-600 opacity-30">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Trending Badge */}
                <span className="absolute top-3 left-3 bg-[#F4A321] text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  🔥 Trending
                </span>
                {/* Rating Badge */}
                <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs rounded-full px-3 py-1 flex items-center gap-1">
                  ⭐ 4.9
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#2b2b2b] mb-2">
                  Cultural & Heritage Tour
                </h3>
                <div className="text-xs text-gray-500 mb-4">
                  <p>Customise / Flexible</p>
                  <p>4–6 people</p>
                </div>
                <button className="w-full bg-[#2b1b14] hover:bg-[#3a261e] text-white text-sm rounded-md py-2 transition-colors duration-300">
                  View Details →
                </button>
              </div>
            </div>
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

      <section className="w-full bg-[#f3f3f3] py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-[#2b2b2b] mb-2">
              Upcoming Tours
            </h2>
            <p className="text-sm text-gray-500">
              Join us on our adventures
            </p>
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Silk Route Trails & Tales */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
              {/* Image Placeholder */}
              <div className="relative h-[250px] overflow-hidden">
                  <img
                    src="assets/ImageWithFallback (3).svg"
                    alt="Silk Route Trails & Tales"
                    className="w-full h-full object-cover"
                  />
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#2b2b2b] mb-3">
                  Silk Route Trails & Tales
                </h3>
                
                {/* Meta Information */}
                <div className="space-y-2">
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>9 Nights/10 Days</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Nubra Valley</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Himalayan Festivals */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
              {/* Image Placeholder */}
               <div className="relative h-[250px] overflow-hidden">
                  <img
                    src="assets/ImageWithFallback (4).svg"
                    alt="Silk Route Trails & Tales"
                    className="w-full h-full object-cover"
                  />
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#2b2b2b] mb-3">
                  Himalayan Festivals
                </h3>
                
                {/* Meta Information */}
                <div className="space-y-2">
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>4 Nights/5 Days</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Various Himalayan Regions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Bon & Balti */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
              {/* Image Placeholder */}
               <div className="relative h-[250px] overflow-hidden">
                  <img
                    src="assets/ImageWithFallback (5).svg"
                    alt="Bon & Balti"
                    className="w-full h-full object-cover"
                  />
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-base font-medium text-[#2b2b2b] mb-3">
                  Bon & Balti
                </h3>
                
                {/* Meta Information */}
                <div className="space-y-2">
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>9 Nights/10 Days</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Nubra Valley / Kargil</span>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Home;