import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  skills: string[];
  interests: string[];
  education: {
    degree: string;
    college: string;
    year: string;
    cgpa: string;
  };
  goals: string[];
  targetCareer: string;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<boolean>;
  fetchWithAuth: (endpoint: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API Base URL - can point to Render in production or localhost in development
export const API_BASE = "http://localhost:5000/api";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("fp_token"));
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user profile if token exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return false;
      }
      localStorage.setItem("fp_token", data.token);
      setToken(data.token);
      setUser(data);
      toast.success(`Welcome back, ${data.name}!`);
      return true;
    } catch (err) {
      toast.error("Network error during login");
      console.error(err);
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return false;
      }
      localStorage.setItem("fp_token", data.token);
      setToken(data.token);
      setUser(data);
      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      toast.error("Network error during registration");
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("fp_token");
    setToken(null);
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  const updateProfile = async (profileData: any): Promise<boolean> => {
    if (!token) return false;
    try {
      const response = await fetch(`${API_BASE}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to update profile");
        return false;
      }
      setUser(data);
      toast.success("Profile updated!");
      return true;
    } catch (err) {
      toast.error("Network error during profile update");
      console.error(err);
      return false;
    }
  };

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        fetchWithAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
