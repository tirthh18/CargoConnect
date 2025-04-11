
import { Button } from "../components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 h-6 w-6">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            <span className="text-xl font-semibold">CargoConnect</span>
          </div>
        </Link>
        <nav className="hidden ml-auto md:flex items-center gap-5">
          <Link to="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">Dashboard</Link>
          <Link to="/routes" className="text-sm font-medium hover:underline underline-offset-4">Routes</Link>
          <Link to="/delivery" className="text-sm font-medium hover:underline underline-offset-4">Delivery</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Welcome, {user?.email}</span>
              <Button variant="outline" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
