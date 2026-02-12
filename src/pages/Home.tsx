import {
  HeroSection,
  PanoramaSwiper,
  SearchBar,
  ExperiencesSection,
  UpcomingToursSection,
} from '../components/home';

const Home = () => {
  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#2B1E17]">
      <HeroSection />
      <PanoramaSwiper />
      <SearchBar />
      <ExperiencesSection />
      <UpcomingToursSection />
    </div>
  );
};

export default Home;