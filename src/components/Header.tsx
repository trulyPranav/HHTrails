import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Tours', path: '/tours' },
    { label: 'About us', path: '/about' },
    { label: 'Blog', path: '/blog' },
  ];
  const primaryColor = '#2B1E17';
  const backgroundColor = '#F7F6F2';
  const hoverColor = '#1a0f0a';

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

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

          {/* Auth Section */}
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded transition-all duration-300"
                style={{
                  border: `1px solid ${primaryColor}`,
                  color: primaryColor,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0ede5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName || user.email}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <span className="text-sm font-medium">
                  {user?.fullName?.split(' ')[0] || user?.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border z-50"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8E4D8',
                  }}
                >
                  <div className="p-4 border-b" style={{ borderColor: '#E8E4D8' }}>
                    <p className="text-sm font-medium" style={{ color: primaryColor }}>
                      {user?.fullName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors"
                      style={{ color: primaryColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f0ede5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
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
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
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
                className="text-sm transition-all duration-300"
                style={{
                  color: primaryColor,
                  fontWeight: 400,
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
            
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-4 py-3 rounded" style={{ backgroundColor: '#f0ede5' }}>
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName || user.email}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: primaryColor }}>
                      {user?.fullName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded transition-all duration-300 w-full"
                  style={{
                    border: `1px solid ${primaryColor}`,
                    color: primaryColor,
                    fontWeight: 500,
                    fontSize: '14px',
                    backgroundColor: 'transparent',
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMenuOpen(false);
                }}
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
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}