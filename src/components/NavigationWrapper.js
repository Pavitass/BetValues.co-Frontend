"use client"

import { usePathname, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/' && !pathname.startsWith('/auth')) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading || pathname === '/' || pathname.startsWith('/auth')) {
    return null;
  }

  return isAuthenticated ? <Navigation onLogout={handleLogout} /> : null;
}