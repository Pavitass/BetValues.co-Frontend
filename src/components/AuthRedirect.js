"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && pathname === '/') {
        router.push('/comparator')
      } else if (!isAuthenticated && pathname !== '/' && !pathname.startsWith('/auth')) {
        router.push('/')
      }
    }
  }, [isAuthenticated, isLoading, router, pathname])

  return null
}