import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tours from './pages/Tours';
import Blog from './pages/Blog';
import GoogleCallback from './pages/GoogleCallback';
import AuthModal from './components/AuthModal'; 

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false); 

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          
          {/* Pass function to Header */}
          <Header onAuthClick={() => setIsAuthOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
          <Route path="/blog" element={<Blog />} />

        </Routes>

          <Footer />

          {/* 👇 Modal OUTSIDE Routes */}
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
