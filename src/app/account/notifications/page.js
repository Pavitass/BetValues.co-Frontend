'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, AlertTriangle, Info, Star, DollarSign, Users, Settings, CheckCircle, Trash2 } from "lucide-react"
import { format } from "date-fns"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'info',
      category: 'bets',
      title: 'Nuevo partido disponible',
      message: 'Se ha añadido un nuevo partido de la Premier League a las apuestas disponibles.',
      date: new Date('2023-05-15T10:30:00'),
      read: false,
    },
    {
      id: '2',
      type: 'success',
      category: 'bets',
      title: '¡Apuesta ganada!',
      message: 'Tu apuesta en el partido Barcelona vs Real Madrid ha sido exitosa. Tus ganancias han sido añadidas a tu cuenta.',
      date: new Date('2023-05-14T18:45:00'),
      read: true,
    },
    {
      id: '3',
      type: 'warning',
      category: 'bets',
      title: 'Cambio en las cuotas',
      message: 'Las cuotas para el partido PSG vs Marseille han cambiado. Revisa tus apuestas pendientes.',
      date: new Date('2023-05-13T14:20:00'),
      read: false,
    },
    {
      id: '4',
      type: 'error',
      category: 'payments',
      title: 'Error en el procesamiento de pago',
      message: 'Hubo un problema al procesar tu último depósito. Por favor, verifica tu método de pago.',
      date: new Date('2023-05-12T09:15:00'),
      read: false,
    },
    {
      id: '5',
      type: 'info',
      category: 'system',
      title: 'Actualización de términos y condiciones',
      message: 'Hemos actualizado nuestros términos y condiciones. Por favor, revísalos en tu próximo inicio de sesión.',
      date: new Date('2023-05-11T11:00:00'),
      read: true,
    },
    {
      id: '6',
      type: 'info',
      category: 'following',
      title: 'Nuevo contenido de tu equipo favorito',
      message: 'El Real Madrid ha publicado una nueva actualización. ¡Échale un vistazo!',
      date: new Date('2023-05-10T16:30:00'),
      read: false,
    },
  ])

  const [activeTab, setActiveTab] = useState('all')

  const filteredNotifications = notifications.filter((notification) => {
    return activeTab === 'all' || notification.category === activeTab
  })

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'info': return <Info className="w-6 h-6 text-blue-400" />
      case 'success': return <Check className="w-6 h-6 text-green-400" />
      case 'warning': return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'error': return <AlertTriangle className="w-6 h-6 text-red-400" />
    }
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white py-6 px-12 ">
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Bell className="mr-2" /> Notificaciones
        </h1>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Tus notificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
              <TabsList className="grid w-full grid-cols-5 bg-gray-700">
                <TabsTrigger 
                  value="all" 
                  className="text-white data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Todos
                </TabsTrigger>
                <TabsTrigger 
                  value="bets" 
                  className="text-white data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Apuestas
                </TabsTrigger>
                <TabsTrigger 
                  value="payments" 
                  className="text-white data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Pagos
                </TabsTrigger>
                <TabsTrigger 
                  value="following" 
                  className="text-white data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Seguidos
                </TabsTrigger>
                <TabsTrigger 
                  value="system" 
                  className="text-white data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Sistema
                </TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab} className="mt-4">
                <ScrollArea className="h-[600px] pr-4">
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div key={notification.id} className={`bg-gray-700 p-4 rounded-lg ${notification.read ? 'opacity-60' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              {getIcon(notification.type)}
                              <div>
                                <h3 className="font-semibold text-white">{notification.title}</h3>
                                <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-2">{format(notification.date, "d MMMM yyyy, HH:mm")}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-400 hover:text-blue-300 hover:bg-gray-600"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="w-5 h-5" />
                                  <span className="sr-only">Marcar como leído</span>
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-300 hover:bg-gray-600"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <Trash2 className="w-5 h-5" />
                                <span className="sr-only">Eliminar notificación</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Star className="w-16 h-16 text-gray-600 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-400">No hay notificaciones</h3>
                      <p className="text-gray-500 mt-2">Estás al día con todas tus notificaciones</p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
    </ProtectedRoute>
  )
}