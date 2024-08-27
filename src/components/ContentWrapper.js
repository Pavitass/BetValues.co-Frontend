"use client"

import { usePathname } from 'next/navigation'

const routesWithoutNavigation = ['/auth', '/login', '/register'] // Add all routes that shouldn't have navigation

export default function ContentWrapper({ children }) {
  const pathname = usePathname()
  const shouldHaveNavigation = !(routesWithoutNavigation.some(route => pathname.startsWith(route)) || pathname === "/")

  return (
    <div className={`flex-1 flex flex-col min-h-screen ${shouldHaveNavigation ? 'md:ml-20' : ''} ${shouldHaveNavigation ? 'mt-14 mb-10' : ''} md:mt-0 md:mb-0`}>

      {children}
    </div>
  )
}