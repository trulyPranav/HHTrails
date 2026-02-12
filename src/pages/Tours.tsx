import {
  HimalayanTours,
  TourLayout
} from '../components/tours';

const Home = () => {
  return (
    <div className="flex-grow pt-[72px] min-h-screen ">
      <HimalayanTours />
      <TourLayout />
    </div>
  );
};

export default Home;