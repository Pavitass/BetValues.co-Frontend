"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Bell, CreditCard, Home, LogOut, Settings, User } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Component() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-gray-100">
  
      <div className="flex">
      
{/* Main content */}
<main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">Administración de Cuenta</h2>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="profile" className="text-white data-[state=active]:bg-gray-700">Perfil</TabsTrigger>
              <TabsTrigger value="subscription" className="text-white data-[state=active]:bg-gray-700">Suscripción</TabsTrigger>
              <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-gray-700">Notificaciones</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Información del Perfil</CardTitle>
                  <CardDescription className="text-gray-300">Actualiza tu información personal aquí.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nombre</Label>
                    <Input id="name" placeholder="Tu nombre" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" className="bg-gray-700 border-gray-600 text-white placeholder-gray-400" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Guardar Cambios</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="subscription">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Detalles de Suscripción</CardTitle>
                  <CardDescription className="text-gray-300">Administra tu plan de suscripción actual.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">Plan Actual: Premium</span>
                    <Button variant="outline" className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white">Cambiar Plan</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">Próxima facturación: 01/05/2023</span>
                    <Button variant="outline" className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white">Ver Facturas</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">Cancelar Suscripción</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Preferencias de Notificación</CardTitle>
                  <CardDescription className="text-gray-300">Configura cómo quieres recibir notificaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="email-notifications" className="text-white">Notificaciones por correo</Label>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="push-notifications" className="text-white">Notificaciones push</Label>
                    <Switch id="push-notifications" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="sms-notifications" className="text-white">Notificaciones SMS</Label>
                    <Switch id="sms-notifications" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Guardar Preferencias</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
    </ProtectedRoute>
  )
}