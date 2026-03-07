  import { Swiper, SwiperSlide } from "swiper/react";
  import type { Swiper as SwiperType } from "swiper";
  import { useEffect, useRef } from "react";
  import "swiper/css";

  const slides = [
    { id: 1, image: "img/Rectangle 41.png", alt: "Slide 1" },
    { id: 2, image: "img/Rectangle 42.png", alt: "Slide 2" },
    { id: 3, image: "img/Rectangle 43.png", alt: "Slide 3" },
    { id: 4, image: "img/Rectangle 44.png", alt: "Slide 4" },
    { id: 5, image: "img/Rectangle 45.png", alt: "Slide 5" },
    { id: 6, image: "img/Rectangle 46.png", alt: "Slide 6" },
    { id: 7, image: "img/Rectangle 47.png", alt: "Slide 7" },
    { id: 8, image: "img/Rectangle 48.png", alt: "Slide 8" },
  ];

  // duplicate slides
  const repeatedSlides = [ ...slides, ...slides, ...slides];

  const PanoramaSwiper = () => {
    const swiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
      const swiper = swiperRef.current;
      if (!swiper) return;

      let rafId: number;

      const animate = () => {
        if (!swiper.destroyed) {

        const speed =
          window.innerWidth < 500 ? 2 :
          window.innerWidth < 640 ? 4 : 6;

          swiper.setTranslate(swiper.translate - speed);

          const wrapperWidth = swiper.wrapperEl.scrollWidth;
          const half = wrapperWidth / 3;

          if (Math.abs(swiper.translate) >= half) {
            swiper.setTranslate(swiper.translate + half);
          }

          rafId = requestAnimationFrame(animate);
        }
      };

      rafId = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(rafId);
    }, []);

    return (
      <section className="w-full relative z-10 -mt-[60px] sm:-mt-[80px] md:-mt-[110px] lg:-mt-[160px]">
        <div className="panorama-mask overflow-x-clip">
          <Swiper
            slidesPerView="auto"
            spaceBetween={window.innerWidth < 550 ? 16 : 40}
            allowTouchMove={false}
            speed={0}
            loop={false}
            className="[&_.swiper-wrapper]:flex [&_.swiper-wrapper]:items-center"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {repeatedSlides.map((slide, i) => (
              <SwiperSlide
                key={i}
                className="w-[calc((100%-32px)/3)] sm:w-[calc((100%-120px)/4)] flex-shrink-0 flex justify-center"
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  draggable={false}
                  className="w-full h-[260px] sm:h-[350px] md:h-[370px] lg:h-[450px] object-cover transition-transform duration-500 hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  };

  export default PanoramaSwiper;