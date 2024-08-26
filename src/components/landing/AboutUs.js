'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '@/styles/components/AboutUs.css';

export default function AboutUs() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true });
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const cardFooterRef1 = useRef(null);
  const cardFooterRef2 = useRef(null);
  const cardFooterRef3 = useRef(null);
  const cardFooterRef4 = useRef(null);

  const isCard1InView = useInView(cardFooterRef1, { threshold: 1.0 });
  const isCard2InView = useInView(cardFooterRef2, { threshold: 1.0 });
  const isCard3InView = useInView(cardFooterRef3, { threshold: 1.0 });
  const isCard4InView = useInView(cardFooterRef4, { threshold: 1.0 });

  const [activeCardIndex, setActiveCardIndex] = useState(null);

  useEffect(() => {
    const inViewCards = [isCard1InView, isCard2InView, isCard3InView, isCard4InView];

    inViewCards.forEach((isInView, index) => {
      if (isInView) {
        setActiveCardIndex(index);
      }
    });

    if (activeCardIndex !== null && !inViewCards[activeCardIndex]) {
      setActiveCardIndex(null);
    }
  }, [isCard1InView, isCard2InView, isCard3InView, isCard4InView, activeCardIndex]);

  return (
    <section id="about" className="bg-[#161617] text-white py-16 w-full p-5">
      <div className="mx-auto p-12">
        <motion.h1
          ref={sectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0 }}
          className="text-3xl md:text-5xl font-bold mb-8 text-left"
        >
          <span className="block text-gray-400">Sobre Nosotros.</span>
          <span className="block text-white font-bold">Conócenos</span>
        </motion.h1>
        <motion.div
          className="cards-container p-0 md:px-2"
          initial={{ opacity: 0, y: 50 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {['#01', '#02', '#03', '#04'].map((number, index) => {
            const cardFooterRef = [cardFooterRef1, cardFooterRef2, cardFooterRef3, cardFooterRef4][index];
            const isActive = activeCardIndex === index;

            return (
              <motion.div
                key={index}
                className={`card ${isMobile && isActive ? "rotate-card" : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isSectionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="card-front">
                  <span className="card-number">{number}</span>
                  <h2 className="card-title">
                    {number === '#01' && 'Análisis de Apuestas'}
                    {number === '#02' && 'Comparación de Cuotas'}
                    {number === '#03' && 'Creación de Parleys'}
                    {number === '#04' && 'Mejora de Rentabilidad'}
                  </h2>
                </div>
                <div className="card-back">
                  <span className="card-number">{number}</span>
                  <p className="card-info">
                    {number === '#01' && 'Analiza apuestas deportivas con precisión. BetValues te proporciona datos detallados y análisis para que tomes decisiones informadas y aumentes tus posibilidades de éxito.'}
                    {number === '#02' && 'Compara cuotas de diferentes casas de apuestas. Encuentra las mejores oportunidades y maximiza tus ganancias con nuestras herramientas de comparación.'}
                    {number === '#03' && 'Crea parleys personalizados para maximizar tus ganancias. Nuestra plataforma te ayuda a combinar apuestas de manera estratégica para obtener el mayor retorno posible.'}
                    {number === '#04' && 'Mejora tu rentabilidad con nuestros insights. BetValues te ofrece recomendaciones y estrategias basadas en datos para que seas más rentable en tus apuestas.'}
                  </p>
                </div>
                <div ref={cardFooterRef} className="card-footer">
                  {/* Esto es solo un placeholder, ajusta según tu diseño */}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
