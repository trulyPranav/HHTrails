import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';
import 'swiper/css';

// Images from public/assets/img folder
const slides = [
  { id: 1, image: '/public/img/Rectangle 41.png', alt: 'Slide 1' },
  { id: 2, image: '/public/img/Rectangle 42.png', alt: 'Slide 2' },
  { id: 3, image: '/public/img/Rectangle 43.png', alt: 'Slide 3' },
  { id: 4, image: '/public/img/Rectangle 44.png', alt: 'Slide 4' },
  { id: 5, image: '/public/img/Rectangle 45.png', alt: 'Slide 5' },
  { id: 6, image: '/public/img/Rectangle 46.png', alt: 'Slide 6' },
  { id: 7, image: '/public/img/Rectangle 47.png', alt: 'Slide 7' },
  { id: 8, image: '/public/img/Rectangle 48.png', alt: 'Slide 8' },
];

// 🔁 Duplicate slides to fake infinity
const repeatedSlides = [
  ...slides,
  ...slides,
  ...slides,
  ...slides,
];

const Home = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    let rafId;
    const SPEED = 1; // px per frame

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
      <div className="max-w-4xl mx-auto text-center pt-24 px-6 font-berlin">
        <div className="max-w-4xl mx-auto text-center pt-24 px-6">
  <p className="font-berlin text-[#F4A321] text-lg tracking-widest mb-4">
    JULLEY !!
  </p>

  <h1 className="font-berlin text-white text-4xl md:text-5xl font-bold leading-tight">
    AN INSIGHT INTO THE LEGACY
    <br />
    OF MOUNTAINS
  </h1>
</div>

      </div>

      {/* Panorama Swiper */}
      <section className="panorama-section">
        <div className="panorama-container">
          <div className="panorama-swiper">
            <Swiper
              slidesPerView="auto"
              spaceBetween={20}
              allowTouchMove={false}
              loop={false}
              speed={0}
              className="panorama-swiper-instance"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {repeatedSlides.map((slide, index) => (
                <SwiperSlide key={index} className="panorama-slide">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    draggable={false}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="mt-20 px-6">
        <div className="max-w-5xl mx-auto bg-[#5C544A] rounded-2xl shadow-2xl p-4">
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            
            {/* Destination Input */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-white rounded-xl">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Destination</p>
                <input
                  type="text"
                  placeholder="Search tours..."
                  className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* From Date Input */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-white rounded-xl">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">From</p>
                <input
                  type="text"
                  placeholder="27 - Nov - 2025"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                  className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Till Date Input */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-white rounded-xl">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Till</p>
                <input
                  type="text"
                  placeholder="30 - Nov - 2025"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                  className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#F4A321] hover:bg-[#E09419] text-[#1F1F1F] font-semibold px-10 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;