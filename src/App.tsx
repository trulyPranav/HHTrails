import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Blog from './components/Blog';

function Home() {
  return (
    <div className="flex-grow flex items-center justify-center pt-[72px] min-h-screen">
      <div className="text-center space-y-4 px-6">
        <h1 className="text-4xl font-bold text-[#3D3226]">Heritage Himalaya Trails</h1>
        <p className="text-lg text-[#5C5346]">Experience the majesty of the mountains</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
      
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
