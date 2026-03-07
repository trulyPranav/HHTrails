import { Award, Eye, Users, MapPin, Heart, Leaf, Mountain, BookOpen, Building2, Clock,  UserCheck,Compass,Send} from 'lucide-react';
import { Link } from "react-router-dom";
export default function About() {
 

  //whatsapp redirect function
  const handleWhatsAppEnquiry = () => {
  const phoneNumber = "919622992881"; 
  const message = "Hello, I would like to enquire about your tours.";
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
};
  const timelineSteps = [
    {
      number: '01',
      title: 'Official Recognition',
      subtitle: 'Department of Tourism, U.T. Ladakh',
      description: 'Heritage Himalaya Trails is a specialized travel company officially registered with the Department of Tourism, U.T. Ladakh, India. Our commitment to authentic, responsible tourism is recognized and supported by local authorities.',
      image: '/Container-removebg-preview.png',
      imageAlt: 'Department of Tourism Badge',
      align: 'left',
      imageType: 'badge'
    },
    {
      number: '02',
      title: 'Ladakh "Little Tibet"',
      subtitle: 'Buddhist & Muslim Heritage',
      description: 'We focus particularly on Ladakh, celebrated for its vibrant Buddhist and Muslim heritage deeply influenced by Bon tradition. Known as "Little Tibet," this region forms the heart of our extended cultural tours, offering deep insight into ancient traditions and mountain communities.',
      image: 'Container (1).png',
      imageAlt: 'Buddhist monks in Ladakh',
      align: 'right',
      imageType: 'photo'
    },
    {
      number: '03',
      title: 'Immersive & Responsible',
      subtitle: 'Cultural Preservation & Connection',
      description: 'Our journeys are thoughtfully designed to preserve local culture and environment, while allowing visitors to engage authentically with the traditions and lifestyles of mountain communities. Every experience honors the land and its people.',
      image: 'Container (2).png',
      imageAlt: 'Cultural community gathering',
      align: 'left',
      imageType: 'photo'
    },
    {
      number: '04',
      title: 'Passionate Leadership',
      subtitle: 'Dr. Sonam Wangchok',
      description: 'Led by Dr. Sonam Wangchok, our experienced and passionate team is committed to delivering authentic and meaningful travel experiences. Whether you\'re an individual traveler or part of a group, we offer opportunities to connect with indigenous cultures and stunning natural beauty.',
      image: 'Container (3).png',
      imageAlt: 'Dr. Sonam Wangchok',
      align: 'right',
      imageType: 'photo'
    }
  ];
  
 const principles = [
    {
      icon: Heart,
      title: 'Authentic Experiences',
      description: 'We prioritize genuine connections with Ladakhi humanity, and the living culture of the Himalayas through immersive, story-driven journeys.'
    },
    {
      icon: BookOpen,
      title: 'Educational Focus',
      description: 'Every tour is a learning experience, offering insights into history, culture, ecology, and ways of life.'
    },
    {
      icon: Building2,
      title: 'Heritage Conservation',
      description: 'We actively contribute to preservation efforts, supporting monasteries, villages, and traditional practices.'
    },
    {
      icon: Clock,
      title: 'Slow Travel Philosophy',
      description: 'We believe in taking time to truly experience places rather than rushing through them, deeper understanding.'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Our team includes trained experts, local historians, and cultural professionals who bring journeys to life with knowledge and passion.'
    },
    {
      icon: UserCheck,
      title: 'Small Group Approach',
      description: 'We maintain group sizes that ensure personalized attention and minimize impact on local communities and environment.'
    }
  ];
  

  return (
    <div className="bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section */}
                <section
            className="relative flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: 'url("/Container4.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginTop: '72px',
              minHeight: 'clamp(260px, 40vw, 330px)',
              padding: 'clamp(32px, 6vw, 48px) clamp(16px, 5vw, 24px)',
            }}
          >
            <div className="absolute inset-0 bg-black/25"></div>
            <div
              className="relative z-10 text-center  font-berlin w-full mx-auto"
              style={{
                maxWidth: '760px',
                padding: '0 clamp(12px, 4vw, 14px)',
              }}
            >
              <h1
                style={{
                  color: '#281910',
                  fontWeight: 300,
                  fontSize: 'clamp(24px, 6vw, 46px)',
                  marginBottom: 'clamp(10px, 2vw, 16px)',
                  lineHeight: 1.2,
                 
                }}
              >
                About Us
              </h1>
              <p
                style={{
                  color: '#FFFDF8',
                  fontWeight: 200,
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  lineHeight: '1.6',
                  letterSpacing: '0.09em',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Heritage Himalaya Trails is more than a travel organization as we are storytellers, cultural ambassadors, and guardians of tradition, dedicated to creating meaningful journeys through the Himalayan heartland.
              </p>
            </div>
          </section>

      {/* Meet Our Founder Section */}
      <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Founder Header - Centered */}
          <div className="text-center   mb-12">
            <div className="font-berlin">
            <h2
              style={{
                color: '#2B1E17',
                fontWeight: 300,
                fontSize: 'clamp(24px, 4vw, 36px)',
               
              }}
            >
              Meet Our Founder
            </h2>
            </div>
            <h3 className="text-lg mb-1" style={{ color: '#2B1E17', fontWeight: 500 }}>
              Dr. Sonam Wangchok
            </h3>
            <p className="text-sm" style={{ color: '#F9AA29', fontWeight: 200 }}>
              Cultural Heritage Expert &amp; Guide
            </p>
          </div>

          {/* Founder Content - Responsive 2 Column Layout */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '0 8px',
            }}
          >
            {/* Responsive wrapper using media query via inline style trick */}
            <style>{`
              @media (min-width: 768px) {
                .founder-layout { flex-direction: row !important; align-items: flex-start !important; }
                .founder-image { width: 288px !important; height: 288px !important; }
                .cards-grid { grid-template-columns: 1fr 1fr !important; }
              }
              @media (max-width: 767px) {
                .founder-image { width: 100% !important; height: 220px !important; }
                .cards-grid { grid-template-columns: 1fr !important; }
                .timeline-row { flex-direction: column !important; }
                .timeline-image { width: 100% !important; }
                .bottom-bar-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
                .principles-grid { grid-template-columns: 1fr !important; }
                .values-grid { grid-template-columns: 1fr !important; }
                .cta-buttons { flex-direction: column !important; align-items: center !important; }
                .cta-button { max-width: 100% !important; width: 100% !important; }
                .timeline-step { flex-direction: column !important; }
              }
              @media (min-width: 768px) and (max-width: 1023px) {
                .cards-grid { grid-template-columns: 1fr 1fr !important; }
                .principles-grid { grid-template-columns: 1fr 1fr !important; }
                .values-grid { grid-template-columns: 1fr 1fr !important; }
                .timeline-img-container { height: 224px !important; max-height: 224px !important; overflow: hidden !important; }
                .timeline-img-container img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
              }
            `}</style>

            <div
              className="founder-layout"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '28px',
              }}
            >
              {/* Left Column - Image */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src="/imagewithfallback.png"
                  alt="Dr. Sonam Wangchok"
                  className="founder-image"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    display: 'block',
                  }}
                />
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                <p
                  style={{
                    color: '#6B5E55',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '1.4',
                    textAlign: 'justify',
                    margin: 0,
                  }}
                >
                  A leading authority on Ladakh’s heritage,
                   Dr. Wangchok has dedicated the past two 
                   decades to preserving the rich cultural
                  legacy of the Himalayas. A native of
                  Khardong village in the Nubra Valley
                   of Ladakh, he impeccably bridges academic 
                  expertise with deep lived cultural experience,
                   bringing scholarship and tradition together in
                   meaningful ways.
                </p>

                {/* Cards Grid */}
                <div
                  className="cards-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                  }}
                >
                  {/* Card 1 */}
                  <div style={{ padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#F9F8F4' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4A321', flexShrink: 0 }}>
                      <Mountain style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 400, color: '#2B1E17', margin: '0 0 4px 0' }}>Heritage Expert</h4>
                      <p style={{ fontSize: '16px', color: '#4A5565', margin: 0 }}>Preservation projects, Publications and Heritage Education</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div style={{ padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#F9F8F4' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4A321', flexShrink: 0 }}>
                      <Award style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 300, color: '#2B1E17', margin: '0 0 4px 0' }}>Academic Background</h4>
                      <p style={{ fontSize: '16px', color: '#4A5565', margin: 0 }}>Buddhist Cultural Study &amp;  Social Philosophy</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div style={{ padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#F9F8F4' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4A321', flexShrink: 0 }}>
                      <Eye style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#2B1E17', margin: '0 0 4px 0' }}>Specialization</h4>
                      <p style={{ fontSize: '16px', color: '#4A5565', margin: 0 }}>Cultural  &amp; Natural heritage</p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div style={{ padding: '16px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#F9F8F4' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4A321', flexShrink: 0 }}>
                      <Heart style={{ width: '20px', height: '20px', color: 'white' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#2B1E17', margin: '0 0 4px 0' }}>Local Roots</h4>
                      <p style={{ fontSize: '16px', color: '#4A5565', margin: 0 }}>Native Ladakhi from Khardong Village</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: '1px',
          paddingBottom: '40px',
          padding: '1px 24px 40px',
        }}
      >
        <div
          style={{
            maxWidth: '890px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              backgroundColor: '#1C120C',
              paddingTop: '20px',
              paddingBottom: '20px',
              paddingLeft: 'clamp(20px, 5vw, 48px)',
              paddingRight: 'clamp(20px, 5vw, 48px)',
              borderRadius: '16px',
            }}
          >
            <blockquote style={{ margin: '0 0 24px 0' }}>
              <p
                style={{
                  color: '#F3F4F1',
                  fontSize: 'clamp(13px, 2vw, 16px)',
                  fontWeight: 400,
                  lineHeight: '1.5',
                  textAlign: 'left',
                  margin: 0,
                }}
              >
                "Every stone in Ladakh has a story, every prayer flag carries a blessing, and every mountain pass holds centuries of memory. My mission is to help travelers experience not just the landscape, but the living culture that gives it meaning."
              </p>
            </blockquote>
            <footer>
              <p
                style={{
                  color: '#F4A321',
                  fontSize: '16px',
                  fontWeight: 400,
                  textAlign: 'left',
                  margin: 0,
                }}
              >
                — Dr. Sonam Wangchok
              </p>
            </footer>
          </div>
        </div>
      </section>

      {/* Values Cards Section */}
      <section
        style={{
          background: '#281910',
          paddingTop: '76px',
          paddingBottom: '80px',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="values-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {/* Card 1 - Culturally Authentic */}
            <div
              className="transition-all duration-300 ease-out hover:shadow-2xl hover:translate-y-[-8px]"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#F4A321' }}
                >
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h3
                  className="text-sm mb-5"
                  style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 300 }}
                >
                  Culturally Authentic
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#F3F4F1', fontWeight: 100, lineHeight: '1.6' }}
                >
                 We approach every journey with deep respect for local traditions, communities, and sacred spaces.
                </p>
              </div>
            </div>

            {/* Card 2 - Sustainable Travel */}
            <div
              className="transition-all duration-300 ease-out hover:shadow-2xl hover:translate-y-[-8px]"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '50px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#F4A321' }}
                >
                  <Mountain className="w-7 h-7 text-white" />
                </div>
               <h3
                  className="text-[24px] font-light text-white mb-5"
                >
                  Sustainable Travel
                </h3>

                <p
                  className="text-sm leading-relaxed max-w-[360px] text-[#F3F4F1]"
                  style={{ textAlign: "justify", textAlignLast: "left" }}
                >
                  Our commitment to the  responsible tourism to  ensures the minimal environmental impact and maximum community benefit.
                </p>
              </div>
            </div>

            {/* Card 3 - Sustainably Responsible */}
            <div
              className="transition-all duration-300 ease-out hover:shadow-2xl hover:translate-y-[-8px]"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '35px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: '#F4A321' }}
                >
                  <Leaf className="w-7 h-7 text-white" />
                </div>
               <h3
                    className="mb-5 text-[23px] font-light text-white"
                  >
                    Sustainably Responsible
                  </h3>

                  <p
                    className="text-sm leading-relaxed text-justify max-w-[320px] text-[#F3F4F1] font-light"
                  >
                    Committed to the preserving pristine environments and supporting mountain communities.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline Section */}
      <section
        style={{
          backgroundColor: '#F5F3F0',
          paddingTop: '80px',
          paddingBottom: '0px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div className="max-w-5xl mx-auto ">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F4A321' }}
              >
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2
              className="text-3xl mb-3"
              style={{ color: '#2B1E17', fontWeight: 600 }}
            >
              Our Journey
            </h2>
            <p
              className="text-sm max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#4A5565', fontWeight: 400 }}
            >
             Officially registered with the Department of Tourism, U.T. Ladakh - dedicated to experiential and responsible tourism in the Himalayas.
            </p>
          </div>

          {/* Timeline Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', paddingBottom: '80px' }}>
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 px-4 lg:grid-cols-12  gap-8 items-start ${
                  step.align === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {step.align === 'left' ? (
                  <>
                    {/* Text Content - Left */}
                   <div className="lg:col-span-7 relative">
                  <div className="flex items-start gap-5">

                    {/* Circle */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#2B1E17' }}
                    >
                      <span className="text-sm text-white font-semibold">
                        {step.number}
                      </span>
                    </div>

                    {/* Text Content */}
                    <div>
                      <h3 className="text-lg mb-1 font-semibold text-[#2B1E17]">
                        {step.title}
                      </h3>

                      <p className="text-sm mb-2 font-medium text-[#F4A321]">
                        {step.subtitle}
                      </p>

                      <p className="text-sm leading-relaxed text-[#4A5565]" style={{ lineHeight: "1.7" }}>
                        {step.description}
                      </p>
                    </div>

                  </div>
                </div>

                    {/* Image - Right */}
                    <div className="lg:col-span-5">
                      {step.imageType === 'badge' ? (
                        <div className="flex justify-center lg:justify-start">
                          <div>
                            <div className="w-full h-full  flex items-center justify-center">
                              <img
                                src={step.image}
                                alt={step.imageAlt}
                                className=" pb-1 object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="timeline-img-container w-full h-56 bg-gray-200 rounded-2xl overflow-hidden"
                          style={{ borderRadius: '16px' }}
                        >
                          <img src={step.image} alt={step.imageAlt} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Image - Left */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                      <div
                        className="timeline-img-container w-full h-56 bg-gray-200 rounded-2xl overflow-hidden"
                        style={{ borderRadius: '16px' }}
                      >
                        <img src={step.image} alt={step.imageAlt} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Text Content - Right */}
                   <div className="lg:col-span-7 order-1 lg:order-2 relative">
                    <div className="flex items-start gap-5">

                      {/* Circle */}
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#2B1E17' }}
                      >
                        <span className="text-sm" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                          {step.number}
                        </span>
                      </div>

                      {/* Text */}
                      <div>
                        <h3
                          className="text-lg mb-1"
                          style={{ color: '#2B1E17', fontWeight: 600 }}
                        >
                          {step.title}
                        </h3>

                        <p
                          className="text-sm mb-3"
                          style={{ color: '#F4A321', fontWeight: 500 }}
                        >
                          {step.subtitle}
                        </p>

                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: '#4A5565', fontWeight: 400, lineHeight: '1.7' }}
                        >
                          {step.description}
                        </p>
                      </div>

                    </div>
                  </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Highlight Bar */}
<div className="max-w-5xl mx-auto px-6 mt-8 relative -top-10">
  <div
    className="rounded-2xl py-7"
    style={{ backgroundColor: "#281910" }}
  >
    <div className="px-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">

        {/* Item 1 */}
        <div className="flex items-start justify-center gap-3">
          <Award className="w-6 h-6 text-[#F4A321] mt-[2px]" />
          <p className="text-sm text-left leading-snug text-[#F3F4F1]">
            Official <br /> Tourism Registration
          </p>
        </div>

        {/* Item 2 */}
        <div className="flex items-start justify-center gap-3">
          <Mountain className="w-6 h-6 text-[#F4A321] mt-[2px]" />
          <p className="text-sm text-left leading-snug text-[#F3F4F1]">
            Ladakh <br /> "Little Tibet" Focus
          </p>
        </div>

        {/* Item 3 */}
        <div className="flex items-start justify-center gap-3">
          <Heart className="w-6 h-6 text-[#F4A321] mt-[2px]" />
          <p className="text-sm text-left leading-snug text-[#F3F4F1]">
            Cultural <br /> Preservation Mission
          </p>
        </div>

      </div>

    </div>
  </div>
</div>
      </section>

      {/* Principles Section */}
      <section
        style={{
          background: '#281910',
          paddingTop: '80px',
          paddingBottom: '80px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F4A321' }}
              >
                <Compass className="w-6 h-6 text-white" />
              </div>
            </div>
            <p
              className="text-xl leading-relaxed"
              style={{ color: '#F3F4F1', fontWeight: 400, lineHeight: '1.6' }}
            >
              These guiding principles shape every journey we create and every decision we make as an organization.
            </p>
          </div>

          {/* Principles Grid */}
          <div
            className="principles-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {principles.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div
                  key={index}
                  className="group transition-all duration-300 ease-out hover:translate-y-[-8px]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: '32px',
                    backdropFilter: 'blur(10px)',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.10)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                    style={{ backgroundColor: '#F4A321' }}
                  >
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3" style={{ color: '#F3F4F1',fontFamily: ' sans-serif', fontWeight:  100 }}>
                    {principle.title}
                  </h3>
                  <p className="text-md leading-relaxed" style={{ color: '#F3F4F1',fontFamily: 'sans-serif', fontWeight: 100, lineHeight: '1.7' }}>
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          backgroundColor: '#F7F6F2',
          paddingTop: '96px',
          paddingBottom: '96px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Top Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#F4A321' }}
            >
              <Compass className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2
            className="text-4xl  font-berlin mb-4"
            style={{ color: '#2B1E17', fontWeight: 200,  }}
          >
            Ready to Begin Your Journey?
          </h2>

          {/* Supporting Text */}
          <p
            className="text-sm leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: '#4A5565', fontWeight: 400, lineHeight: '1.6' }}
          >
            Whether you're interested in a specific tour or want to create a customized cultural experience, we're here to help you discover the heart of the Himalayas.
          </p>

          {/* Buttons */}
          <div
            className="cta-buttons"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary Button */}
            {/* Primary Button */}
            <button
            onClick={handleWhatsAppEnquiry}
              className="flex items-center justify-center gap-2 transition-all duration-200 ease-out"
              style={{
                backgroundColor: "#2B1E17",
                color: "#FFFFFF",
                fontWeight: 500,
                fontSize: "15px",
                padding: "12px 22px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                width: "fit-content",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F4A321";
                e.currentTarget.style.color = "#2B1E17";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2B1E17";
                e.currentTarget.style.color = "#FFFFFF";
              }}
            >
              <Send size={18} />
              Enquire Now
            </button>


            {/* Secondary Button */}
            <Link to="/Tours">
            <button
            
              className="transition-all duration-200 ease-out"
              style={{
                backgroundColor: "transparent",
                color: "#2B1E17",
                fontWeight: 500,
                fontSize: "14px",
                padding: "11px 28px",
                borderRadius: "8px",
                border: "1.5px solid #2B1E17",
                cursor: "pointer",
                width: "100%",
                maxWidth: "180px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F4A321";
                e.currentTarget.style.color = "#2B1E17";
                e.currentTarget.style.borderColor = "#F4A321";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#2B1E17";
                e.currentTarget.style.borderColor = "#2B1E17";
              }}
            >
              Explore Our Tours
            </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}