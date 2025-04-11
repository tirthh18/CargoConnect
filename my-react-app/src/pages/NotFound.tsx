
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-coral-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        <Link to="/">
          <Button className="bg-coral-500 hover:bg-coral-600">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
