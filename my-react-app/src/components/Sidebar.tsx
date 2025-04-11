
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { 
  Package, 
  PackageCheck, 
  MapPin, 
  FileText, 
  LogOut,
  Home
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="hidden lg:block w-72 border-r bg-cream-50 flex-shrink-0">
      <div className="flex h-16 items-center border-b px-4">
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
      </div>
      <nav className="flex flex-col gap-2 p-4">
        <Link
          to="/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/dashboard" && "bg-coral-100 font-medium"
          )}
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/delivery"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/delivery" && "bg-coral-100 font-medium"
          )}
        >
          <PackageCheck className="h-5 w-5" />
          Delivery
        </Link>
        <Link
          to="/routes"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/routes" && "bg-coral-100 font-medium"
          )}
        >
          <MapPin className="h-5 w-5" />
          Routes
        </Link>
        <Link
          to="/about"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/about" && "bg-coral-100 font-medium"
          )}
        >
          <FileText className="h-5 w-5" />
          About Us
        </Link>
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
