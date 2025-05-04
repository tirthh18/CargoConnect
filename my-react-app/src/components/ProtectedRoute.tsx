
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  role?: 'admin' | 'user';
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  console.log('routes')
  const { user, isLoading } = useAuth();
  console.log(user)

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/customer/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
