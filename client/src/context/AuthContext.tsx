import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  AuthContextType,
  RegisterFormData,
  LoginFormData,
  AuthResponse,
} from "../types/authTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get<AuthResponse>("/api/auth/me", {
          withCredentials: true,
        });
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (formData: RegisterFormData) => {
    try {
      const res = await axios.post<AuthResponse>(
        "/api/auth/register",
        formData,
        { withCredentials: true }
      );
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        navigate("/dashboard");
      }
    } catch (err: any) {
      throw err.response?.data?.message || "Registration failed";
    }
  };

  const login = async (formData: LoginFormData) => {
    try {
      const res = await axios.post<AuthResponse>("/api/auth/login", formData, {
        withCredentials: true,
      });
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        navigate("/dashboard");
      }
    } catch (err: any) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  const logout = async () => {
    try {
      await axios.get<AuthResponse>("/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
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
