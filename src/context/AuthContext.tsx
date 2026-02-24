import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Role } from "@/lib/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: Role) => Promise<User>;
  register: (name: string, email: string, role: Role) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("infinitative_user");
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      return (parsed && typeof parsed === "object" && "id" in parsed) ? parsed : null;
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      return null;
    }
  });

  const login = async (email: string, role: Role) => {
    const mockUser: User = {
      id: "USR-001",
      name: "John Doe",
      email: email,
      role: role,
    };
    setUser(mockUser);
    localStorage.setItem("infinitative_user", JSON.stringify(mockUser));
    toast.success(`Welcome back, ${mockUser.name}!`);
    return mockUser;
  };

  const register = async (name: string, email: string, role: Role) => {
    const mockUser: User = {
      id: `USR-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      role,
    };
    setUser(mockUser);
    localStorage.setItem("infinitative_user", JSON.stringify(mockUser));
    toast.success("Account created successfully!");
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("infinitative_user");
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
