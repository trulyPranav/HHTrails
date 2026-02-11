import React, { useState } from "react";
import { X, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
              className="flex-1 h-[38px] flex items-center justify-center gap-2 bg-white border border-[#ddd] rounded-md hover:bg-gray-100 transition-colors text-sm text-gray-700"
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
              <span>Sign Up With Google</span>
            </button>

            <button
              type="button"
              className="flex-1 h-[38px] flex items-center justify-center gap-2 bg-white border border-[#ddd] rounded-md hover:bg-gray-100 transition-colors text-sm text-gray-700"
            >
              <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Sign Up With Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="text-center mb-6">
            <span className="text-xs text-gray-400">- OR -</span>
          </div>

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
                  className="w-full h-[44px] pl-10 pr-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
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
                placeholder="Address Email"
                className="w-full h-[44px] pl-10 pr-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
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
                className="w-full h-[44px] pl-10 pr-10 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[44px] bg-[#2b1b14] hover:bg-[#3a261e] text-white font-medium rounded-md transition-colors text-sm mt-4"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
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
                }}
                className="text-gray-800 hover:underline cursor-pointer"
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