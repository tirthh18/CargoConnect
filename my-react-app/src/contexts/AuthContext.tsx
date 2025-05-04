import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name: string;
  city: string;
  role: 'admin' | 'customer';
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('cargoConnectUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cargoConnectUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // credentials: "include",
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const loggedInUser: User = {
          id: data.user._id || 'static-admin',
          email: data.user.email,
          name: data.user.name,
          city:data.user.city,
          role: data.user.role
        };
        if (data.token) {
          localStorage.setItem("cargoConnectToken", data.token);
        }
        setUser(loggedInUser);
        localStorage.setItem("cargoConnectUser", JSON.stringify(loggedInUser));
        toast.success("Logged in successfully");
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully. Please log in.");
        return true;
      } else {
        toast.error(data.message || "Signup failed");
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cargoConnectUser');
    localStorage.removeItem('cargoConnectToken');
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
