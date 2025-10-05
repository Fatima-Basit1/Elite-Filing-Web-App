import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to handle authentication checks and redirection
 * @param {boolean} requireAuth - Whether authentication is required for the current route
 * @param {string} redirectTo - Path to redirect to if authentication check fails (default: '/signin')
 * @returns {Object} - Returns authentication state and user information
 */
const useAuth = (requireAuth = true, redirectTo = '/get-started') => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Only check after initial loading is complete
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to login if authentication is required but user is not authenticated
        navigate(redirectTo);
      }
    }
  }, [isAuthenticated, loading, navigate, requireAuth, redirectTo]);

  return {
    isAuthenticated,
    user,
    loading,
  };
};

export default useAuth;