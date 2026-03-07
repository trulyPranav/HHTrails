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
const repeatedSlides = [...slides, ...slides, ...slides, ...slides,];

const PanoramaSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    let rafId: number | null = null;

    // Wait for swiper to be fully initialized
    setTimeout(() => {
      const resetPoint = swiper.wrapperEl.scrollWidth / 2;

      const animate = () => {
        if (!swiper.destroyed) {
          // 👇 Dynamic speed calculation added here!
          // If window is < 640px, speed is 2. Otherwise, speed is 5.
          const currentSpeed = window.innerWidth < 640 ? 2 : 5; 
          
          swiper.setTranslate(swiper.translate - currentSpeed);

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
              <SwiperSlide
                key={index}
                className="
                  w-[calc((100%-120px)/4)]
                  flex-shrink-0 
                  flex 
                  justify-center
                "
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  draggable={false}
                  className="w-full h-full object-cover 
                    aspect-[2.5/5]
                    will-change-transform 
                    [backface-visibility:hidden] 
                    [perspective:1000px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PanoramaSwiper;