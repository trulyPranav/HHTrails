// Authentication types
export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: number;
}

export interface AuthResponse {
  user: User;
  session: Session;
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    timestamp: string;
  };
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
  };
}
