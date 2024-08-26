import Footer from "./layout/Footer";
import PricingAndFAQs from "./landing/PricingAndFAQs";
import Features from "./landing/Features";
import Hero from "./landing/Hero";
import Header from "./landing/Header";
import AboutUs from "./landing/AboutUs";

export default function LandingPage() {
  return (
    <div className="bg-[#161617] text-white">
      <Header  />
      <Hero/>
      <AboutUs/>
      <Features />
      <PricingAndFAQs />
  
    </div>
  );
}
