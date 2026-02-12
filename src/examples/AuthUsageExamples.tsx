/**
 * Example: Using Authentication in Components
 * 
 * This file demonstrates how to use the authentication system
 * in your React components.
 */

import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Example 1: Show user info when authenticated
 */
export function UserProfile() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div>
      <h2>Welcome, {user?.fullName || user?.email}!</h2>
      <p>Email: {user?.email}</p>
      {user?.avatar && <img src={user.avatar} alt="Avatar" />}
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

/**
 * Example 2: Protected component that requires authentication
 */
export function ProtectedContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p>Please sign in to access this content.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Protected Content</h2>
      <p>This content is only visible to authenticated users.</p>
    </div>
  );
}

/**
 * Example 3: Conditional rendering based on auth state
 */
export function ConditionalHeader() {
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-xl font-bold">My App</h1>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm">
              {user?.fullName || user?.email}
            </span>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}

/**
 * Example 4: Make authenticated API request
 */
export function UserDashboard() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await refreshUser();
      alert('Profile refreshed!');
    } catch (error) {
      console.error('Failed to refresh:', error);
      alert('Failed to refresh profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <p><strong>Name:</strong> {user?.fullName || 'Not set'}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>ID:</strong> {user?.id}</p>
      </div>
      <button
        onClick={handleRefresh}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Refreshing...' : 'Refresh Profile'}
      </button>
    </div>
  );
}

/**
 * Example 5: Protected Route (use with React Router)
 */
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

/**
 * Usage in App.tsx with React Router:
 * 
 * import { ProtectedRoute } from './examples/AuthUsageExamples';
 * 
 * <Routes>
 *   <Route path="/" element={<Home />} />
 *   <Route 
 *     path="/dashboard" 
 *     element={
 *       <ProtectedRoute>
 *         <Dashboard />
 *       </ProtectedRoute>
 *     } 
 *   />
 * </Routes>
 */

/**
 * Example 6: Manual sign in form (if not using AuthModal)
 */
export function CustomSignInForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({ email, password });
      // Success - redirect or close modal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800">
          {error}
        </div>
      )}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
