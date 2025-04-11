
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

  // Show loading state if authentication state is still being determined
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is specified and user doesn't have that role, redirect
  if (role && user.role !== role) {
    // Redirect admin to admin dashboard
    if (user.role === 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
    // Redirect customer to customer dashboard
    return <Navigate to="/customer/dashboard" replace />;
  }

  // If authenticated and has correct role, render children
  return <>{children}</>;
};

export default ProtectedRoute;
