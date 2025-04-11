
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Eye, EyeOff, Check, Timer } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        if (email === "admin@cargoconnect.com") {
          navigate("/dashboard");
        } else {
          navigate("/customer/dashboard");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coral-100">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-xl text-gray-600 mb-8">Smart Shipping for a Fast-Paced World.</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-coral-50 p-4 rounded-lg flex items-start">
              <div className="p-2 rounded-full bg-coral-200 mr-3">
                <Check className="h-5 w-5 text-coral-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Trusted Courier Service</h3>
                <p className="text-sm text-gray-600">Advanced protection for your Consignment</p>
              </div>
            </div>
            
            <div className="bg-coral-50 p-4 rounded-lg flex items-start">
              <div className="p-2 rounded-full bg-coral-200 mr-3">
                <Timer className="h-5 w-5 text-coral-700" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Real-time Collaboration</h3>
                <p className="text-sm text-gray-600">Work together seamlessly</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center relative">
              <Link to="/" className="absolute left-0 top-0 p-4">
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Link>
              <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
              <CardDescription>Access your account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. tirth@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
                <p className="mt-4 text-sm text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-coral-600 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
