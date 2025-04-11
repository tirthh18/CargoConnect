
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { 
  Package, 
  PlusCircle, 
  FileText, 
  LogOut,
  Home,
  User
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function CustomerSidebar() {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-72 border-r bg-cream-50 flex-shrink-0 flex flex-col overflow-hidden">
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
      <nav className="flex flex-col gap-2 p-4 overflow-y-auto">
        <Link
          to="/customer/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/customer/dashboard" && "bg-coral-100 font-medium"
          )}
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          to="/customer/place-order"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/customer/place-order" && "bg-coral-100 font-medium"
          )}
        >
          <PlusCircle className="h-5 w-5" />
          Place Order
        </Link>
        <Link
          to="/customer/orders-history"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/customer/orders-history" && "bg-coral-100 font-medium"
          )}
        >
          <Package className="h-5 w-5" />
          Orders History
        </Link>
        <Link
          to="/customer/about"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-coral-100",
            pathname === "/customer/about" && "bg-coral-100 font-medium"
          )}
        >
          <User className="h-5 w-5" />
          About Us
        </Link>
      </nav>
      <div className="mt-auto p-4 border-t">
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
