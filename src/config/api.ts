// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 30000, // 30 seconds
} as const;

export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    SIGNOUT: '/auth/signout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    GOOGLE_URL: '/auth/google/url',
    GOOGLE_AUTH: '/auth/google',
    PASSWORD_RESET_REQUEST: '/auth/password/reset-request',
    PASSWORD_RESET: '/auth/password/reset',
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'hhtrails_access_token',
  REFRESH_TOKEN: 'hhtrails_refresh_token',
  USER: 'hhtrails_user',
} as const;
