"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, CreditCard, Menu, Home, LogOut, Settings, User, TrendingUp, Filter } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("all")
  const [selectedSport, setSelectedSport] = React.useState("all")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Dummy data for bets
  const bets = [
    { id: 1, date: "2023-05-15", sport: "Fútbol", event: "Real Madrid vs Barcelona", bet: "Real Madrid", odds: 2.1, stake: 100, result: "Ganada", profit: 110 },
    { id: 2, date: "2023-05-16", sport: "Baloncesto", event: "Lakers vs Warriors", bet: "Warriors", odds: 1.8, stake: 50, result: "Perdida", profit: -50 },
    { id: 3, date: "2023-05-17", sport: "Tenis", event: "Nadal vs Djokovic", bet: "Nadal", odds: 2.5, stake: 75, result: "Ganada", profit: 112.5 },
    { id: 4, date: "2023-05-18", sport: "Fútbol", event: "Liverpool vs Man City", bet: "Empate", odds: 3.2, stake: 60, result: "Perdida", profit: -60 },
    { id: 5, date: "2023-05-19", sport: "Baloncesto", event: "Celtics vs Heat", bet: "Celtics", odds: 1.9, stake: 80, result: "Ganada", profit: 72 },
  ]

  const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0)
  const totalBets = bets.length
  const winRate = (bets.filter(bet => bet.result === "Ganada").length / totalBets * 100).toFixed(2)

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white">
     

      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Tracker de Apuestas</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Beneficio Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalProfit.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Apuestas Totales</CardTitle>
              <CreditCard className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalBets}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Porcentaje de Aciertos</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{winRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[180px] bg-gray-700 text-white">
              <SelectValue placeholder="Selecciona periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-[180px] bg-gray-700 text-white">
              <SelectValue placeholder="Selecciona deporte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="football">Fútbol</SelectItem>
              <SelectItem value="basketball">Baloncesto</SelectItem>
              <SelectItem value="tennis">Tenis</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Filter className="mr-2 h-4 w-4" />
            Aplicar Filtros
          </Button>
        </div>

        {/* Bets Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Historial de Apuestas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Fecha</TableHead>
                  <TableHead className="text-gray-300">Deporte</TableHead>
                  <TableHead className="text-gray-300">Evento</TableHead>
                  <TableHead className="text-gray-300">Apuesta</TableHead>
                  <TableHead className="text-gray-300">Cuota</TableHead>
                  <TableHead className="text-gray-300">Stake</TableHead>
                  <TableHead className="text-gray-300">Resultado</TableHead>
                  <TableHead className="text-right text-gray-300">Beneficio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bets.map((bet) => (
                  <TableRow key={bet.id}>
                    <TableCell className="font-medium text-white">{bet.date}</TableCell>
                    <TableCell className="text-gray-300">{bet.sport}</TableCell>
                    <TableCell className="text-gray-300">{bet.event}</TableCell>
                    <TableCell className="text-gray-300">{bet.bet}</TableCell>
                    <TableCell className="text-gray-300">{bet.odds}</TableCell>
                    <TableCell className="text-gray-300">${bet.stake}</TableCell>
                    <TableCell>
                      <span className={bet.result === "Ganada" ? "text-green-400" : "text-red-400"}>
                        {bet.result}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={bet.profit > 0 ? "text-green-400" : "text-red-400"}>
                        ${bet.profit.toFixed(2)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
    </ProtectedRoute>
  )
}