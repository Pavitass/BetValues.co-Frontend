"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && pathname.startsWith('/auth')) {
        router.push('/comparator');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = (email, password) => {
    if (email === "jacopava@gmail.com" && password === "betburger.co") {
      const token = 'dummy_token';
      localStorage.setItem('auth_token', token);
      setIsAuthenticated(true);
      router.push('/comparator');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}