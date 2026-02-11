import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Tours', path: '/tours' },
    { label: 'About us', path: '/about' },
    { label: 'Blog', path: '/blog' },
  ];
  const primaryColor = '#2B1E17';
  const backgroundColor = '#F7F6F2';
  const hoverColor = '#1a0f0a';

  return (
    <header
      className="fixed top-0 w-full z-50"
      style={{ backgroundColor, fontFamily: 'Inter, sans-serif' }}
    >
      <div className="h-[72px] flex items-center justify-between px-16 max-w-screen-2xl mx-auto w-full">
        {/* Logo Section */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/hht_final_logo_send.svg"
            alt="Heritage Himalaya Trails"
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm transition-all duration-300"
              style={{
                color: primaryColor,
                fontWeight: 400,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* Primary Button */}
          <button
            className="flex items-center gap-2 px-5 py-3 rounded transition-all duration-300"
            style={{
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              fontWeight: 500,
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            Enquire Now
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="px-5 py-3 rounded transition-all duration-300"
            style={{
              border: `1px solid ${primaryColor}`,
              color: primaryColor,
              fontWeight: 500,
              fontSize: '14px',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = hoverColor;
              e.currentTarget.style.borderColor = hoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = primaryColor;
              e.currentTarget.style.borderColor = primaryColor;
            }}
          >
            Sign In / Create Account
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{ color: primaryColor }}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: '#E8E4D8', backgroundColor }}
        >
          <nav className="flex flex-col px-16 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm py-2 transition-opacity duration-300"
                style={{
                  color: primaryColor,
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-16 py-4 border-t" style={{ borderColor: '#E8E4D8' }}>
            <button
              className="flex items-center justify-center gap-2 px-5 py-3 rounded transition-all duration-300 w-full"
              style={{
                backgroundColor: primaryColor,
                color: '#FFFFFF',
                fontWeight: 500,
                fontSize: '14px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = primaryColor;
              }}
            >
              Enquire Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-3 rounded transition-all duration-300 w-full"
              style={{
                border: `1px solid ${primaryColor}`,
                color: primaryColor,
                fontWeight: 500,
                fontSize: '14px',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverColor;
                e.currentTarget.style.borderColor = hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = primaryColor;
                e.currentTarget.style.borderColor = primaryColor;
              }}
            >
              Sign In / Create Account
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}