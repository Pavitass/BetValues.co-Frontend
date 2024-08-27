import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { 
  User, Home, BarChart2, PlusSquare, Users, Bell, CreditCard, 
  LogOut, HelpCircle, ChevronRight, ChevronLeft, Repeat, MoreHorizontal, Gift
} from "lucide-react"

import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Component({ onLogout, userName = "John Doe" }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const pathname = usePathname()
  const sidebarRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { href: '/account', icon: User, label: 'Mi cuenta' },
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/my-bets', icon: BarChart2, label: 'Mis apuestas' },
    { href: '/parlay-builder', icon: PlusSquare, label: 'Armar mi combinada' },
    { href: '/affiliates', icon: Gift, label: 'Afiliados y bonos' },
    { href: '/account/notifications', icon: Bell, label: 'Notificaciones' },
    { href: '/account/suscriptions', icon: Repeat, label: 'Suscripciones' },
    { href: '/account/billing', icon: CreditCard, label: 'Facturación' },
  ]

  const mobileNavItems = [
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/parlay-builder', icon: PlusSquare, label: 'Combinada' },
    { href: '/my-bets', icon: BarChart2, label: 'Mis apuestas' },
    { href: '/more', icon: MoreHorizontal, label: 'Más' },
  ]

  const moreMenuItems = [
    { href: '/account/affiliates', icon: Gift, label: 'Afiliados y bonos' },
    { href: '/account/billing', icon: CreditCard, label: 'Facturación' },
    { href: '/account/suscriptions', icon: Repeat, label: 'Suscripciones' },
    { href: '/help', icon: HelpCircle, label: 'Pedir ayuda' },
    { onClick: onLogout, icon: LogOut, label: 'Cerrar sesión', color: 'red' },
  ]

  const handleNavItemClick = (href) => {
    if (href === '/more') {
      setIsMoreMenuOpen(true)
    } else {
      router.push(href)
    }
  }

  const isActiveRoute = (itemHref) => {
    if (itemHref === '/' && pathname === '/comparator') return true
    return pathname === itemHref
  }

  const LogoutButton = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button 
            variant="ghost" 
            className={`w-full flex ${isExpanded ? 'flex-row items-center justify-start' : 'flex-col items-center justify-center'} text-red-400 ${isExpanded ? 'px-4' : 'px-2'}`}
          
          >
            <LogOut className={`h-5 w-5 ${isExpanded ? 'mr-3' : ''}`} />
            {isExpanded && <span>Cerrar sesión</span>}
          </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro que quieres cerrar sesión?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción cerrará tu sesión actual. Tendrás que iniciar sesión nuevamente para acceder a tu cuenta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-900">Cancelar</AlertDialogCancel>
          <AlertDialogAction  className="bg-red-600 hover:bg-red-700"  onClick={onLogout}>Cerrar sesión</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <>
      {/* Header for mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-40">
        <Link href="/" className="text-xl font-bold">BETVALUES.CO</Link>
        <div className="flex items-center space-x-4">
          <Link href="/account/notifications">
            <Bell className="h-6 w-6" />
          </Link>
          <Link href="/account">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </header>

      {/* Sidebar for desktop */}
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        } flex-col z-30 hidden md:flex`}
      >
        <div className="p-4 flex items-center justify-center">
          {isExpanded ? (
            <Link href="/" className="text-2xl font-bold">BETVALUES.CO</Link>
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
                  className={`w-full flex ${isExpanded ? 'flex-row items-center justify-start' : 'flex-col items-center justify-center'} text-white ${isActiveRoute(item.href) ? 'bg-gray-700' : ''} ${isExpanded ? 'px-4' : 'px-2'}`}
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

          <LogoutButton/>

      
        </div>
      </aside>
      
      {/* Fixed and animated toggle button */}
      <button
        className={`fixed bottom-40 bg-gray-900 text-white p-4 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          isExpanded ? 'left-64' : '-left-4'
        } transform translate-x-1/2 z-40 hidden md:block`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        style={{ transition: 'left 0.3s ease-in-out' }}
      >
        {isExpanded ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </button>

      {/* Bottom navigation for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white z-40 border-t border-gray-700 shadow-lg">
        <div className="flex justify-around items-center h-20">
          {mobileNavItems.map((item) => {
            const isActive = isActiveRoute(item.href)
            return (
              <div 
                key={item.href}
                className={`flex flex-col items-center justify-center w-1/4 h-full cursor-pointer ${
                  isActive ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleNavItemClick(item.href)}
              >
                <item.icon className={`h-6 w-6 mb-1 ${isActive }`} />
                <span className="text-xs">{item.label}</span>
              </div>
            )
          })}
        </div>
      </nav>

      <Sheet open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
        <SheetContent side="bottom" className="h-[300px] bg-gray-800 text-white">
          <SheetTitle className="text-lg font-semibold text-white">Más opciones</SheetTitle>
          <div className="py-4">
            {moreMenuItems.map((item) => (
              <Button 
                key={item.label}
                variant="ghost" 
                className={`w-full flex items-center justify-start ${item.color === 'red' ? 'text-red-400' : 'text-white'}`}
                onClick={item.onClick ? item.onClick : () => router.push(item.href)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </SheetContent>
       
      </Sheet>
    </>
  )
}
