import { Award, Briefcase, Users, MapPin, Heart, Leaf, Mountain, BookOpen, Building2, Clock,  UserCheck,Compass} from 'lucide-react';

export default function About() {
  const timelineSteps = [
    {
      number: '01',
      title: 'Official Recognition',
      subtitle: 'Department of Tourism, U.T. Ladakh',
      description: 'Heritage Himalaya Trails is a specialized travel company officially registered with the Department of Tourism, U.T. Ladakh, India. Our commitment to authentic, responsible tourism is recognized and supported by local authorities.',
      image: 'container.png', // Indian government tourism emblem
      imageAlt: 'Department of Tourism Badge',
      align: 'left',
      imageType: 'badge'
    },
    {
      number: '02',
      title: 'Ladakh "Little Tibet"',
      subtitle: 'Buddhist & Bön Heritage',
      description: 'We focus particularly on Ladakh, celebrated for its vibrant Buddhist and Bön heritage. Known as "Little Tibet," this region forms the heart of our extended cultural tours, offering deep insight into ancient traditions and mountain communities.',
      image: 'Container (1).png', // Photo of monks with mountains
      imageAlt: 'Buddhist monks in Ladakh',
      align: 'right',
      imageType: 'photo'
    },
    {
      number: '03',
      title: 'Immersive & Responsible',
      subtitle: 'Cultural Preservation & Connection',
      description: 'Our journeys are thoughtfully designed to preserve local culture and environment, while allowing visitors to engage authentically with the traditions and lifestyles of mountain communities. Every experience honors the land and its people.',
      image: 'Container (2).png', // Group photo with local community
      imageAlt: 'Cultural community gathering',
      align: 'left',
      imageType: 'photo'
    },
    {
      number: '04',
      title: 'Passionate Leadership',
      subtitle: 'Dr. Sonam Wangchok',
      description: 'Led by Dr. Sonam Wangchok, our experienced and passionate team is committed to delivering authentic and meaningful travel experiences. Whether you\'re an individual traveler or part of a group, we offer opportunities to connect with indigenous cultures and stunning natural beauty.',
      image: 'Container (3).png', // Dr. Wangchok speaking at event
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
        className="relative h-64 mt-[72px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("/public/Container4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-4xl text-center mb-4" style={{ color: '#1F1F1F', fontWeight: 400 }}>
            About Us
          </h1>
          <p
            className="text-sm leading-relaxed text-center"
            style={{ color: '#FFFDF8', fontWeight: 400 }}
          >
            Heritage Himalaya Trails is more than a travel organization as we are storytellers, cultural ambassadors, and guardians of tradition, dedicated to creating meaningful journeys through the Himalayan heartland.
          </p>
        </div>
      </section>

      {/* Meet Our Founder Section */}
      <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '80px' }}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Founder Header - Centered */}
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3" style={{ color: '#2B1E17', fontWeight: 600 }}>
              Meet Our Founder
            </h2>
            <h3 className="text-lg mb-2" style={{ color: '#2B1E17', fontWeight: 500 }}>
              Dr. Sonam Wangchok
            </h3>
            <p className="text-sm" style={{ color: '#F4A321', fontWeight: 500 }}>
              Cultural Heritage Expert & Guide
            </p>
          </div>

          {/* Founder Content - Responsive 2 Column Layout */}
          <div className="flex flex-col md:flex-row items-start gap-7 px-5">
            
            {/* Left Column - Image */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <img
                src="/imagewithfallback.png"
                alt="Dr. Sonam Wangchok"
                className="w-full h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-5 flex-1">

              {/* Paragraph */}
              <p
                className="text-sm leading-relaxed text-justify"
                style={{ color: '#6B5E55', fontWeight: 400 }}
              >
                A leading authority on Ladakh's heritage with 15+ years dedicated to preserving and sharing the rich cultural tapestry of the Himalayas. Native to Staksmo village, Dr. Wangchok bridges academic expertise with lived cultural experience.
              </p>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 gap-4">

                {/* Card 1 */}
                <div className="p-4 rounded-lg flex items-start gap-3 bg-[#F9F8F4]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4A321]">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2B1E17]">
                      Heritage Expert
                    </h4>
                    <p className="text-xs text-[#6B5E55]">
                      UNESCO & government preservation projects
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-4 rounded-lg flex items-start gap-3 bg-[#F9F8F4]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4A321]">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2B1E17]">
                      Academic Background
                    </h4>
                    <p className="text-xs text-[#6B5E55]">
                      Cultural anthropology & heritage management
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-4 rounded-lg flex items-start gap-3 bg-[#F9F8F4]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4A321]">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2B1E17]">
                      Specialization
                    </h4>
                    <p className="text-xs text-[#6B5E55]">
                      Monastic traditions & vernacular architecture
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="p-4 rounded-lg flex items-start gap-3 bg-[#F9F8F4]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F4A321]">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2B1E17]">
                      Local Roots
                    </h4>
                    <p className="text-xs text-[#6B5E55]">
                      Native Ladakhi from Staksmo village
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Values Section */}
    

      {/* Quote Section */}
       <section 
      className="px-6" 
      style={{ 
        backgroundColor: '#FFFFFF', 
        paddingTop: '1px', 
        paddingBottom: '40px' 
      }}
    >
      <div 
        className="mx-auto" 
        style={{ 
          maxWidth: '890px',
          width: '100%'
        }}
      >
        <div
          className="p-12 rounded-2xl"
          style={{ 
            backgroundColor: '#1C120C',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '48px',
            paddingRight: '48px'
          }}
        >
          <blockquote className="mb-6">
            <p
              style={{ 
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '1.5',
                textAlign: 'left',
                margin: 0
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
                margin: 0
              }}
            >
              — Dr. Sonam Wangchok
            </p>
          </footer>
        </div>
      </div>
    </section>
        <section
        style={{
          background: 'linear-gradient(135deg, #1A0F0A 0%, #2B1E17 100%)',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Culturally Authentic */}
            <div
              className="transition-all duration-300 ease-out hover:shadow-2xl hover:translate-y-[-8px]"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '16px',
                padding: '32px',
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
                  className="text-lg mb-3"
                  style={{ color: '#FFFFFF', fontWeight: 600 }}
                >
                  Culturally Authentic
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#D6CFC8', fontWeight: 400, lineHeight: '1.6' }}
                >
                  We approach every journey with deep respect for local traditions, communities, and sacred spaces. Our commitment runs beyond tourism—we're cultural ambassadors who honor the heritage we share.
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
                padding: '32px',
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
                  className="text-lg mb-3"
                  style={{ color: '#FFFFFF', fontWeight: 600 }}
                >
                  Sustainable Travel
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#D6CFC8', fontWeight: 400, lineHeight: '1.6' }}
                >
                  Our commitment to responsible tourism ensures minimal environmental impact and maximum community benefit. We believe that the most meaningful journeys leave the landscape and communities better than we found them.
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
                padding: '32px',
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
                  className="text-lg mb-3"
                  style={{ color: '#FFFFFF', fontWeight: 600 }}
                >
                  Sustainably Responsible
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#D6CFC8', fontWeight: 400, lineHeight: '1.6' }}
                >
                  We are committed to preserving pristine mountain environments and supporting local communities. Every journey contributes to conservation efforts and sustainable livelihoods in the regions we explore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
      style={{
        backgroundColor: '#F5F3F0',
        paddingTop: '80px',
        paddingBottom: '0px',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
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
            style={{
              color: '#2B1E17',
              fontWeight: 600
            }}
          >
            Our Journey
          </h2>
          <p
            className="text-xs max-w-2xl mx-auto leading-relaxed"
            style={{
              color: '#6B5E55',
              fontWeight: 400
            }}
          >
            Officially registered with the Department of Tourism, U.T. Ladakh - dedicated to preserving the cultural heritage and natural beauty of the Himalayas.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-12 pb-20">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
                step.align === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {step.align === 'left' ? (
                <>
                  {/* Text Content - Left */}
                  <div className="lg:col-span-7 relative">
                    {/* Number Badge */}
                    <div
                      className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4"
                      style={{ backgroundColor: '#2B1E17' }}
                    >
                      <span
                        className="text-sm"
                        style={{
                          color: '#FFFFFF',
                          fontWeight: 600
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      className="text-lg mb-1"
                      style={{
                        color: '#2B1E17',
                        fontWeight: 600
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-xs mb-4"
                      style={{
                        color: '#F4A321',
                        fontWeight: 500
                      }}
                    >
                      {step.subtitle}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: '#6B5E55',
                        fontWeight: 400,
                        lineHeight: '1.7'
                      }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Image - Right */}
                  <div className="lg:col-span-5">
                    {step.imageType === 'badge' ? (
                      <div className="flex justify-center lg:justify-start">
                        <div
                          className="w-48 h-48 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
                            padding: '8px'
                          }}
                        >
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <img
                              src={step.image}
                              alt={step.imageAlt}
                              className="w-40 h-40 object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-56 bg-gray-200 rounded-2xl overflow-hidden"
                        style={{ borderRadius: '16px' }}
                      >
                        <img
                          src={step.image}
                          alt={step.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Image - Left */}
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    <div
                      className="w-full h-56 bg-gray-200 rounded-2xl overflow-hidden"
                      style={{ borderRadius: '16px' }}
                    >
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Content - Right */}
                  <div className="lg:col-span-7 order-1 lg:order-2 relative">
                    {/* Number Badge */}
                    <div
                      className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4"
                      style={{ backgroundColor: '#2B1E17' }}
                    >
                      <span
                        className="text-sm"
                        style={{
                          color: '#FFFFFF',
                          fontWeight: 600
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      className="text-lg mb-1"
                      style={{
                        color: '#2B1E17',
                        fontWeight: 600
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-xs mb-4"
                      style={{
                        color: '#F4A321',
                        fontWeight: 500
                      }}
                    >
                      {step.subtitle}
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: '#6B5E55',
                        fontWeight: 400,
                        lineHeight: '1.7'
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Highlight Bar */}
      <div className="max-w-5xl mx-auto px-6 mt-8 relative -top-10"> {/* 1. Wrapper controls alignment with page */}
  <div
    className="rounded-2xl" /* 2. Added rounded corners to match the card style */
    style={{
      backgroundColor: '#3D2B22',
      paddingTop: '28px',
      paddingBottom: '28px'
    }}
  >
    <div className="px-6"> {/* 3. Inner padding for the content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        
        {/* --- Item 1 --- */}
        <div className="flex items-center justify-center gap-3 leading-tight">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(244, 163, 33, 0.2)' }}
          >
            <MapPin className="w-4 h-4" style={{ color: '#F4A321' }} />
          </div>
          <p
  className="text-xs text-left leading-snug"
  style={{ color: '#FFFFFF', fontWeight: 400 }}
>
            Official<br />Tourism Registration
          </p>
        </div>

        {/* --- Item 2 --- */}
        <div className="flex items-center justify-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(244, 163, 33, 0.2)' }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: '#F4A321' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p
            className="text-xs text-left"
            style={{
              color: '#FFFFFF',
              fontWeight: 400
            }}
          >
            Ladakh<br />"Little Tibet" Focus
          </p>
        </div>

        {/* --- Item 3 --- */}
        <div className="flex items-center justify-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(244, 163, 33, 0.2)' }}
          >
            <svg
              className="w-4 h-4"
              style={{ color: '#F4A321' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <p
            className="text-xs text-left"
            style={{
              color: '#FFFFFF',
              fontWeight: 400
            }}
          >
            Cultural<br />Preservation Mission
          </p>
        </div>

      </div>
    </div>
  </div>
</div>
    </section>

    <section
      style={{
        background: 'linear-gradient(135deg, #1A0F0A 0%, #2B1E17 100%)',
        paddingTop: '80px',
        paddingBottom: '80px',
        fontFamily: 'Inter, sans-serif'
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
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: '#D6CFC8',
              fontWeight: 400,
              lineHeight: '1.6'
            }}
          >
            These guiding principles shape every journey we create and every decision we make as an organization.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.10)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: '#F4A321' }}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>

                {/* Title */}
                <h3
                  className="text-base mb-3"
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 500
                  }}
                >
                  {principle.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: '#D6CFC8',
                    fontWeight: 400,
                    lineHeight: '1.7'
                  }}
                >
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section
      style={{
        backgroundColor: '#F7F6F2',
        paddingTop: '96px',
        paddingBottom: '96px',
        fontFamily: 'Inter, sans-serif'
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
          className="text-3xl mb-4"
          style={{
            color: '#2B1E17',
            fontWeight: 600
          }}
        >
          Ready to Begin Your Journey?
        </h2>

        {/* Supporting Text */}
        <p
          className="text-sm leading-relaxed mb-8 max-w-xl mx-auto"
          style={{
            color: '#6B5E55',
            fontWeight: 400,
            lineHeight: '1.6'
          }}
        >
          Whether you're interested in a specific tour or want to create a customized cultural experience, we're here to help you discover the heart of the Himalayas.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Button */}
          <button
            className="transition-all duration-200 ease-out"
            style={{
              backgroundColor: '#2B1E17',
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: '14px',
              padding: '12px 28px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '180px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1C120C';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2B1E17';
            }}
          >
            Enquire Now
          </button>

          {/* Secondary Button */}
          <button
            className="transition-all duration-200 ease-out"
            style={{
              backgroundColor: 'transparent',
              color: '#2B1E17',
              fontWeight: 500,
              fontSize: '14px',
              padding: '11px 28px',
              borderRadius: '8px',
              border: '1.5px solid #2B1E17',
              cursor: 'pointer',
              width: '100%',
              maxWidth: '180px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2B1E17';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#2B1E17';
            }}
          >
            Explore Our Tours
          </button>
        </div>
      </div>
    </section>
    </div>
  );
}
