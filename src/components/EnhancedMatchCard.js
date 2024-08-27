'use client'

import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, Info } from 'lucide-react';
import { format } from 'date-fns'
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function EnhancedMatchCard({ match, selectedBets, toggleBet, bookmakers }) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);


  const OddsButton = ({type, bet, isSelected }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            key={type}
            variant="outline"
            className={`text-white border-none py-8 ${
              isSelected ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
            } transition-all duration-300 ease-in-out transform hover:scale-105`}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <div className="flex flex-col items-center w-full">
              <span className="text-sm mb-2">{type}</span>
              <span className="text-lg font-bold">{bet.odds.toFixed(2)}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60 p-0 z-50 bg-gray-800 border-gray-700 text-white">
          <div className="grid gap-4 p-4">
            {bookmakers.map((bookmaker) => (
              <Button
                key={bookmaker.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBet(bet, bookmaker);
                  setIsOpen(false);
                }}
              >
                <Image
                  src={bookmaker.logo}
                  alt={bookmaker.name}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>{bookmaker.name}</span>
                <span className="ml-auto font-bold">{bookmaker.odds.toFixed(2)}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div 
      ref={cardRef}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="bg-gray-700 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image
                src={match.leagueLogo}
                alt={`${match.league} logo`}
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              <CardTitle className="text-white text-xl font-bold">{match.league}</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {isLive && (
                <Badge variant="destructive" className="animate-pulse">
                  EN VIVO
                </Badge>
              )}
              {isFinished ? (
                <Badge variant="secondary" className="flex items-center">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Finalizado
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {match.time}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-center space-y-2 w-1/3">
              <Image
                src={match.homeTeam.logo}
                alt={`${match.homeTeam.name} logo`}
                width={200}
                height={200}
                className="w-16 h-16 object-contain"
              />
              <span className="text-white font-semibold text-center">{match.homeTeam.name}</span>
              {isLive && <span className="text-2xl font-bold text-white">{match.score.home}</span>}
            </div>
            <div className="flex flex-col items-center w-1/3">
              {isLive ? (
                <div className="flex flex-col items-center">
                  <div className="bg-red-600 text-white text-2xl font-bold py-2 px-4 rounded-full animate-pulse mb-2">
                    LIVE
                  </div>
                  <span className="text-sm text-gray-400">
                    {isLive ? (
                      <>
                        {match.currentMinute}&apos; 
                        {match.additionalTime > 0 && `+${match.additionalTime}`}
                      </>
                    ) : (
                      match.time
                    )}
                  </span>
                </div>
              ) : (
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-spin"></div>
                  <span className="relative text-3xl font-bold text-white">VS</span>
                </div>
              )}
              {!isLive && <span className="text-sm text-gray-400 mt-2">{format(match.date, 'MMMM d')}</span>}
            </div>
            <div className="flex flex-col items-center space-y-2 w-1/3">
              <Image
                src={match.awayTeam.logo}
                alt={`${match.awayTeam.name} logo`}
                width={200}
                height={200}
                className="w-16 h-16 object-contain"
              />
              <span className="text-white font-semibold text-center">{match.awayTeam.name}</span>
              {isLive && <span className="text-2xl font-bold text-white">{match.score.away}</span>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {['Local', 'Empate', 'Visitante'].map((type) => {
              const bet = { type, odds: match.odds[type.toLowerCase()], match: `${match.homeTeam.name} vs ${match.awayTeam.name}` };
              const isSelected = selectedBets.some(b => b.match === bet.match && b.type === bet.type);
              return (
                <OddsButton key={type} type={type} bet={bet} isSelected={isSelected} />
              )
            })}
          </div>
        </CardContent>
      </Card>
     
    </div>
  );
}