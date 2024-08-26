"use client";
import { useState } from 'react'; // Agrega useState
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#232323] text-white p-4 fixed w-full top-0 z-50 shadow-none"
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 relative">
        <div className="text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-16 sm:h-20 md:h-24 w-auto" />
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="block lg:hidden p-2 z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>

          <nav className="hidden lg:flex flex-row items-center space-x-4">
            <a href="#features" className="text-base hover:bg-gray-700 hover:rounded-full px-8 py-2">
              Features
            </a>
            <a href="#pricing-faqs" className="text-base hover:bg-gray-700 hover:rounded-full px-8 py-2">
              Pricing
            </a>
            <a href="#about" className="text-base hover:bg-gray-700 hover:rounded-full px-8 py-2">
              About Us
            </a>
            
            <Link href={"/auth"}>
            <motion.button
              whileHover={{ borderColor: 'white' }}
              className="text-white rounded-full border text-base bg-transparent transition-colors duration-300 px-8 py-2"
              style={{ borderColor: 'gray', borderWidth: '2px' }}
            >
              Iniciar
            </motion.button>
            </Link>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40">
          <div className="bg-black text-white rounded-lg p-4 shadow-lg w-64 max-w-full">
            <nav className="flex flex-col items-center space-y-2">
              <a
                href="#features"
                className="w-full text-center bg-gray-800 rounded-full px-8 py-2 hover:bg-gray-700"
                onClick={toggleMenu}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="w-full text-center bg-gray-800 rounded-full px-8 py-2 hover:bg-gray-700"
                onClick={toggleMenu}
              >
                Pricing
              </a>
              <a
                href="#about"
                className="w-full text-center bg-gray-800 rounded-full px-8 py-2 hover:bg-gray-700"
                onClick={toggleMenu}
              >
                About Us
              </a>
              <motion.button
                whileHover={{ borderColor: 'white' }}
                className="w-full text-center text-white rounded-full border text-base bg-transparent transition-colors duration-300 px-8 py-2"
                style={{ borderColor: 'gray', borderWidth: '2px' }}
                onClick={toggleMenu}
              >
                Iniciar
              </motion.button>
            </nav>
          </div>
        </div>
      )}
    </motion.header>
  );
}
