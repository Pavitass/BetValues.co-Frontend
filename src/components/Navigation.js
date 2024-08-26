"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { User, Home, BarChart2, PlusSquare, Users,  Bell, CreditCard, LogOut, HelpCircle, ChevronRight, ChevronLeft, Repeat } from "lucide-react"

export default function Navigation({onLogout, userName = "John Doe"}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef(null)

  const navItems = [
    { href: '/account', icon: User, label: 'Mi cuenta' },
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/my-bets', icon: BarChart2, label: 'Mis apuestas' },
    { href: '/parlay-builder', icon: PlusSquare, label: 'Armar mi combinada' },
    { href: '/affiliates', icon: Users, label: 'Afiliados' },
    { href: '/account/notifications', icon: Bell, label: 'Notificaciones' },
    { href: '/account/suscriptions', icon: Repeat, label: 'Suscripciones' },
    { href: '/account/billing', icon: CreditCard, label: 'Facturación' },
  ]

  return (
    <div className="relative">
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        } flex flex-col z-30 md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-center">
          {isExpanded ? (
            <Link href="/" className="text-2xl  font-bold">BETVALUES.CO</Link>
          ) : (
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-800 font-bold text-lg">BV</span>
            </div>
          )}
        </div>

        <div className="border-b border-gray-700 w-full my-4"></div>

        <nav className="flex-grow overflow-y-auto mt-4">
          <div className="space-y-1 p-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant="ghost" 
                  className={`w-full flex ${isExpanded ? 'flex-row items-center justify-start' : 'flex-col items-center justify-center'} text-white ${pathname === item.href ? 'bg-gray-700' : ''} ${isExpanded ? 'px-4' : 'px-2'}`}
                >
                  <item.icon className={`h-5 w-5 ${isExpanded ? 'mr-3' : ''}`} />
                  {isExpanded && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 space-y-2">
          <Button 
            variant="ghost" 
            className={`w-full flex ${isExpanded ? 'flex-row items-center justify-start' : 'flex-col items-center justify-center'} text-white ${isExpanded ? 'px-4' : 'px-2'}`}
          >
            <HelpCircle className={`h-5 w-5 ${isExpanded ? 'mr-3' : ''}`} />
            {isExpanded && <span>Solicitar ayuda</span>}
          </Button>

          <Button 
            variant="ghost" 
            className={`w-full flex ${isExpanded ? 'flex-row items-center justify-start' : 'flex-col items-center justify-center'} text-red-400 ${isExpanded ? 'px-4' : 'px-2'}`}
            onClick={onLogout}
          >
            <LogOut className={`h-5 w-5 ${isExpanded ? 'mr-3' : ''}`} />
            {isExpanded && <span>Cerrar sesión</span>}
          </Button>
        </div>
      </aside>
      
      <button
        className={`absolute top-1/2 -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          isExpanded ? 'left-60' : 'left-16'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </button>
    </div>
  );
}