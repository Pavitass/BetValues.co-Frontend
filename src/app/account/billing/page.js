"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, CreditCard, Menu, Home, LogOut, Settings, User, X, Plus, Download } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

const invoices = [
  { id: 'INV001', date: '2023-05-01', amount: 19.99, status: 'Pagada' },
  { id: 'INV002', date: '2023-04-01', amount: 19.99, status: 'Pagada' },
  { id: 'INV003', date: '2023-03-01', amount: 19.99, status: 'Pagada' },
  { id: 'INV004', date: '2023-02-01', amount: 19.99, status: 'Pagada' },
  { id: 'INV005', date: '2023-01-01', amount: 19.99, status: 'Pagada' },
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
        <h2 className="text-3xl font-bold mb-6 text-white">Facturación</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Método de pago actual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <CreditCard className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-white font-semibold">Visa terminada en 1234</p>
                  <p className="text-gray-400">Expira 12/2025</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Actualizar método de pago</Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Plan actual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">$19.99 <span className="text-sm font-normal text-gray-400">/ mes</span></p>
              <p className="text-gray-400 mt-2">Plan Pro</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Cambiar plan</Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Historial de facturación</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Factura</TableHead>
                  <TableHead className="text-white">Fecha</TableHead>
                  <TableHead className="text-white">Monto</TableHead>
                  <TableHead className="text-white">Estado</TableHead>
                  <TableHead className="text-right text-white">Descargar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium text-white">{invoice.id}</TableCell>
                    <TableCell className="text-gray-300">{invoice.date}</TableCell>
                    <TableCell className="text-gray-300">${invoice.amount}</TableCell>
                    <TableCell className="text-green-400">{invoice.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Descargar factura {invoice.id}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Configuración de facturación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="billing-email" className="text-gray-300">Correo electrónico de facturación</Label>
              <Input id="billing-email" className="bg-gray-700 text-white border-gray-600" defaultValue="usuario@ejemplo.com" />
            </div>
            <div>
              <Label htmlFor="billing-currency" className="text-gray-300">Moneda de facturación</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="billing-currency" className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="Selecciona una moneda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD - Dólar estadounidense</SelectItem>
                  <SelectItem value="eur">EUR - Euro</SelectItem>
                  <SelectItem value="gbp">GBP - Libra esterlina</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Guardar cambios</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
    </ProtectedRoute>
  )
}