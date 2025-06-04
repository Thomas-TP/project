import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSupabase } from '../../lib/supabase/SupabaseProvider';

export const ProtectedRoute = () => {
  const { user } = useSupabase();
  const location = useLocation();

  if (!user) {
    // Redirect to the login page with a return url
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};