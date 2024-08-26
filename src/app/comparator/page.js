'use client'

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { X, CalendarIcon, Search, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import EnhancedMatchCard from '@/components/EnhancedMatchCard'
import ProtectedRoute from "@/components/ProtectedRoute"

export default function ComparatorPage() {
  const [selectedMatch, setSelectedMatch] = React.useState(null)
  const [selectedBets, setSelectedBets] = React.useState([])
  const [selectedBookmaker, setSelectedBookmaker] = React.useState("Bookmaker1")
  const [selectedSport, setSelectedSport] = React.useState("all")
  const [selectedLeague, setSelectedLeague] = React.useState("all")
  const [selectedDate, setSelectedDate] = React.useState(new Date())
  const [showLiveOnly, setShowLiveOnly] = React.useState(false)
  const [minOdds, setMinOdds] = React.useState(1)
  const [maxOdds, setMaxOdds] = React.useState(10)
  const [stake, setStake] = React.useState(100)

  const sports = [
    { id: "all", name: "Todos los deportes" },
    { id: "football", name: "Fútbol" },
    { id: "basketball", name: "Baloncesto" },
    { id: "tennis", name: "Tenis" },
  ]

  const bookmakers = [
    { id: "wplay", name: "Wplay", logo: "/logos/wplay.png" },
    { id: "betplay", name: "BetPlay", logo: "/logos/betplay.png" },
    { id: "rushbet", name: "Rushbet", logo: "/logos/rushbet.png" },
    { id: "codere", name: "Codere", logo: "/logos/codere.png" },
    { id: "zamba", name: "Zamba", logo: "/logos/zamba.png" },
  ];

  const leagues = {
    all: [{ id: "all", name: "Todas las ligas" }],
    football: [
      { id: "all", name: "Todas las ligas" },
      { id: "premier-league", name: "Premier League" },
      { id: "la-liga", name: "La Liga" },
      { id: "bundesliga", name: "Bundesliga" },
      { id: "serie-a", name: "Serie A" },
      { id: "ligue-1", name: "Ligue 1" },
    ],
    basketball: [
      { id: "all", name: "Todas las ligas" },
      { id: "nba", name: "NBA" },
      { id: "euroleague", name: "Euroleague" },
    ],
    tennis: [
      { id: "all", name: "Todos los torneos" },
      { id: "grand-slam", name: "Grand Slam" },
      { id: "atp-tour", name: "ATP Tour" },
      { id: "wta-tour", name: "WTA Tour" },
    ],
  }

  const recommendedPicks = [
    { id: 'pick1', match: 'Manchester United vs Liverpool', type: 'Over 2.5 Goals', odds: 1.85 },
    { id: 'pick2', match: 'Barcelona vs Real Madrid', type: 'Barcelona to win', odds: 2.10 },
    { id: 'pick3', match: 'PSG vs Marseille', type: 'Both Teams to Score', odds: 1.75 },
  ]

  const additionalBets = [
    { id: 'add1', type: 'First Goal Scorer', odds: 5.50 },
    { id: 'add2', type: 'Correct Score 2-1', odds: 9.00 },
    { id: 'add3', type: 'Total Corners Over 10.5', odds: 1.95 },
    { id: 'add4', type: 'Red Card in Match', odds: 3.75 },
    { id: 'add5', type: 'Half-Time/Full-Time: Draw/Home', odds: 6.50 },
  ]

  const matches = [
    {
      id: '1',
      sport: 'football',
      league: 'Premier League',
      leagueLogo: 'https://logodownload.org/wp-content/uploads/2016/03/premier-league-0.png',
      status: 'live',
      time: '45:00',
      date: new Date('2024-08-25T14:00:00'),
      currentMinute: 47,
      additionalTime: 2,
      homeTeam: { 
        name: 'Manchester United', 
        logo: 'https://w7.pngwing.com/pngs/721/828/png-transparent-manchester-united-f-c-old-trafford-fa-cup-football-football-emblem-label-sport-thumbnail.png' 
      },
      awayTeam: { 
        name: 'Liverpool', 
        logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' 
      },
      score: { home: 2, away: 1 },
      odds: { local: 2.10, empate: 3.20, visitante: 3.50 }
    },
    {
      id: '2',
      sport: 'football',
      league: 'La Liga',
      leagueLogo: 'https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png',
      status: 'upcoming',
      time: '20:00',
      date: new Date('2024-08-25T20:00:00'),
      homeTeam: { 
        name: 'Barcelona', 
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png' 
      },
      awayTeam: { 
        name: 'Real Madrid', 
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png' 
      },
      score: { home: 0, away: 0 },
      odds: { local: 2.30, empate: 3.10, visitante: 2.90 }
    },
    {
      id: '3',
      sport: 'basketball',
      league: 'NBA',
      leagueLogo: 'https://cdn.nba.com/logos/nba/nba-logoman-75-word_white.svg',
      status: 'finished',
      time: 'FT',
      date: new Date('2024-08-25T19:00:00'),
      homeTeam: { 
        name: 'LA Lakers', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/1200px-Los_Angeles_Lakers_logo.svg.png' 
      },
      awayTeam: { 
        name: 'Golden State Warriors', 
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/1200px-Golden_State_Warriors_logo.svg.png' 
      },
      score: { home: 108, away: 102 },
      odds: { local: 1.80, empate: 15.00, visitante: 2.20 }
    },
    {
      id: '4',
      sport: 'tennis',
      league: 'Grand Slam',
      leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Australian_Open_logo.svg/1200px-Australian_Open_logo.svg.png',
      status: 'upcoming',
      time: '14:00',
      date: new Date('2023-05-14T14:00:00'),
      homeTeam: { 
        name: 'Novak Djokovic', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Novak_Djokovic_Queen%27s_Club_2018.jpg/640px-Novak_Djokovic_Queen%27s_Club_2018.jpg' 
      },
      awayTeam: { 
        name: 'Rafael Nadal', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Rafael_Nadal_10%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg/640px-Rafael_Nadal_10%2C_Aegon_Championships%2C_London%2C_UK_-_Diliff.jpg' 
      },
      score: { home: 0, away: 0 },
      odds: { local: 1.90, empate: 21.00, visitante: 2.00 }
    },
  ]

  const handleMatchClick = (match) => {
    setSelectedMatch(match)
  }

  const toggleBet = (bet) => {
    setSelectedBets((prevBets) => {
      const existingBetIndex = prevBets.findIndex((b) => b.match === bet.match)
      if (existingBetIndex !== -1) {
        if (prevBets[existingBetIndex].type === bet.type) {
          return prevBets.filter((_, index) => index !== existingBetIndex)
        } else {
          return prevBets.map((b, index) => (index === existingBetIndex ? bet : b))
        }
      }
      return [...prevBets, bet]
    })
  }

  const removeBet = (index) => {
    setSelectedBets(selectedBets.filter((_, i) => i !== index))
  }

  const clearBets = () => {
    setSelectedBets([])
  }

  const calculateTotalOdds = () => {
    return selectedBets.reduce((total, bet) => total * bet.odds, 1).toFixed(2)
  }

  const calculateProfit = () => {
    const totalOdds = calculateTotalOdds()
    return ((totalOdds * stake) - stake).toFixed(2)
  }

  const filteredMatches = matches.filter((match) => {
    const sportMatch = selectedSport === 'all' || match.sport === selectedSport
    const leagueMatch = selectedLeague === 'all' || match.league === selectedLeague
    const dateMatch = format(match.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    const liveMatch = !showLiveOnly || match.status === 'live'
    const oddsMatch = (match.odds.local >= minOdds && match.odds.local <= maxOdds) ||
                      (match.odds.empate >= minOdds && match.odds.empate <= maxOdds) ||
                      (match.odds.visitante >= minOdds && match.odds.visitante <= maxOdds)
    return sportMatch && leagueMatch && dateMatch && liveMatch && oddsMatch
  })

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar izquierdo */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 p-4 bg-gray-900">
          {selectedMatch ? (
            <Card className="bg-gray-800 border-gray-700 mb-4">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  Más apuestas de este partido
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {additionalBets.map((bet) => (
                      <div key={bet.id} className="bg-gray-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">{bet.type}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => toggleBet({ ...bet, match: `${selectedMatch.homeTeam.name} vs ${selectedMatch.awayTeam.name}` })}
                          >
                            {bet.odds}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : null}
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                Picks Recomendados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedPicks.map((pick) => (
                  <div key={pick.id} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white">{pick.match}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{pick.type}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => toggleBet(pick)}
                      >
                        {pick.odds}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

     {/* Contenido principal */}
     <main className="flex-1 p-6 overflow-auto bg-gray-900">
          <h2 className="text-3xl font-bold mb-6">Comparador de Cuotas Deportivas</h2>
          
          {/* Filtros */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4 bg-gray-700 p-4 rounded-lg">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                  <SelectValue placeholder="Selecciona deporte" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id}>{sport.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                <SelectTrigger className="w-[180px] bg-gray-600 text-white">
                  <SelectValue placeholder="Selecciona liga" />
                </SelectTrigger>
                <SelectContent>
                  {leagues[selectedSport].map((league) => (
                    <SelectItem key={league.id} value={league.id}>{league.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={"w-[180px] justify-start text-left font-normal bg-gray-600 text-white"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>Fecha</span>}
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="live-only"
                  checked={showLiveOnly}
                  onCheckedChange={setShowLiveOnly}
                />
                <label
                  htmlFor="live-only"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  En vivo
                </label>
              </div>

              <div className="flex items-center space-x-2 flex-grow">
                <span className="text-sm whitespace-nowrap">Cuotas:</span>
                <Slider
                  min={1}
                  max={10}
                  step={0.1}
                  value={[minOdds, maxOdds]}
                  onValueChange={([min, max]) => {
                    setMinOdds(min)
                    setMaxOdds(max)
                  }}
                  className="w-full max-w-xs"
                />
                <span className="text-sm whitespace-nowrap">{minOdds.toFixed(1)} - {maxOdds.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Lista de partidos o mensaje de no resultados */}
          {filteredMatches.length > 0 ? (
            <div className="space-y-6">
              {filteredMatches.map((match) => (
                <div key={match.id} onClick={() => handleMatchClick(match)}>
                  <EnhancedMatchCard
                    match={match}
                    selectedBets={selectedBets}
                    toggleBet={toggleBet}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-gray-800 rounded-lg text-center">
              <div className="relative w-32 h-32">
                <Search className="w-full h-full text-gray-500 absolute" />
                <AlertCircle className="w-1/2 h-1/2 text-yellow-500 absolute bottom-0 right-0" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300">¡Oops! No encontramos partidos</h3>
              <p className="text-gray-400 max-w-md">
                Parece que no tenemos información para los filtros seleccionados. 
                Intenta ajustar tus criterios de búsqueda o selecciona una fecha diferente.
              </p>
              <Button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  setSelectedSport("all")
                  setSelectedLeague("all")
                  setSelectedDate(new Date())
                  setShowLiveOnly(false)
                  setMinOdds(1)
                  setMaxOdds(10)
                }}
              >
                Restablecer filtros
              </Button>
            </div>
          )}
        </main>

        <aside className="w-full lg:w-1/4 xl:w-1/5 p-4 bg-gray-900">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                Tu Apuesta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedBookmaker} onValueChange={setSelectedBookmaker}>
                  <SelectTrigger className="w-full bg-gray-700 text-white">
                    <SelectValue>
                      {selectedBookmaker && (
                        <div className="flex items-center">
                          <Image
                            src={bookmakers.find(b => b.id === selectedBookmaker)?.logo}
                            alt={bookmakers.find(b => b.id === selectedBookmaker)?.name}
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          <span>{bookmakers.find(b => b.id === selectedBookmaker)?.name}</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {bookmakers.map((bookmaker) => (
                      <SelectItem key={bookmaker.id} value={bookmaker.id}>
                        <div className="flex items-center">
                          <Image
                            src={bookmaker.logo}
                            alt={bookmaker.name}
                            width={24}
                            height={24}
                            className="mr-2"
                          />
                          <span>{bookmaker.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedBets.length === 0 ? (
                  <div className="text-center text-gray-400 py-4">
                    Aún no has seleccionado ninguna apuesta
                  </div>
                ) : (
                  selectedBets.map((bet, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">{bet.match}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBet(index)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Apuesta por {bet.type}</span>
                        <span className="text-blue-400 font-bold">{bet.odds}</span>
                      </div>
                    </div>
                  ))
                )}

                {selectedBets.length > 0 && (
                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Cuota total:</span>
                      <span className="text-lg font-bold text-blue-400">{calculateTotalOdds()}</span>
                    </div>
                    <div>
                      <label htmlFor="stake" className="block text-sm font-medium text-gray-300 mb-1">
                        Monto de apuesta
                      </label>
                      <Input
                        id="stake"
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(Number(e.target.value))}
                        className="bg-gray-700 text-white border-gray-600"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">Ganancia potencial:</span>
                      <span className="text-lg font-bold text-green-400">${calculateProfit()}</span>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Realizar Apuesta</Button>
                    <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={clearBets}>
                      Borrar Apuestas
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
    </ProtectedRoute>
  )
}