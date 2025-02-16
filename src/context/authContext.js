"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (storedUserId && token) {
      setUser({ id: storedUserId }); 
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.auth.login(email, password);

      localStorage.setItem("id", data.data._id); 
      localStorage.setItem("token", data.token);
      setUser({ id: data.data._id });

      toast.success("Logged in successfully");
      router.push("/dashBoard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      await api.auth.signup(name, email, password);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
