"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProtectedRoute from '@/components/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CreditCard, Menu, Home, LogOut, Settings, User, X, ExternalLink, Gift } from "lucide-react"
import Image from 'next/image';

const affiliatedBookmakers = [
  { id: 1, name: "BetMaster", logo: "/placeholder.svg?height=80&width=80", description: "Amplia variedad de deportes y mercados" },
  { id: 2, name: "SportKing", logo: "/placeholder.svg?height=80&width=80", description: "Mejores cuotas en fútbol y baloncesto" },
  { id: 3, name: "LuckyBet", logo: "/placeholder.svg?height=80&width=80", description: "Especialistas en apuestas en vivo" },
  { id: 4, name: "WinnerOdds", logo: "/placeholder.svg?height=80&width=80", description: "Bono de bienvenida más alto del mercado" },
]

const availableBonuses = [
  { id: 1, bookmaker: "BetMaster", description: "100% hasta $100 en tu primer depósito", code: "BETMASTER100" },
  { id: 2, bookmaker: "SportKing", description: "Apuesta $10 y recibe $30 en apuestas gratis", code: "SPORTKING30" },
  { id: 3, bookmaker: "LuckyBet", description: "50% hasta $50 en apuestas deportivas", code: "LUCKY50" },
  { id: 4, bookmaker: "WinnerOdds", description: "200% hasta $200 para nuevos usuarios", code: "WINNER200" },
]

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white">
     
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Afiliados y Bonos</h2>
        
        <Tabs defaultValue="affiliates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800">
            <TabsTrigger value="affiliates" className="text-white data-[state=active]:bg-gray-700">Casas de Apuestas Afiliadas</TabsTrigger>
            <TabsTrigger value="bonuses" className="text-white data-[state=active]:bg-gray-700">Reclamar Bonos</TabsTrigger>
          </TabsList>
          <TabsContent value="affiliates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {affiliatedBookmakers.map((bookmaker) => (
                <Card key={bookmaker.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                    <Image
  src={bookmaker.logo}
  alt={`Logo de ${bookmaker.name}`}
  width={64}
  height={64}
  className="w-16 h-16 rounded-full"
/>
                      <CardTitle className="text-white">{bookmaker.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{bookmaker.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Visitar sitio
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bonuses">
            <div className="space-y-6 mt-6">
              {availableBonuses.map((bonus) => (
                <Card key={bonus.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{bonus.bookmaker}</CardTitle>
                    <CardDescription className="text-gray-300">{bonus.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Label htmlFor={`bonus-code-${bonus.id}`} className="text-gray-300">Código de bono:</Label>
                      <Input id={`bonus-code-${bonus.id}`} value={bonus.code} readOnly className="bg-gray-700 text-white border-gray-600" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button className="bg-green-600 hover:bg-green-700">Copiar código</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Reclamar bono
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </ProtectedRoute>
  )
}