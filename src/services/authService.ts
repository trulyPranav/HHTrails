import { apiClient } from './apiClient';
import { ENDPOINTS } from '../config/api';
import { storageService } from '../utils/storage';
import type {
  SignUpRequest,
  SignInRequest,
  GoogleAuthRequest,
  AuthResponse,
  ApiResponse,
  User,
  Session,
} from '../types/auth';

class AuthService {
  /**
   * Sign up a new user
   */
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.SIGNUP,
      data
    );

    const authData = response.data;
    
    // Store session
    storageService.setSession(authData.session, authData.user);

    return authData;
  }

  /**
   * Sign in an existing user
   */
  async signIn(data: SignInRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.SIGNIN,
      data
    );

    const authData = response.data;
    
    // Store session
    storageService.setSession(authData.session, authData.user);

    return authData;
  }

  /**
   * Get Google OAuth URL
   */
  async getGoogleAuthUrl(): Promise<string> {
    const response = await apiClient.get<ApiResponse<{ url: string }>>(
      ENDPOINTS.AUTH.GOOGLE_URL
    );

    return response.data.url;
  }

  /**
   * Sign in with Google ID token
   */
  async signInWithGoogle(data: GoogleAuthRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.GOOGLE_AUTH,
      data
    );

    const authData = response.data;
    
    // Store session
    storageService.setSession(authData.session, authData.user);

    return authData;
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(
      ENDPOINTS.AUTH.ME
    );

    const user = response.data.user;
    
    // Update stored user
    storageService.setUser(user);

    return user;
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.AUTH.SIGNOUT);
    } finally {
      // Always clear local session, even if API call fails
      storageService.clearSession();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<Session> {
    const refreshToken = storageService.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<ApiResponse<{ session: Session }>>(
      ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );

    const session = response.data.session;
    
    // Update tokens
    storageService.setAccessToken(session.accessToken);
    storageService.setRefreshToken(session.refreshToken);

    return session;
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.PASSWORD_RESET_REQUEST, { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post(ENDPOINTS.AUTH.PASSWORD_RESET, { token, password });
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return storageService.isSessionValid();
  }

  /**
   * Get stored user
   */
  getStoredUser(): User | null {
    return storageService.getUser();
  }
}

export const authService = new AuthService();
