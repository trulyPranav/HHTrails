// import { useState } from 'react';
// import {
//   HeroSection,
//   PanoramaSwiper,
//   SearchBar,
//   ExperiencesSection,
//   UpcomingToursSection,
// } from '../components/home';
// import type { HomeTour } from '../types/home';

// const Home = () => {
//   const [searchResults, setSearchResults] = useState<HomeTour[] | null>(null);

//   return (
//     <div className="flex-grow pt-[72px] min-h-screen bg-[#2B1E17]">
//       <HeroSection />
//       <PanoramaSwiper />
//       <SearchBar
//         onSearch={(tours) => setSearchResults(tours)}
//         onClear={() => setSearchResults(null)}
//       />
//       <ExperiencesSection tours={searchResults} />
//       <UpcomingToursSection />
//     </div>
//   );
// };

// export default Home;
import { useState } from 'react';
import {
  HeroSection,
  PanoramaSwiper,
  SearchBar,
  HeritageWalk,
  ExperiencesSection,
  UpcomingToursSection,
} from '../components/home';
import type { HomeTour } from '../types/home';
const Home = () => {
   const [searchResults, setSearchResults] = useState<HomeTour[] | null>(null);


  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#2B1E17]">
      <HeroSection  />
      <PanoramaSwiper />
      <SearchBar
        onSearch={(tours) => setSearchResults(tours)}
        onClear={() => setSearchResults(null)}
      />
      <HeritageWalk />
     
    <ExperiencesSection tours={searchResults} />
      <UpcomingToursSection />
    </div>
  );
};

export default Home;