import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-center ">
            <Image src="/logo.png" alt="BetValues.co Logo" width={200} height={200} className="h-42 w-auto mb-4" />
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Educación sobre Apuestas</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white">Guía para Principiantes</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Estrategias de Apuestas</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Glosario de Términos</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Análisis de Probabilidades</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white">Gestión de Bankroll</Link></li>
            </ul>
          </div>

          {/* BetValues.co Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">BetValues.co</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
              <li><Link href="/comparador" className="text-gray-400 hover:text-white">Comparador de Cuotas</Link></li>
              <li><Link href="/parlay-builder" className="text-gray-400 hover:text-white">Parlay Builder</Link></li>
              <li><Link href="/tracker" className="text-gray-400 hover:text-white">Tracker de Apuestas</Link></li>
              <li><Link href="/afiliados" className="text-gray-400 hover:text-white">Afiliados y Bonos</Link></li>
              <li><Link href="/cuenta" className="text-gray-400 hover:text-white">Mi Cuenta</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terminos" className="text-gray-400 hover:text-white">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="text-gray-400 hover:text-white">Política de Privacidad</Link></li>
              <li><Link href="/juego-responsable" className="text-gray-400 hover:text-white">Juego Responsable</Link></li>
              <li><Link href="/licencias" className="text-gray-400 hover:text-white">Licencias y Regulaciones</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <Link href="mailto:info@betvalues.co" className="text-gray-400 hover:text-white">info@betvalues.co</Link>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <Link href="tel:+123456789" className="text-gray-400 hover:text-white">+1 (234) 567-89</Link>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-400">Ciudad, País</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm text-center mb-4">
          BetValues.co es una plataforma de información y comparación de apuestas deportivas. No somos una casa de apuestas y no aceptamos apuestas en nuestro sitio. Asegúrate de verificar y cumplir con las leyes locales antes de participar en apuestas deportivas. Juega responsablemente.
          </p>
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} BetValues.co. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}