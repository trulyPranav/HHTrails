import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff, User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { validateSignUpForm, validateSignInForm } from '../utils/validation';
import { ApiClientError } from '../services/apiClient';
import { authService } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ fullName: '', email: '', password: '' });
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validate sign up form
        const validation = validateSignUpForm(
          formData.email,
          formData.password,
          formData.fullName
        );
        
        if (!validation.isValid) {
          setError(validation.error || 'Validation failed');
          setIsLoading(false);
          return;
        }

        // Sign up
        await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName || undefined,
        });

        // Success - close modal
        onClose();
      } else {
        // Validate sign in form
        const validation = validateSignInForm(
          formData.email,
          formData.password
        );
        
        if (!validation.isValid) {
          setError(validation.error || 'Validation failed');
          setIsLoading(false);
          return;
        }

        // Sign in
        await signIn({
          email: formData.email,
          password: formData.password,
        });

        // Success - close modal
        onClose();
      }
    } catch (err) {
      if (err instanceof ApiClientError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Store return URL for after authentication
      sessionStorage.setItem('google_auth_return', window.location.href);
      
      // Get Google OAuth URL from backend and redirect
      const authUrl = await authService.getGoogleAuthUrl();
      
      // Full page redirect to Google OAuth
      window.location.href = authUrl;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to initiate Google sign in');
      }
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Different images for Sign In and Create Account
  const signInImage = " img/Rectangle 96 (1).png";
  const signUpImage = "img/Rectangle 96.png";

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full flex overflow-hidden transition-all duration-300"
        style={{ 
          maxWidth: '920px',
          animation: 'modalAppear 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalAppear {
            from {
              opacity: 0;
              transform: scale(0.96);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
        
        {/* LEFT SIDE - Image (48%) */}
        <div className="hidden md:block w-[48%] relative overflow-hidden rounded-l-2xl">
          <img
            src={isSignUp ? signUpImage : signInImage}
            alt="Heritage Himalaya Trails"
            className="w-full h-full object-cover"
            key={isSignUp ? 'signup' : 'signin'}
          />
        </div>

        {/* RIGHT SIDE - Form (52%) */}
       <div className="w-full md:w-[52%] bg-[#f3f3f3] relative rounded-t-2xl overflow-hidden p-10">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-[#333] mb-6 text-left">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>

          {/* Social Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="flex-1 h-[38px] flex items-center justify-center gap-2 bg-white border border-[#ddd] rounded-md hover:bg-gray-50 transition-colors text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{isSignUp ? 'Sign Up' : 'Sign In'} With Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="text-center mb-6">
            <span className="text-xs text-gray-400">- OR -</span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name - Sign Up Only */}
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  disabled={isLoading}
                  className="w-full h-[44px] pl-10 pr-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b1b14] focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                disabled={isLoading}
                className="w-full h-[44px] pl-10 pr-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b1b14] focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                disabled={isLoading}
                className="w-full h-[44px] pl-10 pr-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b1b14] focus:border-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Password Requirements Hint for Sign Up */}
            {isSignUp && (
              <p className="text-xs text-gray-500 -mt-2">
                Min. 8 characters with uppercase, lowercase, and number
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] bg-[#2b1b14] hover:bg-[#3a261e] text-white font-medium rounded-md transition-colors text-sm mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Bottom Text */}
          <div className="text-center mt-5">
            <p className="text-xs text-gray-500">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                  });
                  setError('');
                }}
                disabled={isLoading}
                className="text-gray-800 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSignUp ? 'Log in' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>

        {/* Mobile Image - Top */}
        <div className="md:hidden w-full h-[250px] rounded-t-2xl overflow-hidden">
          <img
            src={isSignUp ? signUpImage : signInImage}
            alt="Heritage Himalaya Trails"
            className="w-full h-full object-cover"
            key={isSignUp ? 'signup-mobile' : 'signin-mobile'}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;