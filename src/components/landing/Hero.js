"use client";
import { motion } from 'framer-motion';
import Link from 'next/link'



export default function Hero() {


  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#232323] text-white min-h-screen flex flex-col justify-center items-center text-center py-16 px-4 relative"
    >
      <h1 className="leading-tight">
        <motion.span
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="block text-4xl sm:text-6xl md:text-8xl font-bold text-white relative z-10"
        >
          Controle
        </motion.span>
        <motion.span
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="block text-3xl sm:text-5xl md:text-7xl font-bold text-gray-400 relative -top-4"
        >
          las apuestas deportivas
        </motion.span>
      </h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl sm:max-w-3xl"
      >
        Analice, compare y siga las apuestas con facilidad utilizando nuestra avanzada plataforma de análisis.
      </motion.p>
      <Link href={"/auth"}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-8 text-white px-8 py-2 rounded-full text-lg sm:text-xl md:text-2xl font-semibold bg-blue-900"
      >
        Iniciar
      </motion.button></Link>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 flex flex-col items-center w-full"
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-400 text-2xl sm:text-3xl md:text-4xl"
        >
          ↓
        </motion.span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-gray-400 text-sm mt-2 sm:text-base"
        >
          Desplácese hacia abajo
        </motion.span>
      </motion.div>
    </motion.section>
  );
}
