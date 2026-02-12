import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../utils/storage';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Google OAuth Callback Page
 * Handles the redirect from Supabase OAuth flow
 * Tokens are already authenticated - just extract and store them
 */
export default function GoogleCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the hash params from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        // Extract tokens from Supabase OAuth callback
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const expiresIn = hashParams.get('expires_in');
        const expiresAt = hashParams.get('expires_at');
        const errorParam = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (errorParam) {
          throw new Error(errorDescription || errorParam);
        }

        if (!accessToken || !refreshToken) {
          throw new Error('No authentication tokens received');
        }

        console.log('Supabase OAuth tokens received, extracting user info...');
        
        // Decode Supabase JWT to get user info (already verified by Supabase)
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        
        const user = {
          id: payload.sub,
          email: payload.email,
          fullName: payload.user_metadata?.full_name || payload.user_metadata?.name,
          avatar: payload.user_metadata?.avatar_url || payload.user_metadata?.picture,
          emailVerified: payload.user_metadata?.email_verified,
        };
        
        const session = {
          accessToken,
          refreshToken,
          expiresIn: expiresIn ? parseInt(expiresIn) : 3600,
          expiresAt: expiresAt ? parseInt(expiresAt) : Math.floor(Date.now() / 1000) + 3600,
        };

        // Store session (no need to call backend - already authenticated)
        storageService.setSession(session, user);
        
        console.log('Successfully authenticated with Google!', user);
        
        // Get the return URL or default to home
        const returnUrl = sessionStorage.getItem('google_auth_return') || '/';
        sessionStorage.removeItem('google_auth_return');

        // Redirect back with full reload to initialize auth context
        window.location.href = returnUrl;
      } catch (err) {
        console.error('Google auth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        
        // Redirect to home after a delay
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Authentication Failed
              </h2>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#2b1b14] mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing sign in...
        </h2>
        <p className="text-sm text-gray-600">
          Verifying your account with our server...
        </p>
      </div>
    </div>
  );
}
