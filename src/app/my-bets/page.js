'use client'

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import EnhancedCharts from "@/components/ui/charts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, TrendingUp, TrendingDown, DollarSign, Filter, ChevronRightIcon } from "lucide-react"
import { format, subDays } from "date-fns"
import ProtectedRoute from "@/components/ProtectedRoute"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'


export default function BetTrackingDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("all")
  const [selectedSportbook, setSelectedSportbook] = useState("all")
  const [selectedSport, setSelectedSport] = React.useState("all")
  

  const bets = [
    { id: 1, date: "2023-05-15", sport: "Fútbol",sportbook: "BetPlay", event: "Real Madrid vs Barcelona", bet: "Real Madrid", odds: 2.1, stake: 100, result: "Ganada", profit: 110 },
    { id: 2, date: "2023-05-16", sport: "Baloncesto", sportbook: "RushBet", event: "Lakers vs Warriors", bet: "Warriors", odds: 1.8, stake: 50, result: "Ganada", profit: -50 },
    { id: 3, date: "2023-05-17", sport: "Tenis",sportbook: "Wplay", event: "Nadal vs Djokovic", bet: "Nadal", odds: 2.5, stake: 75, result: "Ganada", profit: 112.5 },
    { id: 4, date: "2023-05-18", sport: "Fútbol", sportbook: "Codere", event: "Liverpool vs Man City", bet: "Empate", odds: 3.2, stake: 60, result: "Perdida", profit: 60 },
    { id: 5, date: "2023-05-19", sport: "Baloncesto", sportbook: "Zamba", event: "Celtics vs Heat", bet: "Celtics", odds: 1.9, stake: 80, result: "Perdida", profit: 72 },
  ]

  const sportbooks = ["all", "BetPlay", "Wplay", "RushBet", "Codere", "Zamba"]

  const filteredBets = bets.filter(bet => 
    selectedSportbook === "all" || bet.sportbook === selectedSportbook
  )


  const totalProfit = bets.reduce((sum, bet) => sum + bet.profit, 0)
  const totalBets = bets.length
  const calculateWinRate = (bets) => {
    const totalBets = bets.length
    if (totalBets === 0) return 0
    const wonBets = bets.filter(bet => bet.result === "Ganada").length
    return (wonBets / totalBets * 100).toFixed(2)
  }

  const winRate = calculateWinRate(bets)

  // Data for line chart
  const profitData = bets.map((bet, index) => ({
    date: bet.date,
    profit: bets.slice(0, index + 1).reduce((sum, b) => sum + b.profit, 0)
  }))

  // Data for pie chart
  const sportData = bets.reduce((acc, bet) => {
    acc[bet.sport] = (acc[bet.sport] || 0) + 1
    return acc
  }, {})
  const pieData = Object.entries(sportData).map(([name, value]) => ({ name, value }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const currentDate = new Date()
  const thirtyDaysAgo = subDays(currentDate, 30)
  const sixtyDaysAgo = subDays(currentDate, 60)


  const currentPeriodBets = bets.filter(bet => new Date(bet.date) >= thirtyDaysAgo)
  const previousPeriodBets = bets.filter(bet => new Date(bet.date) >= sixtyDaysAgo && new Date(bet.date) < thirtyDaysAgo)

  const currentPeriodProfit = currentPeriodBets.reduce((sum, bet) => sum + bet.profit, 0)
  const previousPeriodProfit = previousPeriodBets.reduce((sum, bet) => sum + bet.profit, 0)

  const profitChangePercentage = previousPeriodProfit !== 0
    ? ((currentPeriodProfit - previousPeriodProfit) / Math.abs(previousPeriodProfit) * 100).toFixed(2)
    : currentPeriodProfit > 0 ? '100.00' : '0.00'

    const currentPeriodWinRate = parseFloat(calculateWinRate(currentPeriodBets))
    const previousPeriodWinRate = parseFloat(calculateWinRate(previousPeriodBets))
  
    const calculateWinRateChange = (current, previous) => {
      if (previous === 0) {
        return current > 0 ? '100.00' : '0.00'
      }
      return ((current - previous) / previous * 100).toFixed(2)
    }
  
    const winRateChangePercentage = calculateWinRateChange(currentPeriodWinRate, previousPeriodWinRate)

  const getWinRateColor = (rate) => {
    if (rate < 50) return 'text-red-500'
    return 'text-green-500'
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Mis apuestas</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Total Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${totalProfit.toFixed(2)}
            </div>
            <p className="text-xs text-gray-400 flex items-center">
              {profitChangePercentage >= 0 ? 
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> :
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              }
              <span className={profitChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                {profitChangePercentage}%
              </span>
              <span className="ml-1">from last period</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Tasa de ganancias</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getWinRateColor(parseFloat(winRate))}`}>
              {winRate}%
            </div>
            <p className="text-xs text-gray-400 flex items-center">
              {winRateChangePercentage >= 0 ?
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> :
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              }
              <span className={winRateChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(winRateChangePercentage)}%
              </span>
              <span className="ml-1">from last period</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-200">Total Bets</CardTitle>
            <CalendarIcon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalBets}</div>
            <p className="text-xs text-gray-400 flex items-center">
              {bets.filter(bet => new Date(bet.date) >= thirtyDaysAgo).length >= 
               bets.filter(bet => new Date(bet.date) >= sixtyDaysAgo && new Date(bet.date) < thirtyDaysAgo).length ?
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> :
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              }
              <span className={bets.filter(bet => new Date(bet.date) >= thirtyDaysAgo).length >= 
                               bets.filter(bet => new Date(bet.date) >= sixtyDaysAgo && new Date(bet.date) < thirtyDaysAgo).length ? 
                               'text-green-500' : 'text-red-500'}>
                {Math.abs(bets.filter(bet => new Date(bet.date) >= thirtyDaysAgo).length - 
                          bets.filter(bet => new Date(bet.date) >= sixtyDaysAgo && new Date(bet.date) < thirtyDaysAgo).length)}
              </span>
              <span className="ml-1">since last period</span>
            </p>
          </CardContent>
        </Card>
      </div>

      
          {/* Filters */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4 sm:mb-6">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-700 text-white">
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
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-700 text-white">
                <SelectValue placeholder="Selecciona deporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="football">Fútbol</SelectItem>
                <SelectItem value="basketball">Baloncesto</SelectItem>
                <SelectItem value="tennis">Tenis</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Aplicar Filtros
            </Button>
          </div>

          {/* Charts */}
      
      
          <EnhancedCharts  profitData={profitData} sportDistributionData={pieData}/>


      <Card className="bg-gray-800 border-gray-700 sm:max-w-full max-w-[360px]">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-200">Bet History</CardTitle>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={"w-full sm:w-[200px] justify-start text-left font-normal bg-gray-700 text-white"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(selectedDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={selectedSportbook} onValueChange={setSelectedSportbook}>
            <SelectTrigger className="w-full sm:w-[200px] bg-gray-700 text-white">
              <SelectValue placeholder="Select Sportbook" />
            </SelectTrigger>
            <SelectContent>
              {sportbooks.map((sportbook) => (
                <SelectItem key={sportbook} value={sportbook}>
                  {sportbook === "all" ? "All Sportbooks" : sportbook}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-200">Bet Name</TableHead>
                <TableHead className="text-gray-200">Profit</TableHead>
                <TableHead className="text-gray-200">Sportbook</TableHead>
                <TableHead className="text-gray-200">Amount</TableHead>
                <TableHead className="text-gray-200">Odds</TableHead>
                <TableHead className="text-gray-200">Sport</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBets.map((bet) => (
                <TableRow key={bet.id}>
                  <TableCell className="text-white">{bet.event}</TableCell>
                  <TableCell className={bet.profit >= 0 ? "text-green-500" : "text-red-500"}>
                    ${bet.profit}
                  </TableCell>
                  <TableCell className="text-gray-300">{bet.sportbook}</TableCell>
                  <TableCell className="text-gray-300">${bet.amount}</TableCell>
                  <TableCell className="text-gray-300">{bet.odds}</TableCell>
                  <TableCell className="text-gray-300">{bet.sport}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  

    </div>
    </ProtectedRoute>
  )
}