import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }){
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return null; // spinner si querés
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname)}`} replace />;
  return children;
}
