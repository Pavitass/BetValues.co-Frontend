"use client";

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';



const PlanCard = ({ title, originalPrice, discountedPrice, features }) => {
    return (
      <div className="bg-[#f2f2f2] text-black rounded-lg p-6 md:p-8 transition-transform transform hover:scale-105 w-full sm:w-3/4 lg:w-3/12 mx-2">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-left text-gray-500">{title}</h3>
        <p className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-left text-black">
          <span className="line-through text-gray-500">{originalPrice}</span> {discountedPrice}
        </p>
        <ul className="mb-6 md:mb-8 space-y-3 md:space-y-4">
          {features.map(feature => (
            <li key={feature} className="flex items-center justify-start bg-[#e6e6e6] rounded-full py-2 px-3 md:py-2.5 md:px-4">
              <div className="flex items-center space-x-2">
                <div className="flex justify-center items-center w-5 h-5 md:w-6 md:h-6 bg-[#161617] rounded-full">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="text-sm md:text-base text-gray-800">{feature}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="bg-[#161617] text-white text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full transition-transform transform hover:scale-110 block mx-auto shadow-md">Comenzar</button>
      </div>
    );
  };
  
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFAQ = () => setIsOpen(prev => !prev);
  
    return (
      <div className="w-full p-4 bg-gray-200 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-xl text-[#151515] font-semibold flex-1">{question}</h3>
          <button 
            className="ml-4 bg-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" 
            onClick={toggleFAQ}
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {isOpen ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            )}
          </button>
        </div>
        {isOpen && (
          <p 
            className="mt-4 text-gray-700"
            id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {answer}
          </p>
        )}
      </div>
    );
  };
  
  const PricingAndFAQs = () => {
    const [isAnnual, setIsAnnual] = useState(false);
  
    const pricingRef = useRef(null);
    const faqsRef = useRef(null);
    const isPricingInView = useInView(pricingRef, { once: true });
    const isFaqsInView = useInView(faqsRef, { once: true });
  
    const togglePricing = () => {
      setIsAnnual(prev => !prev);
    };
  
    return (
      <div>
        <section id="pricing-faqs" className="bg-[#161617] py-16 w-full p-5">
          <div className="mx-auto bg-white text-black rounded-lg border border-gray-700 p-5 md:p-12">
            {/* Pricing Section */}
            <motion.div
              ref={pricingRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isPricingInView ? 1 : 0, y: isPricingInView ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-24">
              <h1 className="text-3xl md:text-5xl font-bold mb-8 text-left">
                <span className="block text-gray-400">Empieza gratis.</span>
                <span className="block text-black font-bold">Actualiza cuando lo necesites</span>
              </h1>
              <div className="flex items-center justify-center mb-8">
                <div className="relative inline-block w-64 h-16 bg-gray-200 rounded-full cursor-pointer" onClick={togglePricing}>
                  <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                    <span className={`text-lg font-semibold ${!isAnnual ? 'text-white' : 'text-black'}`}>Mensual</span>
                    <span className={`text-lg font-semibold ${isAnnual ? 'text-white' : 'text-black'}`}>Anual</span>
                  </div>
                  <div className={`absolute top-0 left-0 w-1/2 h-full bg-gray-700 rounded-full transition-transform duration-300 ease-in-out ${isAnnual ? 'translate-x-full' : 'translate-x-0'}`}></div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-8">
                <PlanCard
                  title="Básico"
                  originalPrice={isAnnual ? "$120/año" : "$15/mes"}
                  discountedPrice={isAnnual ? "$99/año" : "$0/mes"}
                  features={["Característica 1", "Característica 2"]}
                />
                <PlanCard
                  title="Pro"
                  originalPrice={isAnnual ? "$250/año" : "$30/mes"}
                  discountedPrice={isAnnual ? "$199/año" : "$20/mes"}
                  features={["Característica 1", "Característica 2", "Característica 3"]}
                />
                <PlanCard
                  title="Enterprise"
                  originalPrice={isAnnual ? "$400/año" : "$45/mes"}
                  discountedPrice={isAnnual ? "$299/año" : "$30/mes"}
                  features={["Característica 1", "Característica 2", "Característica 3", "Característica 4"]}
                />
              </div>
            </motion.div>
  
            {/* FAQs Section */}
            <motion.div
              ref={faqsRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isFaqsInView ? 1 : 0, y: isFaqsInView ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12"
            >
              <div className="flex-1">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">Preguntas Frecuentes</h2>
                <p className="text-base md:text-lg mb-4 text-gray-700">Encuentra respuestas a las preguntas más comunes sobre nuestros servicios.</p>
              </div>
              <div className="space-y-4 w-full md:w-2/4">
                <FAQItem question="¿Cómo funciona el servicio?" answer="Nuestra plataforma ofrece seguimiento en tiempo real y análisis detallado de las apuestas deportivas. Puedes comparar cuotas, seguir tus apuestas y obtener informes detallados." />
                <FAQItem question="¿Qué deportes cubren?" answer="Soportamos una amplia gama de deportes, incluyendo fútbol, baloncesto, béisbol y más." />
                <FAQItem question="¿Cómo puedo comenzar?" answer="Simplemente regístrate y elige un plan que se ajuste a tus necesidades. Podrás empezar a analizar apuestas de inmediato." />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  };
  
  export default PricingAndFAQs;