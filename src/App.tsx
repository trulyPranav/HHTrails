import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import { AuthProvider } from './contexts/AuthContext';
import { SavedToursProvider } from './contexts/SavedToursContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import SavedTours from './pages/SavedTours';
import GoogleCallback from './pages/GoogleCallback';
import Admin from './pages/Admin';
import AuthModal from './components/AuthModal'; 

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false); 

  return (
    <AuthProvider>
      <SavedToursProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          
          {/* Pass function to Header */}
          <ScrollToTop />
          <Header onAuthClick={() => setIsAuthOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/saved-tours" element={<SavedTours />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>

          <Footer />

          {/* 👇 Modal OUTSIDE Routes */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        </div>
      </Router>
      </SavedToursProvider>
    </AuthProvider>
  );
}

export default App;
