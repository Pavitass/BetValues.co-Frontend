"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CreditCard, Menu, Home, LogOut, Settings, User, X, Check, AlertTriangle, Zap } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

const subscriptionPlans = [
  {
    id: 1,
    name: "Básico",
    price: 9.99,
    period: "mes",
    features: [
      "Acceso a todas las apuestas deportivas",
      "Cuotas estándar",
      "Soporte por correo electrónico"
    ],
    recommended: false
  },
  {
    id: 2,
    name: "Pro",
    price: 19.99,
    period: "mes",
    features: [
      "Todo lo del plan Básico",
      "Cuotas mejoradas",
      "Apuestas en vivo",
      "Soporte prioritario 24/7"
    ],
    recommended: true
  },
  {
    id: 3,
    name: "Premium",
    price: 39.99,
    period: "mes",
    features: [
      "Todo lo del plan Pro",
      "Análisis avanzado de apuestas",
      "Acceso a eventos VIP",
      "Retiros express",
      "Gerente de cuenta personal"
    ],
    recommended: false
  }
]

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [currentPlan, setCurrentPlan] = React.useState(subscriptionPlans[0])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white">
     
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Suscripciones</h2>
        
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Tu suscripción actual</CardTitle>
            <CardDescription className="text-gray-400">
              Estás suscrito al plan {currentPlan.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">${currentPlan.price} <span className="text-sm font-normal text-gray-400">/ {currentPlan.period}</span></p>
            <ul className="mt-4 space-y-2">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Gestionar suscripción</Button>
          </CardFooter>
        </Card>

        <h3 className="text-2xl font-bold mb-4 text-white">Cambiar plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`bg-gray-800 border-gray-700 ${plan.recommended ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      ${plan.price} / {plan.period}
                    </CardDescription>
                  </div>
                  {plan.recommended && (
                    <Badge className="bg-blue-600 text-white">Recomendado</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.id === currentPlan.id ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                  disabled={plan.id === currentPlan.id}
                  onClick={() => setCurrentPlan(plan)}
                >
                  {plan.id === currentPlan.id ? 'Plan actual' : 'Cambiar a este plan'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
    </ProtectedRoute>
  )
}