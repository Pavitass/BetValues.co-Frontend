"use client"

import React, {useState}  from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Bell, CreditCard, Menu, Home, LogOut, Settings, User, Plus, X, DollarSign, Search, ChevronRight, ChevronLeft, Check, Trash} from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"
import CustomSelect from "@/components/ui/customs-select"



const bookmakers = [
  { id: "wplay", name: "Wplay", logo: "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png", odds:4.2 },
  { id: "betplay", name: "BetPlay", logo: "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png", odds: 4},
  { id: "rushbet", name: "Rushbet", logo: "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png", odds: 2.5 },
  { id: "codere", name: "Codere", logo: "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png", odds: 4.5 },
  { id: "zamba", name: "Zamba", logo: "https://assets.laliga.com/assets/logos/laliga-v/laliga-v-1200x1200.png", odds: 3.5 },
];


const availableMatches = [
  {
    id: 1,
    league: "Premier League",
    event: "Manchester City vs Liverpool",
    bets: [
      { id: 1, type: "1X2", selection: "Manchester City", odds: 1.95 },
      { id: 2, type: "1X2", selection: "Empate", odds: 3.50 },
      { id: 3, type: "1X2", selection: "Liverpool", odds: 3.80 },
      { id: 4, type: "BTTS", selection: "Sí", odds: 1.75 },
      { id: 5, type: "BTTS", selection: "No", odds: 2.05 },
      { id: 6, type: "Over/Under", selection: "Over 2.5", odds: 1.90 },
      { id: 7, type: "Over/Under", selection: "Under 2.5", odds: 1.90 },
      { id: 8, type: "Correct Score", selection: "1-0", odds: 7.50 },
      { id: 9, type: "Correct Score", selection: "2-1", odds: 9.00 },
    ]
  },
  {
    id: 2,
    league: "La Liga",
    event: "Real Madrid vs Barcelona",
    bets: [
      { id: 10, type: "1X2", selection: "Real Madrid", odds: 2.10 },
      { id: 11, type: "1X2", selection: "Empate", odds: 3.40 },
      { id: 12, type: "1X2", selection: "Barcelona", odds: 3.20 },
      { id: 13, type: "BTTS", selection: "Sí", odds: 1.65 },
      { id: 14, type: "BTTS", selection: "No", odds: 2.20 },
      { id: 15, type: "Over/Under", selection: "Over 2.5", odds: 1.85 },
      { id: 16, type: "Over/Under", selection: "Under 2.5", odds: 1.95 },
      { id: 17, type: "Correct Score", selection: "2-0", odds: 10.00 },
      { id: 18, type: "Correct Score", selection: "2-2", odds: 11.00 },
    ]
  },
]

export default function Component() {
 
  const [parlayBets, setParlayBets] = useState([])
  const [stake, setStake] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [tempSelectedBets, setTempSelectedBets] = useState([])


  const toggleBet = (bet, bookmaker) => {
    setTempSelectedBets((prevBets) => {
      const existingBetIndex = prevBets.findIndex(b => b.id === bet.id)

      if (existingBetIndex !== -1) {
        // Actualiza la apuesta existente
        return prevBets.map((b, index) => 
          index === existingBetIndex 
            ? { ...b, bookmaker, odds: bookmaker.odds } 
            : b
        )
      }
      
      // Agrega una nueva apuesta
      return [...prevBets, { ...bet, bookmaker, odds: bookmaker.odds }]
    })
  }


  const handleBookmakerChange = (betId, selectedBookmaker) => {
    console.log(selectedBookmaker, betId);
  
    // Actualiza tempSelectedBets con la nueva cuota y bookmaker
    const updatedTempSelectedBets = tempSelectedBets.map((bet) =>
      bet.id === betId
        ? { ...bet, bookmaker: selectedBookmaker, odds: selectedBookmaker.odds }
        : bet
    );
  
    setTempSelectedBets(updatedTempSelectedBets);
  
    // Actualiza parlayBets con los cambios en tempSelectedBets
    setParlayBets(prevParlayBets => {
      const updatedParlayBets = prevParlayBets.map(bet =>
        bet.id === betId
          ? { ...bet, bookmaker: selectedBookmaker, odds: selectedBookmaker.odds }
          : bet
      );
  
      return updatedParlayBets;
    });
  };
  

  const saveBets = () => {
    setParlayBets([...parlayBets, ...tempSelectedBets.map(bet => ({
      ...bet,
      event: selectedMatch.event,
      league: selectedMatch.league
    }))])
    setTempSelectedBets([])
    setIsDialogOpen(false)
    setSelectedMatch(null)
  }

  const cancelSelection = () => {
    setTempSelectedBets([])
    setSelectedMatch(null)
  }

  const removeBet = (id) => {
    setParlayBets(parlayBets.filter(bet => bet.id !== id))
  }

  const calculateTotalOdds = () => {
    return parlayBets.reduce((total, bet) => total * bet.odds, 1).toFixed(2)
  }

  const calculatePotentialWin = () => {
    return (stake * calculateTotalOdds()).toFixed(2)
  }

  const filteredMatches = availableMatches.filter(match => 
    match.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    match.league.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const OddsButton = ({ bet }) => (
    <Popover>
      <PopoverTrigger asChild>
      <Card 
          
                  className={`bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer ${
                    tempSelectedBets.some(b => b.id === bet.id) ? 'ring-2 ring-blue-500' : ''
                  }`}
                 
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center justify-between h-full">
                      <div className="text-center mb-2">
                        <p className="text-sm text-gray-300">{bet.type}</p>
                        <p className="text-white">{bet.selection}</p>
                      </div>
                      <span className="font-bold text-white">{bet.odds}</span>
                    </div>
                  </CardContent>
                </Card>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0 bg-gray-800 border-gray-700 text-white">
        <div className="grid gap-4 p-4">
          {bookmakers.map((bookmaker) => (
            <Button
              key={bookmaker.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => toggleBet(bet, bookmaker)}
            >
              <img
                src={bookmaker.logo}
                alt={bookmaker.name}
                width={24}
                height={24}
                className="mr-2"
              />
              <span>{bookmaker.name}</span>
              <span className="ml-auto font-bold">{bookmaker.odds}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-900 text-white">
    

      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-white">Parlay Builder</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
            <Card className="bg-gray-800 border-gray-700">
  <CardHeader>
    <CardTitle className="text-white flex flex-col items-center justify-between md:flex-row md:items-center">
      <span className="mb-4 md:mb-0">Selecciones del Parlay</span>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Añadir Selección
      </Button>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
    {parlayBets.map((bet, index) => (
  <Card key={bet.id} className="bg-gray-700 border-gray-600"> 
    <CardHeader className="p-4">
      <CardTitle className="text-white text-lg flex items-center justify-between">
        <span>Selección {index + 1}</span>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => removeBet(bet.id)}
          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Eliminar selección</span>
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="space-y-2">
        <p className="text-sm text-gray-300">{bet.league}</p>
        <p className="font-semibold text-white">{bet.event}</p>
    
        <div className="flex justify-between items-center">
        
      
          <div>
            <span className="text-gray-300">{bet.type}: </span>
            <span className="text-blue-400">{bet.selection}</span>
          </div>
          <span className="font-bold text-white">{bet.odds}</span>
        </div>
        <CustomSelect
               key={bet.id}
                options={bookmakers}
                selectedOption={bet.bookmaker}
                onChange={(selectedBookmaker) => handleBookmakerChange(bet.id, selectedBookmaker) }
                id={bet.id}
              />
      </div>
    </CardContent>
  </Card>
))}
    </div>
  </CardContent>
</Card>

          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Resumen del Parlay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="stake" className="text-gray-300">Monto de apuesta</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="stake"
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(parseFloat(e.target.value))}
                        className="bg-gray-700 text-white border-gray-600 pl-10"
                      />
                    </div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Número de selecciones:</span>
                    <span className="text-white font-bold">{parlayBets.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cuota total:</span>
                    <span className="text-white font-bold">{calculateTotalOdds()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Ganancia potencial:</span>
                    <span className="text-green-400 font-bold">${calculatePotentialWin()}</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                    Realizar Apuesta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {isDialogOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 text-white flex items-center justify-between">
        <span>{selectedMatch ? selectedMatch.event : "Partidos Disponibles"}</span>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            if (selectedMatch) {
              cancelSelection();
            } else {
              setIsDialogOpen(false);
            }
          }}
          className="text-gray-400 hover:text-white"
        >
          {selectedMatch ? <ChevronLeft className="h-6 w-6" /> : <X className="h-6 w-6" />}
          <span className="sr-only">{selectedMatch ? "Volver" : "Cerrar"}</span>
        </Button>
      </h3>
      {!selectedMatch && (
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar partidos..."
              className="bg-gray-700 text-white border-gray-600 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="space-y-4">
        {!selectedMatch ? (
          filteredMatches.map((match) => (
            <Card 
              key={match.id} 
              className="bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer"
              onClick={() => setSelectedMatch(match)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{match.event}</p>
                    <p className="text-sm text-gray-300">{match.league}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {selectedMatch.bets.filter(bet => bet.type === "1X2").map((bet) => (
                  <OddsButton key={"bet-" + bet.id} bet={bet} />
              ))}
            </div>
            <Separator className="bg-gray-700" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {selectedMatch.bets.filter(bet => bet.type !== "1X2").map((bet) => (
                <OddsButton   key={"bet-" + bet.id}  bet={bet} />
              ))}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button className="bg-red-600 hover:bg-red-700" onClick={cancelSelection}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveBets}>
                Guardar Selecciones
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

            
     
    </div>
    </ProtectedRoute>
  )
}