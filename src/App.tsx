import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import AuthModal from './components/AuthModal'; 

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false); 

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        
        {/* Pass function to Header */}
        <Header onAuthClick={() => setIsAuthOpen(true)} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />

        {/* 👇 Modal OUTSIDE Routes */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
