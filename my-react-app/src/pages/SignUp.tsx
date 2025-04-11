
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      alert("Please accept the Terms of Service and Privacy Policy");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await signup(fullName, email, password);
      if (success) {
        navigate("/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-coral-100">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign up to CargoConnect</h1>
          <p className="text-xl text-gray-600 mb-8">Create an account to send and receive parcels with ease and join our community.</p>
        </div>
        
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center relative">
              <Link to="/login" className="absolute left-0 top-0 p-4">
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </Link>
              <CardTitle className="text-2xl font-bold text-gray-900">Sign up to CargoConnect</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="e.g. John Champion"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. john@gmail.com"
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
                      placeholder="Enter your password"
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
                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    Creating an account means you're okay with our{" "}
                    <Link to="/terms-conditions" className="text-coral-600 hover:underline">
                      Terms of Service
                    </Link>
                    and{" "}
                    <Link to="/privacy-policy" className="text-coral-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                  disabled={isSubmitting || !acceptTerms}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
                <p className="mt-4 text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-coral-600 hover:underline">
                    Sign in
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
