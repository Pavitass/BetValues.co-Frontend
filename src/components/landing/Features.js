"use client"


import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FeatureCard from './FeatureCard';
import DemoVideo from './DemoVideo';

export default function Features() {
  const ref = useRef(null);
  const [hasAppeared, setHasAppeared] = useState(false);
  const isInView = useInView(ref, { triggerOnce: true });

  if (isInView && !hasAppeared) {
    setHasAppeared(true);
  }

  return (
    <section id="features" className="bg-[#161617] text-white py-16 w-full p-5">
      <div className="mx-auto p-12">
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={hasAppeared ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mb-8 text-left"
        >
          <span className="block text-gray-400">Explora lo que ofrecemos.</span>
          <span className="block text-white font-bold">Descubre nuestras funciones destacadas.</span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-4 auto-rows-[minmax(200px, auto)] min-h-[75vh] p-0  md:px-40"
          initial={{ opacity: 0 }}
          animate={hasAppeared ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={hasAppeared ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <DemoVideo className="h-[500px]" />
          </motion.div>

          {[
            {
              title: 'Análisis de Apuestas',
              description: 'Obtén análisis detallados de tus apuestas para tomar decisiones más informadas.',
             media:"https://via.placeholder.com/800x600",
              mediaType: 'image',
            },
            {
              title: 'Comparación de Cuotas',
              description: 'Compara cuotas en tiempo real para encontrar las mejores oportunidades.',
              media: "https://via.placeholder.com/800x600",
              mediaType: 'image',
            },
            {
              title: 'Creación de Parleys',
              description: 'Combina múltiples apuestas en un solo ticket para maximizar tus ganancias.',
              media: "https://via.placeholder.com/800x600",
              mediaType: 'video',
            },
            {
              title: 'Mejora de Rentabilidad',
              description: 'Optimiza tu rentabilidad con recomendaciones basadas en datos.',
              media: "https://via.placeholder.com/800x600",
              mediaType: 'image',
            },
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              media={feature.media}
              mediaType={feature.mediaType}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
