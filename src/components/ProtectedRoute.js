"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        setIsReady(true);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
}