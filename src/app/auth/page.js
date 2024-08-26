"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from "@/components/ProtectedRoute"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const toggleView = () => setIsLogin(!isLogin)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      router.push('/comparator')
    } else {
      alert("Credenciales incorrectas")
    }
  }
  return (

    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-400">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            {isLogin
              ? "Ingresa tus credenciales para acceder"
              : "Crea una nueva cuenta"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-gray-200">Apellido</Label>
                  <Input id="lastname" placeholder="Tu apellido" className="bg-gray-700 text-white border-gray-600" />
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="tu@email.com" 
                className="bg-gray-700 text-white border-gray-600" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-gray-700 text-white border-gray-600" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-200">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" className="bg-gray-700 text-white border-gray-600" />
              </div>
            )}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-800 px-2 text-gray-400">O continúa con</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
              <FcGoogle className="mr-2 h-5 w-5" /> Google
            </Button>
            <Button variant="outline" className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
              <Facebook className="mr-2 h-5 w-5" /> Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full text-blue-400" onClick={toggleView}>
            {isLogin
              ? "¿No tienes una cuenta? Regístrate"
              : "¿Ya tienes una cuenta? Inicia sesión"}
          </Button>
        </CardFooter>
      </Card>
    </div>

  )
}